import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ArticleDTO {
    @ApiProperty()
    @IsNotEmpty()
    title: string
    @ApiProperty()
    @IsNotEmpty()
    author: string
    @ApiProperty()
    text?: string
    @ApiProperty()
    @IsNotEmpty()
    creationDate: Date
    @ApiProperty()
    @IsNotEmpty()
    publicationDate: Date
    @ApiProperty()
    @IsNotEmpty()
    expirationDate: Date
}

export class IPaginate {
    @ApiProperty()
    @IsNotEmpty()
    limit: number
    @ApiProperty()
    @IsNotEmpty()
    offset: number
}