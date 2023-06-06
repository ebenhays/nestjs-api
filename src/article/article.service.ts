import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { ArticleDTO, IPaginate } from './dto/article.dto';
import { Articles } from './models/article.entity';
import axios from 'axios'

@Injectable()
export class ArticleService {

    constructor(@InjectRepository(Articles) private articleRepo: Repository<Articles>) { }

    async createArticle(data: ArticleDTO): Promise<Articles> {
        const createdArticle = this.articleRepo.create(data)
        return await this.articleRepo.save(createdArticle)
    }

    async listArticles(data: IPaginate): Promise<Articles[]> {
        const getList = await this.articleRepo.find({
            take: data.limit,
            skip: data.offset,
            where: {
                expirationDate: MoreThanOrEqual(new Date())
            },
            select: {
                id: true,
                title: true,
                author: true,
                creationDate: true,
                publicationDate: true,
            }
        })
        if (!getList) throw new NotFoundException()
        const extractNames = getList.map((rec) => rec.author)
        const response = await this.getEstimatedAge(extractNames)
        for (let resp of response) {
            const findRec = getList.find(lst => lst.author.split(' ')[0] === resp.name)
            findRec["age"] = resp.age
        }
        return getList

    }

    async viewArticles(id: string): Promise<Articles> {
        const getList = await this.articleRepo.findOne({
            where: {
                id,
                expirationDate: MoreThanOrEqual(new Date())
            },
            select: {
                id: true,
                title: true,
                author: true,
                creationDate: true,
                publicationDate: true
            }
        })

        if (!getList) throw new NotFoundException()

        const response = await this.getEstimatedAge([getList.author])
        getList["age"] = response[0].age
        return getList

    }


    async editArticles(id: string, data: ArticleDTO): Promise<Articles> {
        const findArticle = await this.articleRepo.findOne({
            where: {
                id
            },
        })

        if (!findArticle) throw new NotFoundException()
        findArticle.author = data.author
        findArticle.creationDate = data.creationDate
        findArticle.publicationDate = data.publicationDate
        findArticle.text = data.text
        findArticle.title = data.title
        return await this.articleRepo.save(findArticle)

    }

    async deleteArticles(id: string): Promise<Articles> {
        const findArticle = await this.articleRepo.findOne({
            where: {
                id
            },
        })

        if (!findArticle) throw new NotFoundException()
        return await this.articleRepo.remove(findArticle)

    }


    private async getEstimatedAge(names: string[]) {
        const url = new URL('https://api.agify.io')
        for await (let name of names) {
            url.searchParams.append('name[]', name.split(' ')[0])
        }
        const response = await axios.get(url.toString())
        return response.data
    }



}
