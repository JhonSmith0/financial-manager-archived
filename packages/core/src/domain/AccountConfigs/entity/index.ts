import { plainToInstance } from "class-transformer"

export class AccountConfigs {
    public userId: string
    public allowTransactionsWhenAccountIsBelowZero: boolean = true

    constructor(data: AccountConfigsProps) {
        Object.assign(this, plainToInstance(AccountConfigs, data))
    }
}

export interface AccountConfigsProps extends ClassProperties<AccountConfigs> {}
