import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDTO, IPaginate } from './dto/article.dto';

@ApiTags('News Article')
@Controller('articles')
export class ArticleController {
    constructor(private articleService: ArticleService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    createArticle(@Body() data: ArticleDTO) {
        return this.articleService.createArticle(data)
    }

    @Get("list")
    listArticles(@Query() data: IPaginate) {
        return this.articleService.listArticles(data)
    }

    @Get(":id/view")
    viewArticles(@Param("id") id) {
        return this.articleService.viewArticles(id)
    }

    @Put(":id")
    editArticles(@Param("id") id: string, @Body() data: ArticleDTO) {
        return this.articleService.editArticles(id, data)
    }

    @Delete(":id")
    deleteArticles(@Param("id") id: string) {
        return this.articleService.deleteArticles(id)
    }
}
