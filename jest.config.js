module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t)sx?$': '@swc/jest',
	},
	moduleNameMapper: {
		'~/(.*)': '<rootDir>/src/$1',
	},
};
