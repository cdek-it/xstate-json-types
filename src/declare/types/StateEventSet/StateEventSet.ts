import { AsyncFunction } from "../AsyncFunction";

export type StateEvent = AsyncFunction;

export type StateEventSet<S, SK extends keyof S = keyof S> = {
  [K in ExtractEventsKeys<S[SK]>]: StateEvent;
};

type ExtractEventsKeys<S> = S extends { on: infer On }
  ? keyof On
  : S extends { type: "final" }
  ? never // no keys for final state
  : S extends { on: undefined }
  ? never // no keys when on events undefined
  : never;
