// any is required for correct auto-types
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Tuples<T = any> =
  | readonly [T]
  | readonly [T, T]
  | readonly [T, T, T]
  | readonly [T, T, T, T]
  | readonly [T, T, T, T, T]
  | readonly [T, T, T, T, T, T]
  | readonly [T, T, T, T, T, T, T]
  | readonly [T, T, T, T, T, T, T, T]
  | readonly [T, T, T, T, T, T, T, T, T]
  | readonly [T, T, T, T, T, T, T, T, T, T];

/**
 * Convert string literals array
 * ```ts
 * const literals = ["a", "b"] as const
 * ```
 * to Record with string literal keys
 *
 * ```ts
 * type RecordLiterals = ArrayStringLiteralsToKeys<typeof literals>
 * const a: RecordLiterals = "a"
 * const b: RecordLiterals = "b"
 * const c: RecordLiterals = "c" // error
 * ```
 */
export type ArrayLiteralsToKeys<A extends Tuples<S>, S = unknown> = A[number];

// const literals = ['a', 'b'] as const
// type RecordLiterals = ArrayLiteralsToKeys<typeof literals>
