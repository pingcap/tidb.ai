
export function getEnv (name: keyof NodeJS.ProcessEnv) {
  const env = process.env[name];
  if (env == null) {
    throw new Error(`Environment variable ${name} not provided.`);
  }
  return env;
}

export function getOptionalEnv (name: keyof NodeJS.ProcessEnv) {
  const env = process.env[name];
  if (env == null) {
    return undefined;
  }
  return env;
}
