export function Branding () {
  return (
    <span className="flex items-center gap-2">
      <img className="dark:hidden" src="/tidb-ai.svg" alt="logo" width={32} height={32} />
      <img className="hidden dark:block" src="/tidb-ai-light.svg" alt="logo" width={32} height={32} />
      <span className="text-2xl font-bold flex-shrink-0 tracking-widest">
        tidb.ai
      </span>
    </span>
  );
}