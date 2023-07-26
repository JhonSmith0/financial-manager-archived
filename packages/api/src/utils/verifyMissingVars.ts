export function verifyMissingVars(envs: string[]) {
    for (const env_key of envs) {
        console.log(process.env)
        console.log({ [env_key]: process.env[env_key] })
        const env_value = process.env[env_key]
        if (!env_value)
            throw new Error(`Missing env property called "${env_key}"`)
    }
}
