import type { Config } from 'jest';

const config: Config = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  // transform: {
  //   '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  // },
  transform: {},
  clearMocks: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts', // skip entry file
    '!src/config/**', // skip config files
  ],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  transformIgnorePatterns: [
    "/node_modules/(?!uuid)/", // 👈 allow uuid to be transformed
  ],
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true
    }
  }
};

export default config;
