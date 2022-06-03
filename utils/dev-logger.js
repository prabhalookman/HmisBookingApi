import { createLogger, format, Logform, transports } from "winston";
const { timestamp, combine, errors, json, colorize, printf, align } = format;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

//function buildProdLogger() {
    const logFormat = printf(({level, message, timestamp, stack})=>{
        return `${timestamp} - ${level} - ${stack || message} `
    })

    const slotCreationLog = createLogger({
        levels: logLevels,
        format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), errors({ stack: true }),  align(), logFormat),
        defaultMeta: { service: 'slotcreation-fn' },
        transports: [new transports.Console({ level: "trace" })]
     });
     const aggregationLog = createLogger({
        levels: logLevels,
        format: combine(timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), errors({ stack: true }),  align(), logFormat),
        defaultMeta: { service: 'aggregate-fn' },
        transports: [new transports.Console({ level: "trace" })]
     });

//   return createLogger({
//     format: combine(timestamp(), errors({ stack: true }), json()),
//     defaultMeta: { service: 'user-service' },
//     transports: [new transports.Console()],
//   });
//}

//export default buildProdLogger;

export {
    slotCreationLog,
    aggregationLog
}

// import { createLogger, format, transports } from "winston";
// const { timestamp, combine, printf, errors } = format;

// function buildDevLogger() {
//   const logFormat = printf(({ level, message, timestamp, stack }) => {
//     return `${timestamp} ${level}: ${stack || message}`;
//   });

//   return createLogger({
//     format: combine(
//       format.colorize(),
//       timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//       errors({ stack: true }),
//       logFormat
//     ),
//     transports: [new transports.Console()],
//   });
// }

// export default buildDevLogger 