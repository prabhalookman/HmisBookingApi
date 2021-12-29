import 'dotenv/config';
import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda';
import  cors from "cors";
import path from 'path'
import schema from './schema/index';
import resolvers from './resolvers/index';
import models, { connectMongo } from './model/index';

const PORT = process.env.PORT;

console.log('models : ', JSON.stringify(models));
// (async()=>{
  let _context = ({ req, res, connection }) => ({
    req,
    res,
    models,
  })
  const server = new ApolloServerLambda({
    typeDefs: schema,
    resolvers,
    context: _context
  })

  // await server.start();
  // server.applyMiddleware({ app });

  // app.all('*', (req, res, next) => {
  //   next(new AppError(`Can't Find URL${req.originalUrl} on the server`, 404));
  // })
  
  connectMongo().then(() => {
    console.log("Connected To The MongoDB.")
    // app.listen({ port: PORT }, () => {
    //   console.log(`Apollo Server on http://localhost:${process.env.PORT}${server.graphqlPath}`);
    // })
  }).catch(err => {
    console.log("DB Connection Server Error : ", err)
  })
  export const graphqlHandler = server.createHandler({
    expressAppFromMiddleware(middleware) {
      const app = express();
      app.use(cors())
      app.use(middleware);
      app.use("/ApiSample", express.static(path.join(__dirname, './ApiSample')));
      console.log('I am from middleware')
      return app;
    }
  });
// })()


// import { graphqlLambda } from 'apollo-server-lambda';
// //import { lambdaPlayground } from 'graphql-playground-middleware';
// import { makeExecutableSchema } from 'graphql-tools';
// //import { schema } from './schema';
// //import { resolvers } from './resolvers';

// let context =  async ({ req, connection, res }) => {
//   if (connection) {
//     return {
//       models
//     }
//   }
//   if (req) {
//     return {
//       models,
//       me: req.me,
//       res,
//       req
//     }
//   }
//   // return models
// }

// const myGraphQLSchema = makeExecutableSchema({
//   typeDefs: schema,
//   resolvers,
//   logger: console,
//   context
  
// });


// export const graphqlHandler = function graphqlHandler(event, context, callback) {
//   function callbackFilter(error, output) {
//     // eslint-disable-next-line no-param-reassign
//     output.headers['Access-Control-Allow-Origin'] = '*';
//     callback(error, output);
//   }

//   const handler = graphqlLambda({ schema: myGraphQLSchema });
//   return handler(event, context, callbackFilter);
// };

// // for local endpointURL is /graphql and for prod it is /stage/graphql
// // exports.playgroundHandler = lambdaPlayground({
// //   endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT
// //     ? process.env.REACT_APP_GRAPHQL_ENDPOINT
// //     : '/production/graphql',
// // });



