module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
