import { Schema, SchemaDefinition, model } from "mongoose";
// ************************************************
const oneSideSchema = new Schema<SchemaDefinition>(
    {
        _id: {
            type: "Number",
        },
        season: {
            type: "String",
            required: [true, "Hiányos adatok!"]
        },
        years: {
            type: "String",
            required: [true, "Hiányos adatok!"]
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// ************************************************
const manySideSchema = new Schema<SchemaDefinition>(
    {
        _id: {
            type: "Number",
        },
        url: {
            type: "String",
        },
        name: {
            type: "String",
        },
        seasonId: {
            type: "Number",
            ref: "oneSideID",
            index: true,
        },
        number: {
            type: "Number",
        },
        airstamp: {
            type: "Date",
        },
        runtime: {
            type: "Number",
        },
        image_medium: {
            type: "String",
            default: "https://bgs.jedlik.eu/no_image.png",
        },
        image_original: {
            type: "String",
            default: "https://bgs.jedlik.eu/no_image.png",
        },
        summary: {
            type: "String",
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

export const oneSideModel = model("oneSideID", oneSideSchema, "seasons");
export const manySideModel = model("manySideID", manySideSchema, "episodes");
