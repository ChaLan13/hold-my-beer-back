import { IsNumber, IsNotEmpty, IsUrl } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateShopDto {

    @ApiModelProperty({ description: 'priceALiter', example: '5' })
    @IsNumber()
    @IsNotEmpty()
    priceALiter: number; // price in euro of the beer for a liter

    @ApiModelProperty({ description: 'webiste url', example: 'http://www.myshop.com' })
    @IsUrl()
    @IsNotEmpty()
    siteUrl: string; // contain the url of the website corresponding to the price
}
