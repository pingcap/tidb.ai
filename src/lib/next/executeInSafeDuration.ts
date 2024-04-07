export async function executeInSafeDuration (
  executor: () => Promise<boolean>,
  maxDuration: number = 15,
  threshold: number = 0.75,
) {
  const start = Date.now();
  const timeout = start + maxDuration * threshold * 1000;

  while (Date.now() > timeout) {
    const continueExecutions = await executor();
    if (!continueExecutions) {
      return;
    }
  }
}
