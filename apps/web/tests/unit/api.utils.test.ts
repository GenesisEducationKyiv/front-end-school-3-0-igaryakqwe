import { describe, expect, it } from 'vitest';
import { extractErrorMessage } from '../../src/utils/api.utils.ts';

describe('extractErrorMessage', () => {
  const cases = [
    {
      input:
        '[internal] [already_exists] A track with this title already exists',
      expected: 'A track with this title already exists',
    },
    {
      input: '[foo] [bar] Something went wrong',
      expected: 'Something went wrong',
    },
    {
      input: '[error]Only one tag',
      expected: 'Only one tag',
    },
    {
      input: 'No tags at all',
      expected: 'No tags at all',
    },
    {
      input: '[tag1] [tag2]   [tag3]   Message with extra spaces',
      expected: 'Message with extra spaces',
    },
    {
      input: '[tag]    Message with leading spaces',
      expected: 'Message with leading spaces',
    },
    {
      input: '',
      expected: '',
    },
    {
      input: '[tag]',
      expected: '',
    },
    {
      input: '[tag]    ',
      expected: '',
    },
  ];

  it.each(cases)(
    'should extract message from "$input"',
    ({ input, expected }) => {
      expect(extractErrorMessage(input)).toBe(expected);
    }
  );
});
