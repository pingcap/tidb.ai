export function MessageHeading () {
  return (
    <div className="font-normal text-lg flex items-center gap-2">
      <img className="dark:hidden h-4" src="/answer-black.svg" alt="logo" />
      <img className="hidden dark:block h-4" src="/answer-white.svg" alt="logo" />
      Answer
    </div>
  )
}
