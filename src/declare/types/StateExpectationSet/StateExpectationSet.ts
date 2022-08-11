import { AsyncFunction } from "e2e/xstate/declare/types/AsyncFunction";

import {
  ArrayLiteralsToKeys,
  Tuples,
} from "../ArrayLiteralsToKeys/ArrayLiteralsToKeys";

interface StateWithEntry<
  S,
  // TS can infer type correctly, but display warnings because S can be anything, so just ignore it, we check it manually
  // @ts-ignore
  E extends Tuples = S["entry"]
> {
  entry: E;
}

export type SingleExpectation<
  S,
  K extends keyof S
> = S[K] extends StateWithEntry<S, infer E>
  ? {
      /**
       * Function that should be called before all async entry functions
       */
      beforeAll?: AsyncFunction;

      /**
       * Kind of subtests inside test for allow extra verification
       *
       * If it not resolve types, check twice that your `entry` in machine is marked with `as const`
       */
      entry: Record<ArrayLiteralsToKeys<E>, AsyncFunction>;
    }
  : AsyncFunction;

export type StateExpectationSet<S> = {
  [key in keyof S]: SingleExpectation<S, key>;
};
