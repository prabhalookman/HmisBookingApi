const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
import {returnOnError} from '../helpers/helper'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom date scalar',
    parseValue(value) {
      //returnOnError(() => value == null ? null : new Date(value), null)
      return value; // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);// ast value is always in string format
      }
      return null;
    }
  })
};