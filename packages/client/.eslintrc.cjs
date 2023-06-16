module.exports = {
	root: true,
	extends: ["./node_modules/eslint-custom"],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-empty-function": "off",
	},
};
