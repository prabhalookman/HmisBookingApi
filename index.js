import 'dotenv/config';
import express from 'express';
import { ApolloServer, ApolloError } from 'apollo-server-express';
import path from 'path'
import schema from './schema/index';
import resolvers from './resolvers/index';
import models, { connectMongo } from './model/index';
import  cors from "cors";

const PORT = process.env.PORT;
const app = express();


(async()=>{
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
    },

    formatError: (err) => {

      console.log('Internal server Error : ', err.message)
      if(err.originalError instanceof ApolloError){
        return {message : `${err.message} Apollo Error`}
      }
      
      if(err.message.startsWith('Database Error : ')){
        return {message : `${err.message}`}
      }

      if(err.message.startsWith('Validation Error : ')){
        return {message : `${err.message}`}
      }

      if(err.extensions && err.name === 'ValidationError'){
        return {message : `${err.extensions.code} : ${err.message}`}
      }

      return {message : `${err.message}`}
    }
  })
  app.use(cors())
  app.use("/ApiSample", express.static(path.join(__dirname, './ApiSample')));

  await server.start();
  server.applyMiddleware({ app });

  // app.all('*', (req, res, next) => {
  //   next(new AppError(`Can't Find URL${req.originalUrl} on the server`, 404));
  // })
  
  connectMongo().then(() => {
    console.log("Connected To The MongoDB.")
    app.listen({ port: PORT }, () => {
      console.log(`Apollo Server on http://localhost:${process.env.PORT}${server.graphqlPath}`);
    })
  }).catch(err => {
    console.log("DB Connection Server Error : ", err)
  })
})()





