import { Global, Module } from "@nestjs/common"

import { RouterModule } from "@nestjs/core"
import { AccountModule } from "./AccountModule"
import AuthModule from "./AuthModule"
import { OnlyLoggedUsers } from "./OnlyLoggedUsers"
import { TransactionModule } from "./TransactionModule"

@Global()
@Module({
    imports: [
        RouterModule.register([
            {
                path: "api",
                module: OnlyLoggedUsers,
                children: [AccountModule, TransactionModule],
            },
        ]),

        AuthModule,
        OnlyLoggedUsers,
        AccountModule,
    ],
})
export default class RootModule {}
