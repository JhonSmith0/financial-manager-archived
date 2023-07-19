import { config, parse } from "dotenv"
import { basename, resolve } from "path"

function env(relative: string) {
    return resolve(__dirname, "../../", relative)
}

// If its a file it bugs when the repo is used by another package such as api
function resolveDatabase(url: string) {
    if (url.startsWith("file:"))
        return `file:${resolve(__dirname, "../../prisma/db", basename(url))}`
    return url
}

const strategy = {
    dev: env(".env.dev"),
    prod: env(".env.prod"),
    test: env(".env.test"),
}

export function loadEnv(type: keyof typeof strategy, override = true) {
    if (!(type in strategy)) throw new Error("Invalid env type!")

    const obj = config({ path: strategy[type], override })

    process.env["DATABASE_URL"] = resolveDatabase(process.env.DATABASE_URL)

    return obj
}
