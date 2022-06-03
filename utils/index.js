import buildDevLogger from './dev-logger';
import {slotCreationLog,  aggregationLog} from './prod-logger';

let logger = null;
console.log('process.env.NODE_ENV  : ',  process.env.NODE_ENV )
if (process.env.NODE_ENV === 'development') {
  logger = {slotCreationLog, aggregationLog }
  //logger = buildDevLogger();
} else {
  console.log('prod')
  logger = {slotCreationLog, aggregationLog } //buildProdLogger();
}

export default logger;


// import { createLogger, format, transports } from "winston";
 
// const logLevels = {
//   fatal: 0,
//   error: 1,
//   warn: 2,
//   info: 3,
//   debug: 4,
//   trace: 5,
// };
 
// const logger = createLogger({
//   level: "trace",
//   levels: logLevels,
//   format: format.combine(format.timestamp(), format.json(), format.align()),
//   transports: [new transports.Console({ level: "info" })],
//   //transports: [new transports.File({ filename: "./logs/file.log" })],
//   exceptionHandlers: [new transports.File({ filename: "./logs/exceptions.log" })],
//   rejectionHandlers: [new transports.File({ filename: "./logs/rejections.log" })],
// });

// export default logger;
