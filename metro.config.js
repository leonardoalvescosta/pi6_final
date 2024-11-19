const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = mergeConfig(defaultConfig, {
  resolver: {
    extraNodeModules: {
      "react-native": __dirname + "/node_modules/react-native",
      "@react-native/virtualized-lists": __dirname + "/node_modules/@react-native/virtualized-lists"
    }
  },
  watchFolders: [
    __dirname + "/node_modules"
  ]
});