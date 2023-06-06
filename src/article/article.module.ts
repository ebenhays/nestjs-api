import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Articles } from './models/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Articles])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }
