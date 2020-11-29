const GlobalConfig = require("../models/GlobalConfig");

module.exports = async () => {
  const configs = await GlobalConfig.findOne({ customId: "carsmission-global-configs" });
  return configs;
};
