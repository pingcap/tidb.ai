import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// FIXME: flatten by schema
export function flattenSettings<T>(obj: T, maxDepth?: number): T {
  // {homepage: { title: 'a', description: 'b', example_questions: [{text: 'c'}, {text: 'd'}]}} => {'homepage.title': 'a', 'homepage.description': 'b', 'homepage.example_questions': [{text: 'c'}, {text: 'd'}]}
  const result: any = {};
  function recurse(cur: any, prop: string, depth: number) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else {
      let isEmpty = true;
      const isArray = cur instanceof Array;
      for (const p in cur) {
        if (maxDepth && depth >= maxDepth) {
          result[prop] = cur;
          return;
        }
        isEmpty = false;
        recurse(cur[p], prop ? `${prop}.${p}` : p, depth + 1);
      }
      if (isEmpty && prop) {
        // FIXME: what if an array schema with nullish value?
        result[prop] = isArray ? [] : {};
      }
    }
  }
  recurse(obj, '', 0);
  return result;
}

// {'homepage.title': 'a', 'homepage.description': 'b', 'homepage.example_questions': [{text: 'c'}, {text: 'd'}]} => {homepage: { title: 'a', description: 'b', example_questions: [{text: 'c'}, {text: 'd'}]}}
export function unflattenSettings<T>(obj: T): T {
  if (Object(obj) !== obj) {
    return obj;
  }
  const result: any = {};
  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc, cur, idx) => {
      return (acc[cur] = keys.length - 1 === idx ? obj[key] : acc[cur] || {});
    }, result);
  }
  return result;
}
