import { pipe } from '@mobily/ts-belt';
import * as Belt from '@mobily/ts-belt';

export const pipeSearchParam = (value: string | null | undefined) =>
  pipe(
    Belt.O.fromNullable(value),
    Belt.O.map((s) => s.trim()),
    Belt.O.flatMap((s) => (s.length > 0 ? Belt.O.Some(s) : Belt.O.None))
  );
