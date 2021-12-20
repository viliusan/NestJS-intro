import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';

const {
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT, 10),
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
