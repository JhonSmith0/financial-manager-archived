import { PrismaRepo } from "@/common/repo/PrismaRepo";
import Account from "@/domain/Account/entity";
import { Transaction } from "@/domain/Transaction/entity";
import User from "@/domain/User/entity/User";
import { loadEnv } from "@/utils/loadEnv";

loadEnv("test");
const repo = new PrismaRepo();
beforeAll(async () => {
	await resetDb();
	await repo.$connect();
});

afterAll(async () => {
	await repo.$disconnect();
});

export async function resetDb() {
	await repo.transaction.deleteMany();
	await repo.account.deleteMany();
	await repo.user.deleteMany();
}

export const usersForTests = Array.from({ length: 10 }, (_, i) =>
	User.create({
		email: `email${i}@email.com`,
		name: `user name ${i}`,
		password: `randompassword${i}`,
		photo: "",
	})
);

export const accountsForTests = Array.from({ length: 10 }, (_, i) =>
	Account.create({
		description: "",
		name: `account number ${i}`,
		userId: usersForTests[i].id,
	})
);

export const transactionsForTests = Array.from({ length: 10 }, (_, i) =>
	Transaction.create({
		description: "",
		amount: i * 100,
		fromAccountId: accountsForTests[0].id,
		toAccountId: accountsForTests[1].id,
		userId: accountsForTests[0].id,
	})
);

export function genUsers(length = 10) {
	return Array.from({ length }, (_, i) =>
		User.create({
			email: `email${i}@email.com`,
			name: `user name ${i}`,
			password: `randompassword${i}`,
			photo: "",
		})
	);
}

export function genTransactions(
	from: Account,
	to: Account,
	user: User,
	length = 10
) {
	return Array.from({ length }, (_, i) =>
		Transaction.create({
			description: "",
			amount: i * 100,
			fromAccountId: from.id,
			toAccountId: to.id,
			userId: user.id,
		})
	);
}
export function genAccounts(user: User, length = 10) {
	return Array.from({ length }, (_, i) =>
		Account.create({
			description: "",
			name: `account number ${i}`,
			userId: user.id,
		})
	);
}
