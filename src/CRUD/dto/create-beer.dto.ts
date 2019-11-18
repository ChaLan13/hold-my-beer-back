import { CreateShopDto } from './create-shop.dto';
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateBeerDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiModelProperty({ description: 'name', example: 'Guinness' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({ description: 'country', example: 'France' })
    @IsString()
    country?: string;

    @ApiModelProperty({ description: 'cereal', example: 'oat, rye, ...' })
    @IsString()
    cereal?: string[]; // min 1, max 10

    @ApiModelProperty({ description: 'birth', example: '1955' })
    @IsString()
    birthYear?: string;

    @IsOptional()
    shop?: CreateShopDto[];
}
