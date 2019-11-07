/**
 * next.config.js allows custom configurations used
 * by server to build application. Doing this so we
 * can include some global style classes.
 */
const withSass = require("@zeit/next-sass");
module.exports = withSass();
