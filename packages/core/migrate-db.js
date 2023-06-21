// Migrate all DATABASE_URL on each .env* file

const { exec } = require("child_process")
const { config, parse, configDotenv, decrypt, populate } = require("dotenv")
const {
    readFileSync,
    writeFileSync,
    existsSync,
    rmSync,
    readdirSync,
} = require("fs")
const { resolve, basename } = require("path")
const { promisify } = require("util")

function readDir(dir) {
    return readdirSync(dir).map((e) => resolve(dir, e))
}

function readEnv(path) {
    if (!existsSync(path)) writeFileSync(path, "")

    return {
        get basename() {
            return basename(path)
        },

        path,
        get content() {
            return readFileSync(path, "utf-8")
        },

        get object() {
            return parse(this.content) || {}
        },

        remove() {
            rmSync(path)
        },

        stringToObject(string) {
            return parse(string)
        },

        objectToString(obj) {
            return Object.entries(obj)
                .map((e) => e.join("="))
                .join("\n")
        },

        configAsEnv() {
            config({ path })
        },

        write(data) {
            writeFileSync(path, data, "utf-8")
        },

        copy() {
            return readEnv(path)
        },
    }
}

const rootEnv = readEnv(resolve(__dirname, ".env"))

const envs = readDir(__dirname).filter((e) => basename(e).startsWith(".env"))
const envsWithDBurl = envs.map(readEnv).filter((e) => e.object["DATABASE_URL"])

const execAsync = promisify(exec)

void (async function () {
    await execAsync("npx prisma generate")

    for (const each of envsWithDBurl) {
        rootEnv.write(each.content)

        console.log(
            await execAsync(
                "npx prisma migrate dev --skip-generate --name " + each.basename
            )
        )
    }
    rootEnv.remove()
})().finally(() => rootEnv.remove())
