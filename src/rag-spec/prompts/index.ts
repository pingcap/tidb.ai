export namespace prompts {
  export namespace system {
    export const start = ({ context }: { context: string }) => `Use the following pieces of context to answer the user question. This context retrieved from a knowledge base and you should use only the facts from the context to answer.
Your answer must be based on the context. If the context not contain the answer, just say that 'I don't know', don't try to make up an answer, use the context.

<context>
${context}
</context>

Your answer must be based on the context, don't use your own knowledge. 

Use markdown to answer. Write down uri reference you used for answer the question.
`;
  }
}
