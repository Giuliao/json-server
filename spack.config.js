const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    web: __dirname + "/src/server.ts",
  },
  output: {
    path: __dirname + "/dist",
  },
  module: {},
});
