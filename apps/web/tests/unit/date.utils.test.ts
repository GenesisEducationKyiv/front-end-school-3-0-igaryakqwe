import { describe, expect, it } from 'vitest';

import { formatTime } from '../../src/utils/date.utils';

describe('formatTime', () => {
  it.each([
    [0, '0:00'],
    [1, '0:01'],
    [59, '0:59'],
    [60, '1:00'],
    [61, '1:01'],
    [100, '1:40'],
    [3599, '59:59'],
    [3600, '60:00'],
    [NaN, '0:00'],
    [Infinity, '0:00'],
    [-Infinity, '0:00'],
    [-1, '0:00'],
  ])('should format %s seconds as %s', (input, expected) => {
    expect(formatTime(input)).toBe(expected);
  });
});
