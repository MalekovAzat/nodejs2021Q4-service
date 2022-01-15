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

  errorTransmitterStream: PassThrough | undefined;
  commonTransmitterStream: PassThrough | undefined;
  consoleTransmitterStream: PassThrough | undefined;

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
  logLevel: string,
): string {
  return `${new Date().toLocaleString()} ${logLevel} ${Object.entries(logInfo)
    .map(
      ([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`,
    )
    .join(' ')}\n`;
}

function addColor(line: string, color: 'red' | 'yellow' | 'green' | 'cyan') {
  let prefix = '';

  if (color === 'red') {
    prefix = '\x1b[31m';
  } else if (color === 'yellow') {
    prefix = '\x1b[33m';
  } else if (color === 'green') {
    prefix = '\x1b[32m';
  } else if (color === 'cyan') {
    prefix = '\x1b[36m';
  }
  return prefix + line;
}

/**
 * The function write line to stream
 * @param line -  Line to write to stream
 */
function transmitLine(stream: PassThrough | undefined, line: string): void {
  if (!stream) {
    return;
  }

  stream.write(line);
}

export default class Logger implements ILogger {
  logLevel: number;

  errorLoggerStream: WritableStream | undefined;

  commonLoggerStream: WritableStream | undefined;

  consoleLoggerStream: WritableStream | undefined;

  errorTransmitterStream: PassThrough | undefined;

  commonTransmitterStream: PassThrough | undefined;

  consoleTransmitterStream: PassThrough | undefined;

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
    logLevel = 4,
  ) {
    this.logLevel = logLevel;

    if (errorLogFile !== undefined && errorLogFile !== '') {
      this.errorTransmitterStream = new PassThrough();
      const errorLoggerStream = new WritableStream(errorLogFile);
      this.errorTransmitterStream.pipe(
        errorLoggerStream as unknown as NodeJS.WritableStream,
      );
    }

    if (commonLogFile !== undefined && commonLogFile !== '') {
      this.commonTransmitterStream = new PassThrough();
      const commonLoggerStream = new WritableStream(commonLogFile);
      this.commonTransmitterStream.pipe(
        commonLoggerStream as unknown as NodeJS.WritableStream,
      );
    }

    if (includeConsoleOutput) {
      this.consoleTransmitterStream = new PassThrough();
      const consoleLoggerStream = new WritableStream('');
      this.consoleTransmitterStream.pipe(
        consoleLoggerStream as unknown as NodeJS.WritableStream,
      );
    }
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
    transmitLine(this.commonTransmitterStream, logLine);
    transmitLine(this.errorTransmitterStream, logLine);

    const redColoredLine = addColor(logLine, 'red');
    transmitLine(this.consoleTransmitterStream, redColoredLine);
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

    transmitLine(this.commonTransmitterStream, logLine);

    const redColoredLine = addColor(logLine, 'yellow');
    transmitLine(this.consoleTransmitterStream, redColoredLine);
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

    transmitLine(this.commonTransmitterStream, logLine);

    const redColoredLine = addColor(logLine, 'cyan');
    transmitLine(this.consoleTransmitterStream, redColoredLine);
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

    transmitLine(this.commonTransmitterStream, logLine);

    const redColoredLine = addColor(logLine, 'green');
    transmitLine(this.consoleTransmitterStream, redColoredLine);
  }

  /**
   * The function flush internal logger buffers
   */
  flushBuffers() {
    if (this.commonTransmitterStream) {
      this.commonTransmitterStream.end();
    }
    if (this.errorTransmitterStream) {
      this.errorTransmitterStream.end();
    }
    if (this.consoleTransmitterStream) {
      this.consoleTransmitterStream.end();
    }
  }
}
