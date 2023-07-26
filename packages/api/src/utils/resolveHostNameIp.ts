import { lookup } from "dns/promises"

export async function resolveHostNameIp(hostname: string) {
    return (await lookup(hostname)).address
}
