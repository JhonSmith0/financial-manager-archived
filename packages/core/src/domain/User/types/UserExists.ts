import UserProps from "./UserProps"

export default interface UserExists
    extends Partial<Pick<UserProps, "id" | "email">> {}
