import {CondenseQuestionChatEngineOptionsSchema} from "@/core/config/chat_engines/condense_question";
import {z} from "zod";

export enum ChatEngineProvider {
  CONDENSE_QUESTION = 'condense-question',
}

export const ChatEngineProviderSchema = z.nativeEnum(ChatEngineProvider);

export const CreateChatEngineBaseOptionsSchema = z.object({
  name: z.string(),
  engine: ChatEngineProviderSchema
});

export const CreateCondenseQuestionChatEngineOptionsSchema = CreateChatEngineBaseOptionsSchema.extend({
  engine: z.literal(ChatEngineProvider.CONDENSE_QUESTION),
  engine_options: CondenseQuestionChatEngineOptionsSchema
});

export const CreateChatEngineOptionsSchema = z.discriminatedUnion('engine', [
  CreateCondenseQuestionChatEngineOptionsSchema
]);

export type CreateChatEngineOptions = z.infer<typeof CreateChatEngineOptionsSchema>;