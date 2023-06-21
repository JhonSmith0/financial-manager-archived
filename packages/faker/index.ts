import Account from "@financial/core/dist/domain/Account/entity"
import { Transaction } from "@financial/core/dist/domain/Transaction/entity"
import User from "@financial/core/dist/domain/User/entity/User"
import { randomUUID } from "crypto"

export function fakeUser() {
    return User.create({
        email: `${randomUUID()}@email.com`,
        name: "user name",
        password: "12345678",
        photo: "",
    })
}

export function fakeAccount(user: User) {
    const account = Account.create({
        description: "",
        name: randomUUID(),
        userId: user.id,
    })

    return account
}

export function fakeTransaction(
    user: User,
    fromAccount: Account,
    toAccount: Account
) {
    const transaction = Transaction.create({
        amount: 100,
        fromAccountId: fromAccount.id,
        toAccountId: toAccount.id,
        userId: user.id,
    })

    return transaction
}
