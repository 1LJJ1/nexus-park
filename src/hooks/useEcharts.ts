import { useRef, useEffect, useCallback } from 'react';
import * as echarts from 'echarts';

export interface UseEchartsConfig {
  /** 是否开启窗口resize自适应，默认true */
  autoResize?: boolean;
  /** resize防抖时间(ms)，中后台防止窗口拖拽疯狂触发resize，默认120 */
  resizeDelay?: number;
}

export function useEcharts(
  domRef: React.RefObject<HTMLDivElement | null>,
  config: UseEchartsConfig = {}
) {
  const { autoResize = true, resizeDelay = 120 } = config;

  const instanceRef = useRef<echarts.ECharts | null>(null); // ECharts实例

  const resizeTimerRef = useRef<number | null>(null);

  const renderChart = useCallback((option: Partial<echarts.EChartsOption>, notMerge = false) => {
    const ins = instanceRef.current;
    if (!ins) return;
    ins.setOption(option, notMerge);
  }, []);

  const getInstance = useCallback(() => {
    return instanceRef.current;
  }, []);

  // resize防抖处理
  const handleResize = useCallback(() => {
    if (resizeTimerRef.current) {
      window.clearTimeout(resizeTimerRef.current);
    }
    resizeTimerRef.current = window.setTimeout(() => {
      instanceRef.current?.resize();
    }, resizeDelay);
  }, [resizeDelay]);

  useEffect(() => {
    const dom = domRef.current;

    if (!dom) return;

    instanceRef.current = echarts.init(dom);
    const instance = instanceRef.current;

    if (autoResize) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (resizeTimerRef.current) {
        window.clearTimeout(resizeTimerRef.current);
        resizeTimerRef.current = null;
      }

      if (autoResize) {
        window.removeEventListener('resize', handleResize);
      }

      instance?.dispose();
      instanceRef.current = null;
    };
  }, [domRef, autoResize, handleResize]);

  return {
    renderChart,
    getInstance,
  };
}
