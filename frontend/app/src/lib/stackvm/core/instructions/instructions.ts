import { model, type Step } from '..';
import { type ConnectInfo, InstructionModel } from './registry';

export class Assign extends InstructionModel<'assign'> {
  outputs (step: Step<'assign'>): string[] {
    return Object.keys(step.parameters);
  }
}

export class Calling extends InstructionModel<'calling'> {
}

export class Jmp extends InstructionModel<'jmp'> {
  connect (step: model.StepModel<'jmp'>): ConnectInfo[] {
    if ('target_seq' in step.parameters) {
      return [{
        target: `step:${step.parameters.target_seq}`,
        handle: 'target_seq',
        required: true,
      }];
    } else {
      return [
        {
          target: `step:${step.parameters.jump_if_true}`,
          required: true,
          handle: 'target_seq',
        },
        {
          target: `step:${step.parameters.jump_if_false}`,
          required: true,
          handle: 'target_seq',
        },
      ];
    }
  }
}

export class Reasoning extends InstructionModel<'reasoning'> {
}

export class Fallback extends InstructionModel<string> {
}
