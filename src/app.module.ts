import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { Articles } from './article/models/article.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [Articles],
      synchronize: false,
    }), ArticleModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
