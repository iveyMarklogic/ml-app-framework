export default
{
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        '<rootDir>/src/setupTests.ts'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/examples/',
        '/server/',
        '/setup/'
    ],
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif)$': '<rootDir>/src/__mocks__/fileMock.js'
    },
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
    }
}
