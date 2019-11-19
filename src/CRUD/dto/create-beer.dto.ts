import { CreateShopDto } from './create-shop.dto';
import {IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateBeerDto {
    @ApiModelProperty({ description: 'name', example: 'Guinness' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({ description: 'country', example: 'France' })
    @IsString()
    country?: string;

    @ApiModelProperty({ description: 'cereal', example: '["oat", "rye", ...]' })
    @IsArray()
    cereal?: string[]; // min 1, max 10

    @ApiModelProperty({ description: 'birth', example: '1955' })
    @IsString()
    birthYear?: string;

    @IsOptional()
    shop?: CreateShopDto[];
}
