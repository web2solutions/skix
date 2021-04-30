import * as voodux from "voodux";

export const schema = new voodux.Foundation.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    style: {
        type: Number,
        required: true,
        index: true,
        default: 0
    },
    time: {
        type: Number,
        required: true,
        index: true,
        default: 0
    },
    distance: {
        type: Number,
        required: true,
        index: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
        index: true
    }
});
