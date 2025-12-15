import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { Box, Typography, IconButton, Tooltip, Stack, Chip, useTheme, alpha } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

const NetworkMap = ({
    onNodeClick,
    organizations = [],
    users = [],
    associations = [],
    memberships = [],
    searchQuery = '',
    groupBy = 'tags',
    selectedTag = null,
    viewType = 'pack'
}) => {
    const svgRef = useRef();
    const containerRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [hoveredNode, setHoveredNode] = useState(null);
    const zoomRef = useRef();
    const gRef = useRef();
    const theme = useTheme();

    // Filter organizations
    const filteredOrganizations = useMemo(() => {
        if (!searchQuery) return organizations;
        const query = searchQuery.toLowerCase();
        return organizations.filter(org =>
            org.name.toLowerCase().includes(query) ||
            org.city?.toLowerCase().includes(query) ||
            org.region?.toLowerCase().includes(query) ||
            org.type?.toLowerCase().includes(query) ||
            org.tags?.some(tag => tag.toLowerCase().includes(query))
        );
    }, [organizations, searchQuery]);

    // Build hierarchical data
    const hierarchyData = useMemo(() => {
        const groups = {};
        const orgsToShow = selectedTag
            ? filteredOrganizations.filter(org => (org.tags || []).includes(selectedTag))
            : filteredOrganizations;

        // Build membership counts per org from memberships data
        const orgMemberCounts = {};
        memberships.forEach(m => {
            if (m.entityType === 'org') {
                orgMemberCounts[m.entityId] = (orgMemberCounts[m.entityId] || 0) + 1;
            }
        });

        const getGroupKey = (org) => {
            if (groupBy === 'tags') return org.tags?.[0] || 'Untagged';
            if (groupBy === 'region') return org.region || 'Unknown';
            if (groupBy === 'type') return org.type || 'Other';
            if (groupBy === 'association') {
                const assocId = org.associationIds?.[0];
                const assoc = associations.find(a => a.id === assocId);
                return assoc?.name || 'No Association';
            }
            return 'Other';
        };

        orgsToShow.forEach(org => {
            const key = getGroupKey(org);
            const memberCount = orgMemberCounts[org.id] || 0;
            if (!groups[key]) groups[key] = { name: key, type: 'group', children: [] };
            groups[key].children.push({
                id: org.id, name: org.name, type: 'org', groupName: key,
                orgType: org.type, region: org.region, tags: org.tags || [],
                memberCount
            });
        });

        const sortedGroups = Object.values(groups).filter(g => g.children.length > 0).sort((a, b) => b.children.length - a.children.length);

        return {
            hierarchy: { name: 'Network', type: 'root', children: sortedGroups },
            orgMap: new Map(organizations.map(o => [o.id, o])),
            groupNames: sortedGroups.map(g => g.name),
            flatOrgs: orgsToShow.map(org => {
                const memberCount = orgMemberCounts[org.id] || 0;
                return {
                    id: org.id, name: org.name, type: 'org', groupName: getGroupKey(org),
                    orgType: org.type, region: org.region, tags: org.tags || [],
                    memberCount,
                    radius: 8 + memberCount / 3
                };
            })
        };
    }, [filteredOrganizations, memberships, associations, groupBy, selectedTag, organizations]);

    // Responsive sizing
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height: Math.max(height, 300) });
            }
        });
        if (containerRef.current) resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Color scale
    const colorScale = useMemo(() =>
        d3.scaleOrdinal(d3.schemeTableau10).domain(hierarchyData.groupNames),
        [hierarchyData.groupNames]);

    // Render Pack/Bubble view
    const renderPackView = useCallback((g, width, height) => {
        const radius = Math.min(width, height) / 2 - 30;
        const root = d3.hierarchy(hierarchyData.hierarchy)
            .sum(d => d.type === 'org' ? (d.memberCount || 1) + 5 : 0)
            .sort((a, b) => b.value - a.value);

        d3.pack().size([radius * 2, radius * 2]).padding(d => d.depth === 0 ? 20 : d.depth === 1 ? 10 : 3)(root);

        const nodes = g.selectAll('g.node').data(root.descendants(), d => d.data.id || d.data.name);
        nodes.exit().transition().duration(400).style('opacity', 0).remove();

        const enter = nodes.enter().append('g').attr('class', 'node').style('opacity', 0).attr('transform', 'translate(0,0)');
        enter.append('circle');
        enter.append('text').attr('class', 'label');

        const all = enter.merge(nodes);
        all.transition().duration(600).ease(d3.easeCubicInOut).style('opacity', 1).attr('transform', d => `translate(${d.x - radius}, ${d.y - radius})`);

        all.select('circle')
            .on('mouseover', (e, d) => { if (d.data.type !== 'root') setHoveredNode(d.data); })
            .on('mouseout', () => setHoveredNode(null))
            .on('click', (e, d) => { if (d.data.type === 'org') { const org = hierarchyData.orgMap.get(d.data.id); if (org && onNodeClick) onNodeClick({ ...org, group: 'org' }); } })
            .style('cursor', d => d.data.type === 'org' ? 'pointer' : 'default')
            .transition().duration(600).ease(d3.easeCubicInOut)
            .attr('r', d => d.r)
            .attr('fill', d => d.data.type === 'root' ? 'transparent' : d.data.type === 'group' ? colorScale(d.data.name) : d3.color(colorScale(d.data.groupName))?.darker(0.3))
            .attr('fill-opacity', d => d.data.type === 'root' ? 0 : d.data.type === 'group' ? 0.2 : 0.9)
            .attr('stroke', d => d.data.type === 'root' ? 'none' : d.data.type === 'group' ? colorScale(d.data.name) : '#fff')
            .attr('stroke-width', d => d.data.type === 'group' ? 2 : 1.5);

        all.select('text.label')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 600)
            .style('font-family', theme.typography.fontFamily)
            .attr('fill', d => {
                if (d.data.type === 'group') return theme.palette.text.primary;
                const nodeColor = d3.color(colorScale(d.data.groupName))?.darker(0.3);
                return theme.palette.getContrastText(nodeColor?.toString() || '#000');
            })
            .style('text-shadow', d => d.data.type === 'org' ? '0 1px 3px rgba(0,0,0,0.4)' : 'none')
            .attr('font-size', d => d.data.type === 'group' ? '11px' : Math.max(9, Math.min(d.r / 3.5, 12)) + 'px')
            .attr('dy', d => d.data.type === 'group' ? -d.r + 16 : '0.35em')
            .style('pointer-events', 'none')
            .text(d => {
                if (d.data.type === 'root') return '';
                if (d.r < 18 && d.data.type === 'org') return ''; // Don't show label if node is too small
                const n = d.data.name;
                return n.length > 14 ? n.slice(0, 12) + '…' : n;
            });
    }, [hierarchyData, colorScale, onNodeClick]);

    // Render Treemap view
    const renderTreemapView = useCallback((g, width, height) => {
        const root = d3.hierarchy(hierarchyData.hierarchy)
            .sum(d => d.type === 'org' ? (d.memberCount || 1) + 5 : 0)
            .sort((a, b) => b.value - a.value);

        d3.treemap().size([width - 40, height - 40]).padding(2).paddingTop(20).round(true)(root);

        const nodes = g.selectAll('g.node').data(root.descendants().filter(d => d.data.type !== 'root'), d => d.data.id || d.data.name);
        nodes.exit().transition().duration(400).style('opacity', 0).remove();

        const enter = nodes.enter().append('g').attr('class', 'node').style('opacity', 0);
        enter.append('rect');
        enter.append('text').attr('class', 'label');

        const all = enter.merge(nodes);
        all.transition().duration(600).ease(d3.easeCubicInOut).style('opacity', 1).attr('transform', d => `translate(${d.x0 - width / 2 + 20}, ${d.y0 - height / 2 + 20})`);

        all.select('rect')
            .on('mouseover', (e, d) => setHoveredNode(d.data))
            .on('mouseout', () => setHoveredNode(null))
            .on('click', (e, d) => { if (d.data.type === 'org') { const org = hierarchyData.orgMap.get(d.data.id); if (org && onNodeClick) onNodeClick({ ...org, group: 'org' }); } })
            .style('cursor', d => d.data.type === 'org' ? 'pointer' : 'default')
            .transition().duration(600).ease(d3.easeCubicInOut)
            .attr('width', d => Math.max(0, d.x1 - d.x0))
            .attr('height', d => Math.max(0, d.y1 - d.y0))
            .attr('fill', d => d.data.type === 'group' ? colorScale(d.data.name) : d3.color(colorScale(d.data.groupName))?.darker(0.2))
            .attr('fill-opacity', d => d.data.type === 'group' ? 0.3 : 0.9)
            .attr('stroke', '#fff').attr('stroke-width', 1).attr('rx', 4);

        all.select('text.label')
            .attr('x', 6).attr('y', 16)
            .attr('font-size', '11px')
            .attr('font-weight', 600)
            .style('font-family', theme.typography.fontFamily)
            .attr('fill', d => d.data.type === 'group' ? theme.palette.text.primary : theme.palette.getContrastText(d3.color(colorScale(d.data.groupName))?.darker(0.2)?.toString() || '#000'))
            .style('pointer-events', 'none')
            .text(d => { const w = d.x1 - d.x0; if (w < 45) return ''; const n = d.data.name; const maxC = Math.floor(w / 7); return n.length > maxC ? n.slice(0, maxC - 1) + '…' : n; });
    }, [hierarchyData, colorScale, onNodeClick, theme]);

    // Track previous view to detect changes
    const prevViewRef = useRef(viewType);

    // Main render effect
    useEffect(() => {
        if (!svgRef.current || !hierarchyData.hierarchy.children?.length) return;

        const svg = d3.select(svgRef.current);
        const { width, height } = dimensions;
        const centerX = width / 2;
        const centerY = height / 2;

        // Setup zoom
        if (!zoomRef.current) {
            const zoom = d3.zoom().scaleExtent([0.3, 4]).on('zoom', e => { if (gRef.current) gRef.current.attr('transform', e.transform); });
            svg.call(zoom);
            zoomRef.current = zoom;
            svg.call(zoom.transform, d3.zoomIdentity.translate(centerX, centerY));
        }

        let g = svg.select('g.main-group');
        if (g.empty()) g = svg.append('g').attr('class', 'main-group').attr('transform', `translate(${centerX}, ${centerY})`);
        gRef.current = g;

        // Clear SVG content when view type changes
        if (prevViewRef.current !== viewType) {
            g.selectAll('*').remove();
            prevViewRef.current = viewType;
        }

        // Render based on view type
        if (viewType === 'pack') renderPackView(g, width, height);
        else if (viewType === 'treemap') renderTreemapView(g, width, height);

    }, [dimensions, hierarchyData, viewType, renderPackView, renderTreemapView]);

    const handleZoomIn = () => { d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 1.5, [dimensions.width / 2, dimensions.height / 2]); };
    const handleZoomOut = () => { d3.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, 0.67, [dimensions.width / 2, dimensions.height / 2]); };
    const handleReset = () => { d3.select(svgRef.current).transition().duration(500).call(zoomRef.current.transform, d3.zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2)); };

    const legendItems = useMemo(() => hierarchyData.groupNames.slice(0, 5).map(name => ({ name, color: colorScale(name) })), [hierarchyData.groupNames, colorScale]);

    return (
        <Box ref={containerRef} sx={{ position: 'relative', height: '100%', minHeight: 300, bgcolor: 'transparent', borderRadius: 2, overflow: 'hidden' }}>
            <svg ref={svgRef} width={dimensions.width} height={dimensions.height} style={{ display: 'block', background: 'transparent' }} />

            {/* Zoom Controls */}
            <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10, bgcolor: alpha(theme.palette.background.paper, 0.8), backdropFilter: 'blur(6px)', borderRadius: '10px', p: 0.5, boxShadow: theme.shadows[2], border: `1px solid ${theme.palette.divider}` }}>
                <Stack direction="row" spacing={0.25}>
                    <Tooltip title="Zoom In"><IconButton size="small" onClick={handleZoomIn}><ZoomInIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip>
                    <Tooltip title="Zoom Out"><IconButton size="small" onClick={handleZoomOut}><ZoomOutIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip>
                    <Tooltip title="Reset"><IconButton size="small" onClick={handleReset}><CenterFocusStrongIcon sx={{ fontSize: 18 }} /></IconButton></Tooltip>
                </Stack>
            </Box>

            {/* Legend */}
            <Box sx={{ position: 'absolute', bottom: 12, left: 12, zIndex: 10, bgcolor: alpha(theme.palette.background.paper, 0.8), backdropFilter: 'blur(6px)', borderRadius: '10px', p: 1, boxShadow: theme.shadows[2], border: `1px solid ${theme.palette.divider}`, maxWidth: 150 }}>
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>
                    {groupBy === 'tags' ? 'Tags' : groupBy === 'region' ? 'Regions' : groupBy === 'type' ? 'Types' : 'Associations'}
                </Typography>
                <Stack spacing={0.25} sx={{ mt: 0.5 }}>
                    {legendItems.map(({ name, color }) => (
                        <Stack key={name} direction="row" alignItems="center" spacing={0.5}>
                            <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</Typography>
                        </Stack>
                    ))}
                    {hierarchyData.groupNames.length > 5 && <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>+{hierarchyData.groupNames.length - 5}</Typography>}
                </Stack>
            </Box>

            {/* Hover Tooltip */}
            {hoveredNode && (
                <Box sx={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', bgcolor: alpha(theme.palette.background.paper, 0.95), backdropFilter: 'blur(8px)', borderRadius: '10px', px: 2, py: 1, boxShadow: theme.shadows[4], border: `1px solid ${theme.palette.divider}`, zIndex: 30, textAlign: 'center', maxWidth: 260 }}>
                    <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.85rem' }}>{hoveredNode.name}</Typography>
                    {hoveredNode.type === 'org' && (
                        <>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>{hoveredNode.orgType} • {hoveredNode.region}</Typography>
                            <Typography variant="caption" color="primary.main" fontWeight={600} sx={{ fontSize: '0.7rem' }}>{hoveredNode.memberCount || 0} members</Typography>
                            {hoveredNode.tags?.length > 0 && (
                                <Stack direction="row" spacing={0.5} sx={{ mt: 0.5, justifyContent: 'center' }} flexWrap="wrap" useFlexGap>
                                    {hoveredNode.tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" sx={{ height: 16, fontSize: '0.55rem' }} />)}
                                </Stack>
                            )}
                        </>
                    )}
                    {hoveredNode.type === 'group' && <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{hoveredNode.children?.length || 0} organizations</Typography>}
                </Box>
            )}
        </Box>
    );
};

export default NetworkMap;
