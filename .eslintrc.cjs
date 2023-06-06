module.exports = {
    extends: [
        "plugin:astro/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    overrides: [
        {
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
        },
        {
            files: ["*.js"],
            env: {
                es6: true,
            }
        },
        {
            files: ["*.ts"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            }
        }
    ],
}