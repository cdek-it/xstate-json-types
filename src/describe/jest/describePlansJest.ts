// any need to declare autotypings
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestPlan } from '@xstate/test/lib/types'

export function describePlansJest(plans: TestPlan<any, any>[]) {
  plans.forEach(plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => path.test(undefined))
      })
    })
  })
}
