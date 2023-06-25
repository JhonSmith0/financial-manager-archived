import { config } from "dotenv"
import { resolve } from "path"
import { createApp } from "."
import { configureApp } from "./configureApp"

config({
    path: resolve(__dirname, "../.env"),
    override: false,
})

async function main() {
    // Loads envs from core package
    console.log(process.env)
    const app = await createApp()
    configureApp(app)

    app.listen(3000)
}

main()
