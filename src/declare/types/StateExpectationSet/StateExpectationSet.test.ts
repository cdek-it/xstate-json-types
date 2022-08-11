/* eslint-disable i18n/no-russian-character */

import { AsyncFunction } from "e2e/xstate/declare/types/AsyncFunction";

import { StateExpectationSet } from "./StateExpectationSet";

const asyncNoop: AsyncFunction = async () => {
  // do nothing
};

export default describe("StateExpectationSet.test", () => {
  describe("simple machine", () => {
    const simpleMachine = {
      id: "CDEK ID",
      initial: "initial",
      states: {
        initial: {
          on: {
            open: {
              target: "target",
            },
          },
        },
      },
    };
    type States = typeof simpleMachine["states"];

    test("should infer type from state without entries", () => {
      const sample: StateExpectationSet<States> = {
        initial: asyncNoop,
      };
      sample;
    });

    test("should warn when types not resolves", () => {
      const sample: StateExpectationSet<States> = {
        // @ts-expect-error
        error: asyncNoop,
      };
      sample;
    });
  });

  describe("machine with entries", () => {
    const machineWithEntries = {
      id: "CDEK ID",
      initial: "cdek id",
      states: {
        "cdek id": {
          entry: ["a", "b"] as const,
          on: {
            open: {
              target: "closed",
            },
          },
        },
      },
    };
    type States = typeof machineWithEntries["states"];

    test("should infer type from state with entries", () => {
      const sample: StateExpectationSet<States> = {
        "cdek id": {
          beforeAll: asyncNoop,
          entry: {
            // type resolves correctly for subtests
            a: asyncNoop,
            b: asyncNoop,
          },
        },
      };
      sample;
    });

    test("should warn when types not resolves", () => {
      const sample: StateExpectationSet<States> = {
        "cdek id": {
          beforeAll: asyncNoop,
          entry: {
            //@ts-expect-error
            c: asyncNoop,
          },
        },
      };
      sample;
    });
  });
});
