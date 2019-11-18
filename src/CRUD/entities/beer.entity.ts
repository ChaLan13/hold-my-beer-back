import { Exclude, Expose, Type } from 'class-transformer';
import { ShopEntity } from './shop.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Exclude()
export class BeerEntity {
    @ApiModelProperty({ description: 'beer id', example: '303875489' })
    @Expose()
    @Type(() => String)
    id: string;

    @ApiModelProperty({ description: 'beer name', example: 'Guinness' })
    @Expose()
    @Type(() => String)
    name: string;

    @ApiModelProperty({ description: 'country', example: 'France' })
    @Expose()
    @Type(() => String)
    country: string;

    @ApiModelProperty({ description: 'cereals', example: 'oat, rye, ...' })
    @Expose()
    @Type(() => String)
    cereal: string[];

    @ApiModelProperty({ description: 'birth', example: '1954' })
    @Expose()
    @Type(() => String)
    birthYear: string;

    @Expose()
    @Type(() => ShopEntity)
    shop: ShopEntity;

    /**
     * Class constructor
     *
     * @param partial data to insert in object instance
     */
    constructor(partial: unknown) {
        Object.assign(this, partial);
    }
}
