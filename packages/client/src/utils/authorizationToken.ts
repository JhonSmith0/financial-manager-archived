import { parse } from "cookie"
export default function authorizationToken() {
    return parse(document.cookie ?? "").authorization
}
