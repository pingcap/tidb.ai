export async function executeInSafeDuration (
  executor: () => Promise<boolean>,
  maxDuration: number = 15,
  threshold: number = 0.75,
  debugName: string = '',
) {
  const start = Date.now();
  const timeout = start + maxDuration * threshold * 1000;
  let times = 0;
  let meanDuration = 0;
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;

  while (Date.now() + meanDuration < timeout) {
    const currentStart = Date.now();

    const continueExecutions = await executor();

    const duration = Date.now() - currentStart;

    times += 1;
    meanDuration = (Date.now() - start) / times;

    min = Math.min(duration, min);
    max = Math.max(duration, max);

    if (!continueExecutions) {
      break;
    }
  }

  console.info(`${debugName ? debugName + ': ' : ''}execute loops finished: [target=${maxDuration}s, threshold=${threshold * maxDuration}s, times=${times}, mean=${meanDuration / 1000}s, min=${times > 0 ? min : 0}s, max=${max}s]`);
}
