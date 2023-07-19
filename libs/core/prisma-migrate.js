const { exec } = require("child_process")

const execAsync = promisify(exec)

async function main() {
    await execAsync("npx prisma generate")
    await execAsync("npx prisma migrate")
}

main()
