import { useState, useEffect, useCallback } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  delay?: number;
}

export const useLazyLoad = <T>(
  loadMore: () => Promise<T[]>,
  options: UseLazyLoadOptions = {}
) => {
  const { threshold = 0.8, delay = 100 } = options;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<T[]>([]);

  const loadData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await loadMore();
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newData]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [loadMore, loading, hasMore]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);

      if (scrollPercentage >= threshold && !loading && hasMore) {
        setTimeout(loadData, delay);
      }
    },
    [threshold, loading, hasMore, loadData, delay]
  );

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    hasMore,
    handleScroll,
    loadData,
  };
}; 