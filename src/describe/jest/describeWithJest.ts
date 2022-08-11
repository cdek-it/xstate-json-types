// any need to declare autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestModel } from '@xstate/test'
import { describePlansJest } from './describePlansJest'

export function describeWithJest(model: TestModel<any, any>) {
  describe(model.machine.id, () => {
    const plans = model.getSimplePathPlans()

    describePlansJest(plans)

    describe('coverage', () => {
      test('full', () => model.testCoverage())
    })
  })
}
