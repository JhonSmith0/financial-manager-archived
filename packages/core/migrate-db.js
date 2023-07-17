const { execSync } = require("child_process")
const { parse } = require("dotenv")
const { readFileSync, writeFileSync, existsSync, rmSync } = require("fs")
const { resolve } = require("path")

class Env {
    data = {}

    constructor(path) {
        if (!existsSync(path)) {
            writeFileSync(path, "")
        }

        this.path = path
        this.data = this.parse()
    }

    contentString() {
        return readFileSync(this.path, "utf-8")
    }

    parse() {
        return parse(this.contentString())
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

const envOriginal = new Env(resolve(__dirname, ".env"))
const envCopy = envOriginal.saveTo(".env.copy")

envOriginal.data.DATABASE_URL = process.env.DATABASE_URL
envOriginal.save()

execSync("npx prisma generate")
execSync("npx prisma migrate dev --skip-generate")

envOriginal.remove()
envCopy.remove()

envCopy.saveTo(envOriginal.path)
