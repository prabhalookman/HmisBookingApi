import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path'
import schema from './schema/index';
import resolvers from './resolvers/index';
import models, { connectMongo } from './model/index';

const PORT = process.env.PORT;
const app = express();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req, connection, res }) => {
    if (connection) {
      return {
        models
      }
    }
    if (req) {
      return {
        models,
        me: req.me,
        secret: process.env.SECRET,
        res,
        req
      }
    }
    //return models
  }
})

server.applyMiddleware({ app });

app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find URL${req.originalUrl} on the server`, 404));
})

connectMongo().then(() => {
  console.log("Connected To The MongoDB.")
  app.listen({ port: PORT }, () => {
    console.log(`Apollo Server on http://localhost:${process.env.PORT}${server.graphqlPath}`);
  })
}).catch(err => {
  console.log("DB Connection Server Error : ", err)
})
