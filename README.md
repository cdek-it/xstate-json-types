## @cdek/xstate-json-types

Types for xstate [stately.ai](https://stately.ai) json files

### Usage

1. Export your machine from stately.ai as json file

2. Save it as typescript file
```ts
export default {
  // ...
} as const // make sure add this for properly typings
```

3. Declare your machine as test model
```ts
const model = declareTestModel(toggleMachine, {
  // your events that change state
  events: {
    "SET OFF": async () => {
      toggle.set(false)
    },
    "SET ON": async () => {
      toggle.set(true)
    },
  },

  // your asserts that check state
  expectations: {
    OFF: async () => {
      expect(toggle.value).toBe(false)
    },
    ON: async () => {
      expect(toggle.value).toBe(true)
    },
  }
})
```

4. Describe tests with preferred runner

```ts
describeWithJest(model) // only jest template for now
```

### Examples

Look into `tests` folder