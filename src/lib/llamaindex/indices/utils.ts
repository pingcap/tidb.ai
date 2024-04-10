export type ChoiceSelectParseResult = [number[], number[]];
export type ChoiceSelectParserFunction = (answer: string, numChoices: number, raiseErr?: boolean) => ChoiceSelectParseResult;

export function defaultParseChoiceSelectAnswerFn(
  answer: string,
  numChoices: number,
  raiseError: boolean = false
): ChoiceSelectParseResult {
  const answerLines = answer.split("\n");
  const answerNums: number[] = [];
  const answerRelevances: number[] = [];
  for (const answerLine of answerLines) {
    const lineTokens = answerLine.split(",");
    if (lineTokens.length !== 2) {
      if (!raiseError) {
        continue;
      } else {
        throw new Error(
          `Invalid answer line: ${answerLine}. ` +
          "Answer line must be of the form: " +
          "answer_num: <int>, answer_relevance: <float>"
        );
      }
    }
    const answerNum = parseInt(lineTokens[0].split(":")[1].trim());
    if (answerNum > numChoices) {
      continue;
    }
    answerNums.push(answerNum);
    const _answerRelevance = parseInt(lineTokens[1].split(":")[1].trim());
    answerRelevances.push(_answerRelevance);
  }
  return [answerNums, answerRelevances];
}
