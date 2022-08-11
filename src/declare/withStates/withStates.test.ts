import { withStates } from "./withStates";

export default describe("withStates.test", () => {
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

    test("withStates should create meta.test that invoke all entries and base inside", async () => {
      const base = jest.fn();
      const a = jest.fn();
      const b = jest.fn();

      const result = withStates(machineWithEntries.states, {
        "cdek id": {
          beforeAll: base,
          entry: {
            a,
            b,
          },
        },
      });

      await result["cdek id"].meta.test();

      expect(base).toBeCalledTimes(1);
      expect(a).toBeCalledTimes(1);
      expect(b).toBeCalledTimes(1);
    });

    test("when entry crashed, message error describe it", async () => {
      const a = async () => {
        throw new Error("entry a crashed");
      };

      const result = withStates(machineWithEntries.states, {
        "cdek id": {
          beforeAll: jest.fn(),
          entry: {
            a,
            b: jest.fn(),
          },
        },
      });

      const promise = result["cdek id"].meta.test();
      await expect(promise).rejects.toBeTruthy();
    });
  });
});
