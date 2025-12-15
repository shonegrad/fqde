import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Box } from '@mui/material';
import { GRAPH_DATA } from '../../data/seed';

const NetworkMap = ({ onNodeClick }) => {
    const fgRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef();

    useEffect(() => {
        // Responsive graph
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                setDimensions({
                    width: entries[0].contentRect.width,
                    height: 600 // Fixed height
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: 'background.paper',
                position: 'relative',
                height: 600 // Ensure container has height
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                bgcolor: 'rgba(255,255,255,0.9)',
                p: 1,
                borderRadius: 1,
                zIndex: 10,
                pointerEvents: 'none',
                boxShadow: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: '0.75rem', color: '#666' }}>
                    <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#1f2937' }}></span> Person
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#666' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: '#ea580c' }}></span> Organization
                </div>
            </Box>

            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={GRAPH_DATA}
                nodeLabel="name"
                nodeColor={node => node.group === 'org' ? '#ea580c' : '#1f2937'}
                nodeVal={node => node.val}
                linkColor={() => '#cbd5e1'}
                onNodeClick={(node) => {
                    // center view
                    fgRef.current.centerAt(node.x, node.y, 1000);
                    fgRef.current.zoom(2, 2000);
                    if (onNodeClick) onNodeClick(node);
                }}

            // Custom painting for different shapes can be done with nodeCanvasObject
            // keeping it simple for now with built-in circles but using colors
            />
        </Box>
    );
};

export default NetworkMap;
