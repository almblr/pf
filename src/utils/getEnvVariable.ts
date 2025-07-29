const getEnvVariable = (ENV_VARIABLE: string): string => {
  const envVariable = (import.meta.env[ENV_VARIABLE]) ? import.meta.env[ENV_VARIABLE] : undefined
  if(!envVariable) throw new Error(`${ENV_VARIABLE} environment variable is missing.`)
  return envVariable
}

export default getEnvVariable
