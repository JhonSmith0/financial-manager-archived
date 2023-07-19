const { createApp } = require("@services/api")
const { loadEnv } = require("@services/api/dist/utils/loadEnv")

async function main() {
    loadEnv("prod")
    const app = await createApp()
    app.listen(3000)
}
main()
