import { Account, PrismaClient, Transaction } from "@prisma/client"
import { fakeAccount, fakeTransaction, fakeUser } from "../setup/faker"

export async function createRandomAccount(repo: PrismaClient, length = 1) {
    const user = fakeUser()
    const accounts: Account[] = []

    for (let i = 0; i < length; i++) {
        const account = fakeAccount(user)
        accounts.push(account)
        await repo.account.create({
            data: {
                description: account.description,
                id: account.id,
                name: account.name,
                user: {
                    connectOrCreate: {
                        create: user,
                        where: {
                            id: user.id,
                        },
                    },
                },
            },
        })
    }

    return { user, accounts }
}

export async function createRandomTransaction(repo: PrismaClient, length = 1) {
    const {
        accounts: [from, to],
        user,
    } = await createRandomAccount(repo, 2)

    const transactions: Transaction[] = []

    for (let i = 0; i < length; i++) {
        const tr = fakeTransaction(user, from, to)

        transactions.push(tr)
        await repo.transaction.create({
            data: {
                ...(tr as any),
                userId: undefined,
                fromAccountId: undefined,
                toAccountId: undefined,
                user: {
                    connectOrCreate: {
                        create: user,
                        where: {
                            id: user.id,
                        },
                    },
                },
                toAccount: {
                    connectOrCreate: {
                        create: from,
                        where: {
                            id: from.id,
                        },
                    },
                },
                fromAccount: {
                    connectOrCreate: {
                        create: from,
                        where: {
                            id: from.id,
                        },
                    },
                },
            },
        })
    }

    return { user, from, to, transactions }
}
