/* eslint-disable i18n/no-russian-character */

import { StateEventSet } from "./StateEventSet";

export default describe("StateEventSet.test", () => {
  describe("when two action machine with a, b", () => {
    const machine = {
      id: "CDEK ID",
      initial: "initial",
      states: {
        initial: {
          on: {
            a: {
              target: "target",
            },
            b: {
              target: "target2",
            },
          },
        },
      },
    } as const;
    type States = typeof machine["states"];

    test("should require a, b", () => {
      type StateEventSetMachine = StateEventSet<States>;

      const events: StateEventSetMachine = {
        a: jest.fn(),
        b: jest.fn(),
      };
      events;
    });
  });
});
