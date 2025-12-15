import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
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
        <div ref={containerRef} className="border border-gray-200 rounded-lg overflow-hidden bg-slate-50 relative">
            <div className="absolute top-4 left-4 bg-white/90 p-2 rounded text-xs text-gray-500 z-10 pointer-events-none">
                <div className="flex items-center gap-2 mb-1"><span className="w-3 h-3 rounded-full bg-[#1f2937]"></span> Person</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#ea580c]"></span> Organization</div>
            </div>

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
        </div>
    );
};

export default NetworkMap;
