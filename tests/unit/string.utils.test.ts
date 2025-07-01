import { describe, expect, it } from 'vitest';
import { createSlug } from '../../src/utils/string.utils';

describe('createSlug', () => {
  it.each([
    ['Hello World', 'hello-world'],
    ['  Hello   World!  ', 'hello-world'],
    ['This_is_a_test', 'this-is-a-test'],
    ['Cafe au lait', 'cafe-au-lait'],
    ['@#%^&*()', ''],
    ['Multiple---dashes__and   spaces', 'multiple-dashes-and-spaces'],
    ['Trailing -- and __underscores__', 'trailing-and-underscores'],
    ['UPPERCASE TEXT', 'uppercase-text'],
    [' already-slugified-text ', 'already-slugified-text'],
    ['Some 😃 emoji', 'some-emoji'],
    ['123 Go!', '123-go'],
  ])('should convert "%s" to "%s"', (input, expected) => {
    expect(createSlug(input)).toBe(expected);
  });
});
