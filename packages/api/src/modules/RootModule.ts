import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { dirname } from 'path';

const htmlPath = require.resolve('@financial/client/lib/index.html');
const libPath = dirname(htmlPath);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: libPath,
    }),
  ],
})
export default class RootModule {}
