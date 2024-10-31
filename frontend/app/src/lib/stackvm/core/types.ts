export type SeqNo = number

export interface KnownInstructions {
  assign: Record<string, unknown>;

  jmp: {
    condition_prompt: string
    context: string | null
    jump_if_true: SeqNo
    jump_if_false: SeqNo
  } | {
    target_seq: SeqNo
  };

  calling: {
    tool_name: string
    tool_params: Record<string, unknown>
    output_vars: string | string[]
  };

  reasoning: {
    chain_of_thoughts: string
    dependency_analysis: string
  };
}

export interface Instructions extends KnownInstructions {
  [key: string]: Record<string, unknown>;
}

export type InstructionType = string & keyof Instructions;

export interface Step<Instruction extends InstructionType = InstructionType> {
  seq_no: SeqNo;
  type: Instruction;
  parameters: Instructions[Instruction];

  [key: string]: unknown;
}

export interface Plan {
  steps: Step[];

  [key: string]: unknown;
}

export interface State {
  current_plan: Step[];
  errors: string[];
  goal: string;
  goal_completed: boolean;
  msgs: Record<string, string>[];
  program_counter: number;
  variables: Record<string, unknown>;
  variables_refs: Record<string, number>;
}
