module.exports = {
  transform: {
    // Use official TypeScript Jest transformer
    "\\.(ts|tsx)?$": "ts-jest",
    // Use our custom transformer only for the *.js and *.jsx files
    "\\.(js|jsx)?$": "<rootDir>/tests/transform.js",
    // Custom transformer for statics, to output its path as a string
    "\\.(jpg|png|gif)?$": "<rootDir>/tests/transform-path.js"
  },
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es)/)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: [
    "**/*.(test|spec).(ts|tsx)"
  ],
  globals: {
    "ts-jest": {
      babelConfig: true,
      tsConfig: "jest.tsconfig.json"
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "enzyme.js"
  ],
  setupFilesAfterEnv: ["<rootDir>/enzyme.js"],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "text-summary"
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
};
