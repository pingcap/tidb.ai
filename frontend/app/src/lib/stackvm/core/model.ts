import { instructions } from './instructions';
import { type InstructionType, type State, type Step } from './types';

export namespace model {
  export interface VarBindingInfo {
    id: string;
    parameter?: string;
  }

  export interface StepModel<I extends InstructionType = InstructionType> extends Step<I> {
    id: string;
    output_vars: VarBindingInfo[];
    input_vars: VarBindingInfo[];
  }

  export interface VarModel {
    id: string;
    name: string;
    value?: unknown;
    arc?: number;
    execution_state?: 'write';

    [key: string]: unknown;
  }

  export interface ParsedState extends State {
    plan: {
      steps: StepModel[];
      vars: VarModel[];
    };
  }

  export function parseState (state: State): ParsedState {
    const steps = new Map<string, StepModel>;
    const vars = new Set<string>;

    for (const step of state.current_plan) {
      const id = `step:${step.seq_no}`;
      const output_vars: VarBindingInfo[] = [];
      const input_vars: VarBindingInfo[] = [];

      for (let name of instructions.getInputVars(step)) {
        addVar(input_vars, {
          id: `var:${name}`,
          parameter: name,
        });
        vars.add(name);
      }

      for (let name of instructions.getOutputVars(step)) {
        addVar(output_vars, {
          id: `var:${name}`,
          parameter: name,
        });
        vars.add(name);
      }

      steps.set(id, {
        ...step,
        id,
        output_vars,
        input_vars,
      });
    }

    return {
      ...state,
      plan: {
        steps: Array.from(steps.values()),
        vars: Array.from(vars).map(name => ({ id: `var:${name}`, name })),
      },
    };
  }

  export interface StatePatch {
    steps: Patch<StepModel>;
    vars: Patch<VarModel>;
  }

  export function diffStates (from: ParsedState, to: ParsedState): StatePatch {
    return {
      steps: diff(from.plan.steps, to.plan.steps),
      vars: diff(from.plan.vars, to.plan.vars),
    };
  }

  function addVar (bindings: VarBindingInfo[], newOne: VarBindingInfo) {
    if (!bindings.find(binding => binding.id === newOne.id)) {
      bindings.push(newOne);
    }
  }
}

type Patch<T extends { id: string }> = {
  del: string[]
  add: T[]
  update: Record<string, T>
}

function diff<T extends { id: string }> (from: T[], to: T[]): Patch<T> {
  const oldItems = new Set(from.map(item => item.id));
  const newItems = new Map(to.map(item => [item.id, item]));

  const patch: Patch<T> = {
    del: [],
    add: [],
    update: {},
  };

  oldItems.forEach(id => {
    const step = newItems.get(id);
    if (step) {
      patch.update[id] = step;
    } else {
      patch.del.push(id);
    }
  });

  newItems.forEach((step, id) => {
    if (!oldItems.has(id)) {
      patch.add.push(step);
    }
  });

  return patch;
}
