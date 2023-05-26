import { Module } from "@nestjs/common";

import { ServeStaticModule } from "@nestjs/serve-static";
import { dirname } from "path";

import AuthModule from "./AuthModule";

const htmlPath = require.resolve("@financial/client/lib/index.html");
const libPath = dirname(htmlPath);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: libPath,
    }),
    AuthModule,
  ],
})
export default class RootModule {}
