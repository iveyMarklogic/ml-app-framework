export default
    {
        testEnvironment: 'jsdom',
        setupFilesAfterEnv: [
            "<rootDir>/src/setupTests.ts"
        ],
        testPathIgnorePatterns: [
            "/node_modules/",
            "/examples/"
        ],
        moduleNameMapper: {
            '\\.(scss|sass|css)$': 'identity-obj-proxy',
            '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js'
        },
        transform: {
            '^.+\\.[jt]sx?$': 'babel-jest',
            '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
        },
    };
