import Entity from "@/common/Entity/Entity";
import Hash from "@/common/Hash/Hash";
import { Transformer } from "@/common/Transformer";
import { randomUUID } from "crypto";
import UserProps from "../types/UserProps";

export default class User extends Entity {
	public name: string;
	public photo = "";
	public email: string;
	public password: string;
	public role?: "normal" | "admin" | string = "normal";

	public static dataForTest: UserProps = {
		email: "test@email.com",
		id: randomUUID(),
		name: "test user",
		password: "12345678",
		photo: "photo.png",
	};

	public async comparePassword(candidate: string) {
		return await Hash.compareTo(this.password, candidate);
	}

	public async cryptPassword() {
		this.password = await Hash.hash(this.password, 12);
	}

	public static fromPlain(data: UserProps) {
		return Transformer.plainToInstance(User, data, {
			excludeExtraneousValues: false,
		});
	}

	public static create(data: Omit<UserProps, "id">) {
		const obj = Transformer.plainToInstance(User, data, {
			excludeExtraneousValues: false,
		});

		return obj;
	}
}
