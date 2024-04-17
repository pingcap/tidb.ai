import {RefinePrompt, TextQaPrompt} from "llamaindex";

export type PromptTemplate = (promptArgs: Record<string, any>) => string;

export const defaultChoiceSelectPrompt: PromptTemplate = ({ queryStr, contextStr }): string => {
  return `A list of documents is shown below. Each document has a number next to it along 
with a summary of the document. A question is also provided. \n
Respond with the numbers of the documents 
you should consult to answer the question, in order of relevance, as well \n
as the relevance score. The relevance score is a number from 1-10 based on 
how relevant you think the document is to the question.\n
Do not include any documents that are not relevant to the question. \n
Example format: \n
Document 1:\n<summary of document 1>\n\n
Document 2:\n<summary of document 2>\n\n
...\n\n
Document 10:\n<summary of document 10>\n\n
Question: <question>\n
Answer:\n
Doc: 9, Relevance: 7\n
Doc: 3, Relevance: 4\n
Doc: 7, Relevance: 3\n\n
Let's try this now: \n\n
${contextStr}\n
Question: ${queryStr}\n
Answer:\n
`
}

export const defaultTextQaPrompt: TextQaPrompt = ({ query, context }) => {
  return `Context information is below.
---------------------
${context}
---------------------
Given the context information and not prior knowledge, answer the query use markdown format. Add links reference to original contexts if necessary.
Query: ${query}
Answer:`;
};

export const defaultRefinePrompt: RefinePrompt = ({ context, query, existingAnswer }: any) => {
  return `The original query is as follows: ${query}
We have provided an existing answer: ${existingAnswer}
We have the opportunity to refine the existing answer (only if needed) with some more context below.
------------
${context}
------------
Given the new context, refine the original answer to better answer the query. If the context isn't useful, return the original answer.
Use markdown format to answer. Add links reference to contexts if necessary.
Refined Answer:`;
}
