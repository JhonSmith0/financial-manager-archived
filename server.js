const { createApp } = require("@financial/api")
const { loadEnv } = require("@financial/core/dist/utils/loadEnv")

async function main() {
    loadEnv("prod")
    const app = await createApp()
    app.listen(3000)
}
main()
