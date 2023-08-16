module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '**/tests/**/*.test.ts', // Match all test files in the 'tests' directory and its subdirectories
    ],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts', // Include all '.ts' files for coverage
        '!src/**/*.test.ts', // Exclude test files
        '!src/**/index.ts', // Exclude index files as they're only meant to import / export other files,
        '!src/core/server.ts', // Exclude server.ts as it's only meant to start the server
    ],
};
