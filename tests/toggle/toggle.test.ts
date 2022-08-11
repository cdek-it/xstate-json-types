import {declareTestModel} from '../../src/declare/declareTestModel'
import { describeWithJest } from '../../src/describe/jest/describeWithJest'
import toggleMachine from './toggle.machine'

describe("simple machine", () => {
  const toggle = {
    value: false,
    set: (next: boolean) => {
      toggle.value = next
    }
  }

  const model = declareTestModel(toggleMachine, {
    events: {
      "SET OFF": async () => {
        toggle.set(false)
      },
      "SET ON": async () => {
        toggle.set(true)
      },
    },
    expectations: {
      OFF: async () => {
        expect(toggle.value).toBe(false)
      },
      ON: async () => {
        expect(toggle.value).toBe(true)
      },
    }
  })

  describeWithJest(model)
})