import { ValidationPipe } from "@nestjs/common"
import { createApp } from "."
import { envVars } from "./config"
import { AllExceptionFilter } from "./filters/AllException"
import { AdaptLeftRightInterceptor } from "./interceptors/AdaptLeftRight"
import { resolveHostNameIp } from "./utils/resolveHostNameIp"
import { timespan } from "./utils/timespan"
import { verifyMissingVars } from "./utils/verifyMissingVars"

function convertJwtExpiration() {
    const JWT_COOKIE_EXPIRATION_TIME = +timespan(
        process.env.JWT_EXPIRATION_TIME
    )
    if (!JWT_COOKIE_EXPIRATION_TIME)
        throw new Error("Invalid JWT_EXPIRATION_TIME")
    //@ts-ignore
    process.env.JWT_COOKIE_EXPIRATION_TIME = JWT_COOKIE_EXPIRATION_TIME
}

function convertBcryptSalt() {
    //@ts-ignore
    process.env.BCRYPT_SALT = +process.env.BCRYPT_SALT as number
}

function genDataBaseUrl() {
    const USER = process.env.MYSQL_USER
    const PASSWORD = process.env.MYSQL_ROOT_PASSWORD
    const DATABASE_HOST = process.env.DATABASE_HOST
    const DATABASE_NAME = process.env.DATABASE_NAME
    const DATABASE_PORT = process.env.DATABASE_PORT

    const URL = `mysql://${USER}:${PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
    return URL
}

async function main() {
    verifyMissingVars(envVars)
    convertJwtExpiration()
    convertBcryptSalt()
    //@ts-ignore
    process.env.DATABASE_URL = genDataBaseUrl()

    const app = await createApp()
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: {
                exposeDefaultValues: true,
                excludeExtraneousValues: true,
            },
        })
    )

    app.useGlobalInterceptors(new AdaptLeftRightInterceptor())
    app.useGlobalFilters(new AllExceptionFilter())

    const apiAdress = await resolveHostNameIp("api")
    const clientUrl = `http://${apiAdress}:${process.env.CLIENT_PORT}`
    console.log({ clientUrl })
    app.enableCors({
        origin: [clientUrl],
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })

    const PORT = 3000 || process.env.API_PORT
    app.listen(PORT)
}

main()
