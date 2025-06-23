import { createLogger, format, transports, addColors } from "winston";

const { combine, timestamp, printf, colorize } = format;

const levels = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    HTTP: 3
};

const colors = {
    ERROR: "red",
    WARN: "yellow",
    INFO: "blue",
    HTTP: "green"
};

addColors(colors);

const logFormat = combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
);

const logger = createLogger({
    levels,
    format: logFormat,
    transports: [
        new transports.Console({ level: "HTTP" }),
        new transports.File({
            filename: "./src/helpers/errors/errors.log",
            level: "WARN"
        }),
        new transports.File({
            filename: "./src/helpers/errors/http.log",
            level: "HTTP"
        })
    ]
});

export default logger;
