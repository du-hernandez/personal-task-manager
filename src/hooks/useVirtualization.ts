import { useState, useCallback, useMemo } from 'react';
import { UI_CONSTANTS } from '../utils/constants';

interface VirtualizationConfig {
  itemHeight: number;
  overscan: number;
  containerHeight: number;
}

interface VirtualizationResult {
  virtualItems: Array<{
    index: number;
    start: number;
    end: number;
    size: number;
  }>;
  totalHeight: number;
  startIndex: number;
  endIndex: number;
}

export const useVirtualization = (
  items: any[],
  config: Partial<VirtualizationConfig> = {}
) => {
  const {
    itemHeight = UI_CONSTANTS.VIRTUALIZATION_ITEM_HEIGHT,
    overscan = UI_CONSTANTS.VIRTUALIZATION_OVERSCAN,
    containerHeight = 400,
  } = config;

  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = useMemo(() => items.length * itemHeight, [items.length, itemHeight]);

  const startIndex = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    return Math.max(0, start - overscan);
  }, [scrollTop, itemHeight, overscan]);

  const endIndex = useMemo(() => {
    const end = Math.floor((scrollTop + containerHeight) / itemHeight);
    return Math.min(items.length - 1, end + overscan);
  }, [scrollTop, containerHeight, itemHeight, overscan, items.length]);

  const virtualItems = useMemo(() => {
    const items: VirtualizationResult['virtualItems'] = [];
    
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        index: i,
        start: i * itemHeight,
        end: (i + 1) * itemHeight,
        size: itemHeight,
      });
    }
    
    return items;
  }, [startIndex, endIndex, itemHeight]);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    handleScroll,
    scrollTop,
  };
}; 