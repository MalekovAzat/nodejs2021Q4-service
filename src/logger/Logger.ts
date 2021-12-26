import { Readable, PassThrough } from 'stream';
import WritableStream from './WriteStream';

interface DynamicAccessProperty {
  [key: string]: null | undefined | unknown;
}

interface ILogger {
  logLevel: number;
  errorLoggerStream: WritableStream | undefined;
  commonLoggerStream: WritableStream | undefined;
  consoleLoggerStream: WritableStream | undefined;
  transmitterStream: PassThrough;
  transmitterErrorStream: PassThrough;
  error(logInfo: DynamicAccessProperty): void;

  warning(logInfo: DynamicAccessProperty): void;

  info(logInfo: DynamicAccessProperty): void;

  debug(llogInfo: DynamicAccessProperty): void;
}

/**
 * The function return logs string with provided info
 * @param logInfo - Error logger file name
 * @param logLevel - Common logger file name
 * @returns The logs string with provided info
 */
function createLogLine(
  logInfo: DynamicAccessProperty,
  logLevel: string
): string {
  return `${new Date().toLocaleString()} ${logLevel} ${Object.entries(logInfo)
    .map(
      ([key, value]) =>
        `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`
    )
    .join(' ')}\n`;
}

export default class Logger implements ILogger {
  logLevel: number;

  errorLoggerStream: WritableStream | undefined;

  commonLoggerStream: WritableStream | undefined;

  consoleLoggerStream: WritableStream | undefined;

  transmitterErrorStream: PassThrough;

  transmitterStream: PassThrough;

  /**
   * The constructor
   * @param errorLogFile -  Error logger file name
   * @param commonLogFile - Common logger file name
   * @param includeConsoleOutput - Turn on the console output
   * @param logLevel - The log level
   */
  constructor(
    errorLogFile = '',
    commonLogFile = '',
    includeConsoleOutput = false,
    logLevel = 4
  ) {
    this.logLevel = logLevel;

    this.transmitterStream = new PassThrough();
    this.transmitterErrorStream = new PassThrough();

    if (errorLogFile !== undefined && errorLogFile !== '') {
      const errorLoggerStream = new WritableStream(errorLogFile);
      this.transmitterErrorStream.pipe(
        errorLoggerStream as unknown as NodeJS.WritableStream
      );
    }

    if (commonLogFile !== undefined && commonLogFile !== '') {
      const commonLoggerStream = new WritableStream(commonLogFile);
      this.transmitterStream.pipe(
        commonLoggerStream as unknown as NodeJS.WritableStream
      );
    }

    if (includeConsoleOutput) {
      const consoleLoggerStream = new WritableStream('');
      this.transmitterStream.pipe(
        consoleLoggerStream as unknown as NodeJS.WritableStream
      );
    }
  }

  /**
   * The function write line to stream
   * @param line -  Line to write to stream
   */
  private transmitLine(line: string): void {
    this.transmitterStream.write(line);
  }

  /**
   * The function create error line
   * @param logInfo - Object to write to stream
   */
  error(logInfo: DynamicAccessProperty): void {
    if (this.logLevel < 0) {
      return;
    }

    const logLine = createLogLine(logInfo, 'error');

    this.transmitLine(logLine);
    // bad solution but no time
    this.transmitterErrorStream.write(logLine);
  }

  /**
   * The function create warning line
   * @param logInfo - Object to write to stream
   */
  warning(logInfo: DynamicAccessProperty): void {
    if (this.logLevel < 1) {
      return;
    }

    const logLine = createLogLine(logInfo, 'warning');

    this.transmitLine(logLine);
  }

  /**
   * The function create info line
   * @param logInfo - Object to write to stream
   */
  info(logInfo: DynamicAccessProperty): void {
    if (this.logLevel < 2) {
      return;
    }
    const logLine = createLogLine(logInfo, 'info');

    this.transmitLine(logLine);
  }

  /**
   * The function create debug line
   * @param logInfo - Object to write to stream
   */
  debug(logInfo: DynamicAccessProperty): void {
    if (this.logLevel < 3) {
      return;
    }
    const logLine = createLogLine(logInfo, 'debug');

    this.transmitLine(logLine);
  }
}
