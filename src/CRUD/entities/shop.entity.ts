import { Exclude, Expose, Type } from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger';

@Exclude()
export class ShopEntity {
    @ApiModelProperty({ description: 'price a liter', example: '5' })
    @Expose()
    @Type(() => Number)
    priceALiter: number;

    @ApiModelProperty({ description: 'url of the shop website', example: 'http://www.myshop.com' })
    @Expose()
    @Type(() => URL)
    url: URL;

    /**
     * Class constructor
     *
     * @param partial data to insert in object instance
     */
    constructor(partial: Partial<ShopEntity>) {
        Object.assign(this, partial);
    }
}
