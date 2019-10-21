/* eslint-disable no-console */
class Logger {
  static log(message, details) {
    console.log(message, details);
  }

  static error(message, details) {
    if (console.error) {
      console.error(message, details);
    } else {
      console.log(message, details);
    }
  }
}
/* eslint-enable */

export default Logger;
