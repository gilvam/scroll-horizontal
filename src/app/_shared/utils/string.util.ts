export class StringUtil<T> {
	static onlyNumber(text: string | number | undefined): string {
		return String(text).match(/\d/gi)?.join('') || '';
	}

	static capitalizeFirstLetter(text: string): string {
		return text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase();
	}

	static toCamelCase(enumText: string | number): string {
		if (!enumText) {
			return '';
		}
		const textList = String(enumText)
			.toLowerCase()
			.split('_')
			.map((it, i) => (i ? StringUtil.capitalizeFirstLetter(it) : it));
		return textList.join('');
	}

	static toSnakeCase(text: string | number): string {
		if (!text) {
			return '';
		}
		return String(text).replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
	}
}
