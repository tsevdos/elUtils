module.exports = {
  root: true,
  extends: ["custom"],
  rules: {
    "no-console": 2,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
