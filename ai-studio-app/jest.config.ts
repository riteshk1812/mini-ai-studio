// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom', // required for React components
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
//   testPathIgnorePatterns: ['/node_modules/', '/dist/'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
//   moduleNameMapper: {
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // mock CSS imports
//   },
//   transform: {
//     '^.+\\.(ts|tsx)$': ['ts-jest', { isolatedModules: true }],
//   },
//   collectCoverage: true,
//   collectCoverageFrom: [
//     'src/**/*.{ts,tsx}',
//     '!src/index.tsx',
//     '!src/reportWebVitals.ts',
//     '!src/setupTests.ts',
//   ],
//   coverageReporters: ['text', 'lcov', 'json-summary'],
// };

// export default config;


import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // ✅ transform axios (ESM)
  ],
};

export default config;
