import { Module } from "@nestjs/common";

import { ServeStaticModule } from "@nestjs/serve-static";
import { dirname } from "path";

import AuthModule from "./AuthModule";
import { RouterModule } from "@nestjs/core";

const htmlPath = require.resolve("@financial/client/lib/index.html");
const libPath = dirname(htmlPath);

@Module({
  imports: [
    RouterModule.register([{ path: "api", module: AuthModule }]),
    ServeStaticModule.forRoot({
      rootPath: libPath,
    }),
    AuthModule,
  ],
})
export default class RootModule {}
