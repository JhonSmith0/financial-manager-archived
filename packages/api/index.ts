import { NestFactory } from '@nestjs/core';
import RootModule from './src/modules/RootModule';

export async function createApp() {
  return await NestFactory.create(RootModule);
}
