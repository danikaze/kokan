/*
 * Server side implementation of the Logger interface
 */
import { createLogger, transports, format, Logger as Winston } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { grey } from 'colors/safe';
import { NsLogger, LoggerOptions, defaultOptions } from '.';

const customFormat = format.printf(
  ({ level, message, timestamp, namespace }) => {
    return `${timestamp ? `${timestamp} ` : ''}[${level} | ${grey(
      namespace
    )}] ${message}`;
  }
);

let instance: Winston;
const nsLoggers: { [namespace: string]: NsLogger } = {};

export function init(options?: LoggerOptions): void {
  if (instance) {
    return;
  }

  const opt = {
    ...defaultOptions,
    ...options,
  };

  const winstonTransports = [];

  if (opt.console) {
    winstonTransports.push(new transports.Console());
  }

  if (opt.outputFile) {
    winstonTransports.push(
      new DailyRotateFile({
        dirname: opt.outputFolder,
        filename: opt.outputFile,
        maxFiles: opt.maxFiles,
        // wait for https://github.com/winstonjs/winston-daily-rotate-file/pull/230
        // auditFile: `.audit-${new Date().toISOString()}`,
      })
    );
  }

  instance = createLogger({
    silent: opt.silent,
    level: opt.level,
    transports: winstonTransports,
    format: format.combine(format.colorize(), format.timestamp(), customFormat),
  });
}

export function getLogger(namespace: string): NsLogger {
  // Since this function can be called several times for a logger,
  // the result is cached to avoid creating the same functions several times
  if (nsLoggers[namespace]) {
    return nsLoggers[namespace];
  }

  const logMessage = (level: string, message: string): void => {
    instance.log({ message, level, namespace });
  };

  nsLoggers[namespace] = {
    error: logMessage.bind(this, 'error'),
    warn: logMessage.bind(this, 'warn'),
    info: logMessage.bind(this, 'info'),
    verbose: logMessage.bind(this, 'verbose'),
    debug: logMessage.bind(this, 'debug'),
  };

  return nsLoggers[namespace];
}
