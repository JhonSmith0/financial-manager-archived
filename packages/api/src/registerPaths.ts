import { register } from "tsconfig-paths"
import { compilerOptions } from "../tsconfig.json"
import { resolve } from "path"
export function registerPaths() {
    register({
        baseUrl: compilerOptions.baseUrl,
        paths: Object.entries(compilerOptions.paths).reduce((acc, val) => {
            acc[val[0]] = val[1].map((e) =>
                resolve(__dirname, "../", compilerOptions.baseUrl, e)
            )

            return acc
        }, {}),
    })
}
