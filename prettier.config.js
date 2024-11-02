const prettierConfig = {
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: false,
	endOfLine: "lf",
	printWidth: 100,
	quoteProps: "as-needed",
	semi: true,
	singleQuote: false,
	trailingComma: "all",
	useTabs: true,
	plugins: ["prettier-plugin-svelte"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				"parser": "svelte"
			}
		}
	]
}

export default prettierConfig;
