'use strict'
const { model, Schema, Types } = require('mongoose');
const DOCUMENT_NAME = 'Role'
const COLLECTION_NAME = 'Roles'
var roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
module.exports =model(DOCUMENT_NAME,roleSchema)