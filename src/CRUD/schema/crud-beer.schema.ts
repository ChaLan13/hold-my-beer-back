import * as mongoose from 'mongoose';
import {ShopEntity} from '../entities/shop.entity';

export const BeerSchema = new mongoose.Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        minlength: 1,
        trim: true,
    },
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
        type: ShopEntity,
        required: true,
    },
}, {
    toJSON: { virtuals: true },
    versionKey: false,
});
