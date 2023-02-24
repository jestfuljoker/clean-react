module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(t)sx?$': '@swc/jest',
	},
};
