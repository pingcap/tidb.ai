export function Branding () {
  return (
    <span className="flex items-center gap-1">
      <img className="dark:hidden" src="/tidb-ai.svg" alt="logo" width={24} height={24} />
      <img className="hidden dark:block" src="/tidb-ai-light.svg" alt="logo" width={24} height={24} />
      <span className="text-2xl font-bold flex-shrink-0 tracking-widest">
        tidb.ai
      </span>
    </span>
  );
}