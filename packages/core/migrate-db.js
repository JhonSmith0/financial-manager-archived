const { execSync } = require("child_process")
const { randomUUID } = require("crypto")
const { parse } = require("dotenv")
const { readFileSync, writeFileSync, existsSync, rmSync } = require("fs")
const { resolve } = require("path")

class Env {
    data = {}

    constructor(path) {
        this.path = path
    }

    contentString() {
        return readFileSync(this.path, "utf-8")
    }

    parse() {
        return (this.data = parse(this.contentString()))
    }

    toString() {
        return Object.entries(this.data)
            .map(([key, value]) => {
                return `${key}=${value}`
            })
            .join("\n")
    }

    save() {
        writeFileSync(this.path, this.toString())
        return this
    }

    saveTo(path) {
        writeFileSync(path, this.toString())
        return new Env(path)
    }

    remove() {
        rmSync(this.path)
    }
}

function main() {
    console.log(`Migrating db to url ${process.env.DATABASE_URL}`)

    const envPath = ".env"
    const tempEnvPath = `.env${randomUUID().slice(0, 6)}`

    if (!existsSync(envPath)) writeFileSync(envPath, "")

    const envFile = new Env(envPath)
    const envFileBackupData = { ...envFile.parse() }

    envFile.data.DATABASE_URL = process.env.DATABASE_URL
    envFile.save()

    try {
        execSync("pnpm prisma generate")
        execSync("pnpm prisma migrate dev --skip-generate")
    } catch (error) {
    } finally {
        envFile.data = envFileBackupData
        envFile.save()
    }
}

main()
