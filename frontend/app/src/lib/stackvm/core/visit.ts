import { model } from './model';

export namespace algo {

  export function visit (state: model.ParsedState, stepId: string, iterFunc: (step: model.StepModel) => void | false) {
    const steps = new Map(state.plan.steps.map(step => [step.id, step]));
    // const vars = new Map(plan.vars.map(v => [v.id, v]));

    if (!steps.has(stepId)) {
      throw new Error(`Invalid step ${stepId}`);
    }

    const footprint = new Set<string>();
    const queue = [steps.get(stepId)!];

    while (queue.length > 0) {
      const step = queue.shift()!;
      footprint.add(step.id);

      if (iterFunc(step) === false) {
        break;
      }

      switch (step.type) {
        case 'jmp':
          if ('target_seq' in step.parameters) {
            const next = steps.get(`step:${step.parameters.target_seq}`)!;
            if (!footprint.has(next.id)) {
              queue.push(next);
            }
          } else {
            const nextTrue = steps.get(`step:${step.parameters.jump_if_true}`)!;
            const nextFalse = steps.get(`step:${step.parameters.jump_if_false}`)!;
            if (!footprint.has(nextTrue.id)) {
              queue.push(nextTrue);
            }
            if (!footprint.has(nextFalse.id)) {
              queue.push(nextFalse);
            }
          }
          break;
        default:
          if (steps.has(`step:${step.seq_no + 1}`)) {
            const next = steps.get(`step:${step.seq_no + 1}`)!;
            if (!footprint.has(next.id)) {
              queue.push(next);
            }
          }
          break;
      }
    }
  }
}