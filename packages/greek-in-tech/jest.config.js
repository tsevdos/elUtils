export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
};
