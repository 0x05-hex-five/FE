const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: ['bin', 'txt', 'db', 'mp3', 'ttf', 'otf', 'png', 'jpg', 'jpeg'], // svg 제거
    sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx', 'svg'], // svg 추가
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
