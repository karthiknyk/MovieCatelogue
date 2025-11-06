module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      'react-native|' +
      '@react-native|' +
      '@react-navigation|' +
      '@react-native-async-storage|' +
      'react-native-drawer-layout|' + // 👈 added
      'react-redux|' +                // 👈 added
      'react-native-reanimated|' + // 👈 added 
      'react-native-worklets|' + // 👈 added
      'react-native-gesture-handle'+
      'react-native-linear-gradient'+
      '@reduxjs/toolkit|' +
      'immer' +
      ')/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
};
