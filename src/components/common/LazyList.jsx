import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

/**
 * LazyList - A performant virtualized list component
 * Implements intersection observer-based lazy loading for better performance
 * Following Material Design guidelines for loading states
 */
const LazyList = ({
    items,
    renderItem,
    batchSize = 20,
    loadingMessage = 'Loading more...',
    emptyMessage = 'No items to display',
    gridSpacing = 2,
    gridColumns = { xs: 12, md: 6, lg: 4 },
    containerSx = {},
}) => {
    const [displayedCount, setDisplayedCount] = useState(batchSize);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef(null);
    const loadMoreTriggerRef = useRef(null);

    const displayedItems = useMemo(() => {
        return items.slice(0, displayedCount);
    }, [items, displayedCount]);

    const hasMore = displayedCount < items.length;

    const loadMore = useCallback(() => {
        if (!hasMore || isLoadingMore) return;

        setIsLoadingMore(true);

        // Small delay for smoother UX
        requestAnimationFrame(() => {
            setDisplayedCount(prev => Math.min(prev + batchSize, items.length));
            setIsLoadingMore(false);
        });
    }, [hasMore, isLoadingMore, batchSize, items.length]);

    // Reset when items change
    useEffect(() => {
        setDisplayedCount(batchSize);
    }, [items, batchSize]);

    // Intersection Observer setup
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '200px', // Start loading before reaching the end
            threshold: 0.1,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && hasMore && !isLoadingMore) {
                    loadMore();
                }
            });
        }, options);

        if (loadMoreTriggerRef.current) {
            observerRef.current.observe(loadMoreTriggerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, isLoadingMore, loadMore]);

    if (items.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 6, ...containerSx }}>
                <Typography variant="body1" color="text.secondary">
                    {emptyMessage}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={containerSx}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: `repeat(${12 / gridColumns.xs}, 1fr)`,
                        md: `repeat(${12 / gridColumns.md}, 1fr)`,
                        lg: `repeat(${12 / gridColumns.lg}, 1fr)`,
                    },
                    gap: gridSpacing,
                }}
            >
                {displayedItems.map((item, index) => (
                    <Fade in key={item.id || index} timeout={300} style={{ transitionDelay: `${Math.min(index % batchSize, 10) * 30}ms` }}>
                        <Box>
                            {renderItem(item, index)}
                        </Box>
                    </Fade>
                ))}
            </Box>

            {/* Loading trigger and indicator */}
            {hasMore && (
                <Box
                    ref={loadMoreTriggerRef}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 4,
                        gap: 2,
                    }}
                >
                    {isLoadingMore && (
                        <>
                            <CircularProgress size={24} color="primary" />
                            <Typography variant="body2" color="text.secondary">
                                {loadingMessage}
                            </Typography>
                        </>
                    )}
                </Box>
            )}

            {/* Progress indicator */}
            <Fade in={displayedCount < items.length}>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Showing {displayedCount.toLocaleString()} of {items.length.toLocaleString()}
                    </Typography>
                </Box>
            </Fade>
        </Box>
    );
};

export default LazyList;
