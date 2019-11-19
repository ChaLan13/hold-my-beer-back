import * as mongoose from 'mongoose';
import {ShopEntity} from '../entities/shop.entity';

export const BeerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    cereal: {
        type: Array,
        required: true,
        trim: true,
    },
    birthYear: {
        type: String,
        required: true,
        trim: true,
    },
    shop: {
        type: Object,
        required: false,
    },
}, {
    toJSON: { virtuals: true },
    versionKey: false,
    collection: 'beer',
});
