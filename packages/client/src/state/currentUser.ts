import { IUser } from "@/interface";
import { hookstate } from "@hookstate/core";

const currentUser = hookstate<IUser>(null as any as IUser);
export default currentUser;
