import { StringUtil } from './string.util';

export class EnumUtil {
	private static getErrorKey(value: string[] | string | number): string | number {
		return (Array.isArray(value) ? value.at(0) : value) || '';
	}

	static get<T>(valueEnum: string[] | string | number, enumType: any): T {
		const value = this.getErrorKey(valueEnum);
		return enumType[value] || enumType[StringUtil.toSnakeCase(value)] || enumType[StringUtil.toSnakeCase(value)];
	}

	static existValue<T>(valueEnum: string | number, enumType: T): boolean {
		const value = this.getErrorKey(valueEnum);
		return Object.values(enumType as any).some((type: any) => EnumUtil.get(type, enumType) === EnumUtil.get(value, enumType));
	}

	static getValue<T>(enumType: T): T {
		return enumType;
	}

	static getKey<T>(valueEnum: string[] | string | number, enumType: any): T {
		if (!valueEnum || !enumType) {
			return '' as T;
		}
		const value = this.getErrorKey(valueEnum);
		return (Object.keys(enumType).find((key) => enumType[key] === value) || '') as T;
	}
}
