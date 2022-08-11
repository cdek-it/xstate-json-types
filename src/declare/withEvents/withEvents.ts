import { getKeys } from "../../utils/getKeys";
import { AsyncFunction } from "../types/AsyncFunction";
import { StateEventSet } from "../types/StateEventSet/StateEventSet";

/**
 * Create events for your machine
 */
export function withEvents<S>(events: StateEventSet<S>) {
  return getKeys(events).reduce(
    (total, next) => {
      const eventName = next as keyof typeof events;

      total[eventName] = {
        exec: events[eventName],
      };
      return total;
    },
    {} as Record<
      keyof typeof events,
      {
        exec: AsyncFunction;
      }
    >
  );
}
