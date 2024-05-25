'use strict'
const { request } = require('express');
const _ = require('lodash');
const { Types } = require('mongoose')



const convertToObjectIdMongodb = id =>  new Types.ObjectId(id);

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}
const getUnSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]))
}
const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null || obj[k] === undefined) {
            delete obj[k]
        }
    })
    return obj
}
/**
 * 
 * const a = {
    * c:{
        * d:1
        * e:1
    * }
 * } 
 * 
 * db.collection.updateOne({
 *  `c.d`:1
 * })
 */
const updateNestedObjectParser = obj => {
    const final = {};
    Object.keys(obj).forEach(k => {
        console.log(typeof (obj[k]));
        if (typeof obj[k] === 'object' && !Array.isArray()) {
            const response = updateNestedObjectParser(obj[k])
            Object.keys(response).forEach(a => {
                final[`${k}.${a}`] = response[a]
            })
        } else {
            final[k] = obj[k]
        }
    })
    return final;
}
module.exports = {
    getInfoData,
    getSelectData,
    getUnSelectData,
    removeUndefinedObject,
    updateNestedObjectParser,
    convertToObjectIdMongodb
}