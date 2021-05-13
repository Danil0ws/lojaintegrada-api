module.exports = {
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/bin/**'
  ],
};