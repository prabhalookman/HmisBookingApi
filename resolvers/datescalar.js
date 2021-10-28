const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
import {returnOnError} from '../helpers/helper'
import moment from 'moment-timezone';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom date scalar',
    parseValue(value) {
      //returnOnError(() => value == null ? null : new Date(value), null)
      return value; // value from the client
    },
    serialize(value) {
      //let respo = moment.tz(value,"YYYYMMDDHHmm","Asia/Kolkata").toISOString();
      let respo = moment.utc(value).format();
      return new Date(respo); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);// ast value is always in string format
      }
      return null;
    }
  })
};