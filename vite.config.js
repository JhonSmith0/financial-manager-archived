import react from "@vitejs/plugin-react-swc"
import { lookup } from "dns/promises"
import { defineConfig } from "vite"
import vitePath from "vite-tsconfig-paths"

const envs = ["VITE_API_HOST", "VITE_API_PORT"]

async function resolveApiIpByHost(host: string) {
    return (await lookup(host)).address
}

export default async () => {
    for (const env_key of envs) {
        const env_value = process.env[env_key]
        if (!env_value)
            throw new Error(`Missing env property called "${env_key}"`)
    }

    const [HOST, PORT] = [process.env.VITE_API_HOST, process.env.VITE_API_PORT]

    const apiIpAdress = await resolveApiIpByHost(HOST)
    process.env.VITE_API_URL = `http://${apiIpAdress}:${PORT}`

    console.log(process.env.VITE_API_URL)

    // https://vitejs.dev/config/
    return defineConfig({
        plugins: [react(), vitePath()],
    })
}
