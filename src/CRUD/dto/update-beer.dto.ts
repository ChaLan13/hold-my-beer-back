import { CreateShopDto } from './create-shop.dto';
import {ApiModelProperty} from '@nestjs/swagger';
import {IsArray, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateBeerDto {

    @ApiModelProperty({ description: 'name', example: 'Guinness' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty({ description: 'country', example: 'France' })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiModelProperty({ description: 'cereal', example: '["oat", "rye", ...]' })
    @IsArray()
    @IsOptional()
    cereal?: string[]; // min 1, max 10

    @ApiModelProperty({ description: 'birth', example: '1955' })
    @IsString()
    @IsOptional()
    birthYear?: string;

    @IsOptional()
    shop?: CreateShopDto[];
}
