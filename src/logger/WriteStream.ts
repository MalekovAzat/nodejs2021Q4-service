import { Writable } from 'stream';
import fs from 'fs';

export default class CustomOutputStream extends Writable {
  fileName: string;

  // file descriptor
  fd!: number;

  /**
   * Constructor of CustonOutputStream
   * @param fileName - The name of the output file
   */
  constructor(fileName: string) {
    super();
    this.fileName = fileName;
  }

  /**
   * The method get the fd of the file
   * @param callback - The callback to call after construct
   */
  _construct(callback: (error?: Error | null) => void): void {
    if (this.fileName !== '') {
      fs.open(
        this.fileName,
        'w',
        (err: NodeJS.ErrnoException | null, fd: number) => {
          if (err) {
            callback(err);
          } else {
            this.fd = fd;
            callback();
          }
        },
      );
    } else {
      this.fd = 1;
      callback();
    }
  }

  /**
   * The method write data to the stream
   * @param callback - The callback to call after write
   */
  _write(
    chunk: string,
    encoding: BufferEncoding,
    callback: (error?: Error | null | undefined) => void,
  ) {
    // if (this.fd === undefined) {
    //   this.fd = fs.openSync(this.fileName, 'w');
    // }
    fs.write(this.fd, chunk, callback);
  }

  /**
   * The method destroy the stream
   * @param err - The error message
   * @param callback - The callback to call after destroy
   */
  _destroy(error: Error | null, callback: (err: Error | null) => void): void {
    if (this.fd) {
      fs.close(this.fd, callback);
    } else {
      callback(error);
    }
  }
}
