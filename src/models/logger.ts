import * as winston from "winston";

const logger = new winston.Logger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      colorize: true
    }),
  ],
});

export { logger };
