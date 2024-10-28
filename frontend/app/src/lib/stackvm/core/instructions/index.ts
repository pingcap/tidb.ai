import { Assign, Calling, Fallback, Jmp, Reasoning } from './instructions';
import { InstructionsRegistry } from './registry';

const instructions = new InstructionsRegistry();

instructions.register('assign', new Assign());
instructions.register('jmp', new Jmp());
instructions.register('calling', new Calling());
instructions.register('reasoning', new Reasoning());
instructions.registerFallback(new Fallback());

export { instructions };
