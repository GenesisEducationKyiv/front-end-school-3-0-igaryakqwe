import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useDebounce from '../../src/hooks/use-debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Initial Value Behavior', () => {
    it('should return the initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 500));

      expect(result.current).toBe('initial');
    });

    it('should handle different data types as initial values', () => {
      const { result: stringResult } = renderHook(() =>
        useDebounce('test', 100)
      );
      expect(stringResult.current).toBe('test');

      const { result: numberResult } = renderHook(() => useDebounce(42, 100));
      expect(numberResult.current).toBe(42);

      const { result: boolResult } = renderHook(() => useDebounce(true, 100));
      expect(boolResult.current).toBe(true);

      const obj = { name: 'test' };
      const { result: objResult } = renderHook(() => useDebounce(obj, 100));
      expect(objResult.current).toBe(obj);

      const arr = [1, 2, 3];
      const { result: arrResult } = renderHook(() => useDebounce(arr, 100));
      expect(arrResult.current).toBe(arr);
    });

    it('should handle null and undefined values', () => {
      const { result: nullResult } = renderHook(() => useDebounce(null, 100));
      expect(nullResult.current).toBeNull();

      const { result: undefinedResult } = renderHook(() =>
        useDebounce(undefined, 100)
      );
      expect(undefinedResult.current).toBeUndefined();
    });
  });

  describe('Debouncing Behavior', () => {
    it('should not update value before delay elapses', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      expect(result.current).toBe('initial');

      rerender({ value: 'updated', delay: 500 });

      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toBe('initial');
    });

    it('should update value after delay elapses', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      rerender({ value: 'updated', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe('updated');
    });

    it('should reset timer on rapid value changes', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      rerender({ value: 'first', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      rerender({ value: 'second', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('second');
    });

    it('should handle multiple rapid updates correctly', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 200 } }
      );

      rerender({ value: 'update1', delay: 200 });
      act(() => {
        vi.advanceTimersByTime(50);
      });

      rerender({ value: 'update2', delay: 200 });
      act(() => {
        vi.advanceTimersByTime(50);
      });

      rerender({ value: 'update3', delay: 200 });
      act(() => {
        vi.advanceTimersByTime(50);
      });

      rerender({ value: 'final', delay: 200 });

      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(result.current).toBe('final');
    });
  });

  describe('Delay Parameter Behavior', () => {
    it('should respect different delay values', () => {
      const { result: shortResult, rerender: shortRerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 100 } }
      );

      shortRerender({ value: 'updated', delay: 100 });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(shortResult.current).toBe('updated');

      const { result: longResult, rerender: longRerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 1000 } }
      );

      longRerender({ value: 'updated', delay: 1000 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(longResult.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(longResult.current).toBe('updated');
    });

    it('should handle zero delay', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 0 } }
      );

      rerender({ value: 'updated', delay: 0 });

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current).toBe('updated');
    });

    it('should adapt to changing delay values', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      rerender({ value: 'updated', delay: 500 });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      rerender({ value: 'updated', delay: 100 });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current).toBe('updated');
    });
  });

  describe('Edge Cases', () => {
    it('should handle same value updates', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'same', delay: 300 } }
      );

      rerender({ value: 'same', delay: 300 });

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(result.current).toBe('same');
    });

    it('should handle object reference changes', () => {
      const initialObj = { id: 1, name: 'test' };
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: initialObj, delay: 200 } }
      );

      const newObj = { id: 1, name: 'test' };
      rerender({ value: newObj, delay: 200 });

      act(() => {
        vi.advanceTimersByTime(200);
      });

      expect(result.current).toBe(newObj);
      expect(result.current).not.toBe(initialObj);
    });

    it('should cleanup on unmount', () => {
      const { rerender, unmount } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 500 } }
      );

      rerender({ value: 'updated', delay: 500 });

      unmount();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(vi.getTimerCount()).toBe(0);
    });

    it('should handle very large delay values', () => {
      const largeDelay = 10000;
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: largeDelay } }
      );

      rerender({ value: 'updated', delay: largeDelay });

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current).toBe('initial');

      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current).toBe('updated');
    });
  });

  describe('Type Safety and Generic Behavior', () => {
    it('should maintain type consistency', () => {
      const { result: stringResult } = renderHook(() =>
        useDebounce('test', 100)
      );
      expect(typeof stringResult.current).toBe('string');

      const { result: numberResult } = renderHook(() => useDebounce(42, 100));
      expect(typeof numberResult.current).toBe('number');

      const { result: boolResult } = renderHook(() => useDebounce(true, 100));
      expect(typeof boolResult.current).toBe('boolean');
    });

    it('should handle complex objects and arrays', () => {
      const complexObject = {
        nested: { deep: { value: 'test' } },
        array: [1, 2, 3],
        fn: () => 'function',
      };

      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: complexObject, delay: 100 } }
      );

      const updatedObject = {
        ...complexObject,
        nested: { ...complexObject.nested, deep: { value: 'updated' } },
      };

      rerender({ value: updatedObject, delay: 100 });

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current).toBe(updatedObject);
      expect(result.current.nested.deep.value).toBe('updated');
    });
  });
});
