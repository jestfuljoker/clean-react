import { Config } from 'jest';

const config: Config = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!**/*.d.ts'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t)sx?$': '@swc/jest',
	},
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
		'\\.scss$': 'identity-obj-proxy',
	},
};

export default config;
