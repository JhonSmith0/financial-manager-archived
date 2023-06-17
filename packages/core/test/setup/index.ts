import { PrismaRepo } from "@/common/repo/PrismaRepo";
import Account from "@/domain/Account/entity";
import { Transaction } from "@/domain/Transaction/entity";
import User from "@/domain/User/entity/User";
import { loadEnv } from "@/utils/loadEnv";



loadEnv("test");
beforeAll(async () => {

    const repo = new PrismaRepo();

    await repo.transaction.deleteMany()
    await repo.account.deleteMany()
    await repo.user.deleteMany()

    

})

export const usersForTests = Array.from({length: 10}, (_, i) => User.create({
    email: `email${i}@email.com`, 
    name: `user name ${i}`, 
    password: `randompassword${i}`, 
    photo: ''

}))

export const accountsForTests = Array.from({length: 10}, (_, i) => Account.create({
description: '', 
name: `account number ${i}`, 
userId: usersForTests[i].id, 

}))

export const transactionsForTests = Array.from({length: 10}, (_, i) => Transaction.create({
description: '', 
amount: i * 100, 
fromAccountId: accountsForTests[0].id, 
toAccountId: accountsForTests[1].id, 
userId: accountsForTests[0].id, 



}))


