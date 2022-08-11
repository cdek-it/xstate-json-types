/* eslint-disable i18n/no-russian-character */

import { ArrayLiteralsToKeys } from "./ArrayLiteralsToKeys";

export default describe("ArrayLiteralsToKeys.test", () => {
  test("should infer literals from const", () => {
    const literals = ["a", "b"] as const;
    type RecordLiterals = ArrayLiteralsToKeys<typeof literals>;

    const a: RecordLiterals = "a";
    const b: RecordLiterals = "b";

    // @ts-expect-error
    const c: RecordLiterals = "c";

    // just for fix warnings lint
    a;
    b;
    c;
  });
});
