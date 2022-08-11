// any need to declare autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createModel } from "@xstate/test";
import { createMachine } from "xstate";

import { StateEventSet } from "./types/StateEventSet/StateEventSet";
import { StateExpectationSet } from "./types/StateExpectationSet/StateExpectationSet";
import { withEvents } from "./withEvents/withEvents";
import { withStates } from "./withStates/withStates";

export declare type Existed<T> = Exclude<T, null | undefined>;
type Required<T> = {
  [P in keyof T]-?: Existed<T[P]>;
};

/**
 * Make fields in type not optional, not undefined and not null
 */
export type RequiredKeys<T extends object, K extends keyof T> = Required<
  Pick<T, K>
> &
  Omit<T, K>;

interface TestModelAssertions<R extends { states: any }> {
  expectations: StateExpectationSet<R["states"]>;
  events: StateEventSet<R["states"]>;
}

export function declareTestModel<R extends { states: any }>(
  raw: R,
  assertions: TestModelAssertions<R>
) {
  const machine = createMachine({
    ...raw,
    states: withStates(raw.states, assertions.expectations),
  });

  return createModel(machine).withEvents(withEvents(assertions.events));
}
