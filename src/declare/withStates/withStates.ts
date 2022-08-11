/* eslint-disable @typescript-eslint/ban-types */
import { getKeys } from "../../utils/getKeys";
import { AsyncFunction } from "../types/AsyncFunction";
import {
  SingleExpectation,
  StateExpectationSet,
} from "../types/StateExpectationSet/StateExpectationSet";

type ExtendObjectValue<T, V> = {
  [key in keyof T]: T[key] & V;
};
type WithMeta<T> = ExtendObjectValue<T, { meta: { test: AsyncFunction } }>;

/**
 * Add meta.test property to your states
 */
export function withStates<S extends object>(
  states: S,
  expectations: StateExpectationSet<S>
): WithMeta<S> {
  const keys = Object.keys(states);

  return keys.reduce((total, next) => {
    const stateKey = next as keyof S;

    // TODO: states has contains nested states, need add recursion call

    total[stateKey] = {
      ...states[stateKey],
      meta: {
        test: async () => {
          const expectation = expectations[stateKey] as SingleExpectation<
            S,
            typeof stateKey
          >;
          if (typeof expectation === "function") {
            await expectation();
          } else if (typeof expectation === "object") {
            await expectation.beforeAll?.();

            for (const key of getKeys(expectation.entry)) {
              try {
                await expectation.entry[key]();
              } catch (e) {
                throw new Error(
                  `Entry ${key} failed for test ${String(
                    stateKey
                  )} with error: ${e}`
                );
              }
            }
          }
        },
      },
    };

    return total;
  }, {} as WithMeta<S>);
}
