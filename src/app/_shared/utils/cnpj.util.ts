import { RegexUtil } from './regex.util';

export class CnpjUtil {
  private static get blackList(): string[] {
    return Array.from({ length: 10 }, (_, index) => String(index).repeat(14))
  }

  static format(number: string) {
    return RegexUtil.strip(number).replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }

  private static verifierDigit(digits: string) {
    let index = 2;
    const reverse = digits.split('').reduce((buffer, number) => {
      const numberParsed = Number(number);
      return [numberParsed, ...buffer];
    }, [] as number[]);

    const sum = reverse.reduce((buffer, number) => {
      buffer += number * index;
      index = index === 9 ? 2 : index + 1;
      return buffer;
    }, 0);

    const mod = sum % 11;
    return mod < 2 ? 0 : 11 - mod;
  }

  static validate(number: string, strict?: boolean): boolean {
    const stripped = RegexUtil.strip(number, strict);

    if (!stripped) {
      return false;
    }
    if (stripped.length !== 14) {
      return false;
    }
    if (CnpjUtil.blackList.includes(stripped)) {
      return false;
    }

    let numbers = stripped.substr(0, 12);
    numbers += CnpjUtil.verifierDigit(numbers);
    numbers += CnpjUtil.verifierDigit(numbers);

    return numbers.substr(-2) === stripped.substr(-2);
  }
}
