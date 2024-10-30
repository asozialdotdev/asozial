import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

/** @type {import('jest').Config} */
const config = {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	preset: 'ts-jest/presets/default-esm',
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/auth$": "<rootDir>/src/auth.ts",
	},
	transformIgnorePatterns: [
		"/node_modules/(?!(plaiceholder)/)", // Ignore all except `plaiceholder`
	],
};

module.exports = createJestConfig(config);
