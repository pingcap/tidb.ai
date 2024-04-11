export async function measure(action: () => Promise<any>){
  const start = new Date();
  await action();
  const end = new Date();
  return end.getTime() - start.getTime();
}
