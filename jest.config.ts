/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: '<rootDir>/coverage/',
	coverageProvider: 'v8',
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
	transform: {
		'\\.html$': ['ts-jest', { tsConfig: '<rootDir>/tsconfig.spec.json' }]
	}
};

export default config;
