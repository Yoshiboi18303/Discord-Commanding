module.exports = class Logger {
  constructor(handler) {
    this.handler = handler;
  }

  log(message) {
    if (this.handler.verbose) return console.log(`${`${message}`.blue}`);
  }

  warn(warning) {
    if (this.handler.showWarns) return console.log(`${`${warning}`.yellow}`);
  }

  error(err) {
    throw new Error(`${`${err}`.red}`);
  }
}
