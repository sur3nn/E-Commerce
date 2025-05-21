"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const logFormat = format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}] : ${stack || message}`;
});
const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.errors({ stack: true }), format.splat(), logFormat),
    transports: [
        new transports.Console({ level: 'debug' }),
        new DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '14d',
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=winston.js.map