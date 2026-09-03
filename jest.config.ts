module.exports = {
  preset: 'ts-jest/presets/default',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: ['node_modules/(?!@angular)'],
};