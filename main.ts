import { ArgumentMetadata, PipeTransform, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { lookup } from "dns/promises"
import { RootModule } from "./modules/RootModule"
import { timespan } from "./utils/timespan"

async function resolveHost(hostname: string) {
    return (await lookup(hostname)).address
}

class Test implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log({ value })
    }
}

const envs = [
    "BCRYPT_SALT",
    //
    "CLIENT_HOST",
    "CLIENT_PORT",
    //
    "JWT_EXPIRATION_TIME",
    "JWT_SECRET_KEY",
    //
    "DATABASE_URL",
]

async function bootstrap() {
    const PORT = 3000 || process.env.API_PORT

    const apiIp = (await lookup("api")).address
    const apiAdress = `http://${apiIp}:${PORT}`

    console.log({ apiAdress })

    for (const env_key of envs) {
        const env_value = process.env[env_key]
        if (!env_value)
            throw new Error(`Missing env property called "${env_key}"`)
    }

    const JWT_COOKIE_EXPIRATION_TIME = +timespan(
        process.env.JWT_EXPIRATION_TIME
    )

    if (!JWT_COOKIE_EXPIRATION_TIME)
        throw new Error("Possibly invalid JWT_EXPIRATION_TIME")

    //@ts-ignore
    process.env.BCRYPT_SALT = +process.env.BCRYPT_SALT as number

    //@ts-ignore
    process.env.JWT_COOKIE_EXPIRATION_TIME = JWT_COOKIE_EXPIRATION_TIME

    const CLIENT_HOST = process.env.CLIENT_HOST
    const CLIENT_PORT = process.env.CLIENT_PORT

    const CLIENT_IP = apiIp

    const CLIENT_ADRESS = `http://${CLIENT_IP}:${CLIENT_PORT}`

    const app = await NestFactory.create(RootModule)

    console.log({ CLIENT_ADRESS })

    app.enableCors({
        origin: [CLIENT_ADRESS],
        methods: ["POST", "PATCH", "PUT", "DELETE", "GET"],
        credentials: true,
    })

    app.useGlobalPipes(new ValidationPipe())

    app.setGlobalPrefix("/api")

    await app.listen(PORT)
}
bootstrap()
