import { StackVM } from '../..';
import { extractTemplates } from '@/lib/strings';

export class InstructionsRegistry {
  private instructions: Map<string, InstructionModel<StackVM.InstructionType>> = new Map();
  private fallback = new InstructionModel<string>();

  registerFallback (model: InstructionModel<string>) {
    this.fallback = model;
  }

  register<I extends StackVM.InstructionType> (instruction: I, model: InstructionModel<I>) {
    this.instructions.set(instruction, model);
  }

  visits (step: StackVM.Step) {
    return (this.instructions.get(step.type) ?? this.fallback).visit(step);
  }

  getInputVars (step: StackVM.Step) {
    return (this.instructions.get(step.type) ?? this.fallback).inputs(step);
  }

  getOutputVars (step: StackVM.Step) {
    return (this.instructions.get(step.type) ?? this.fallback).outputs(step);
  }

  getConnections (step: StackVM.model.StepModel) {
    return (this.instructions.get(step.type) ?? this.fallback).connect(step);
  }
}

type VisitResult = boolean | StackVM.SeqNo[];

export type ConnectInfo = { required?: boolean, target: string, handle: string }

export class InstructionModel<I extends StackVM.InstructionType> {
  visit (_step: StackVM.Step<I>): VisitResult {
    // By default, will visit next seq
    return true;
  }

  inputs (step: StackVM.Step<I>): string[] {
    function recursiveExtractTemplates (value: unknown, footprints: Set<unknown>): string[] {
      if (typeof value === 'string') {
        return extractTemplates(value);
      }
      if (value != null && typeof value === 'object') {
        if (footprints.has(value)) {
          return [];
        }
        footprints.add(value);
        if (value instanceof Array) {
          return value.flatMap(item => recursiveExtractTemplates(item, footprints));
        } else {
          return recursiveExtractTemplates(Object.values(value), footprints);
        }
      }
      return [];
    }

    return Object.values(step.parameters).flatMap(value => recursiveExtractTemplates(value, new Set()));
  }

  outputs (step: StackVM.Step<I>): string[] {
    const parameters: string[] = [];
    // For special instructions
    if ('output_vars' in step.parameters) {
      if (typeof step.parameters.output_vars === 'string') {
        parameters.push(step.parameters.output_vars);
      } else if (step.parameters.output_vars instanceof Array) {
        step.parameters.output_vars.forEach(item => {
          if (typeof item === 'string') {
            parameters.push(item);
          }
        });
      }
    }

    return parameters;
  }

  // Gen graph

  connect (step: StackVM.model.StepModel<I>): ConnectInfo[] {
    return [{
      required: false,
      target: `step:${step.seq_no + 1}`,
      handle: 'out',
    }];
  }
}
