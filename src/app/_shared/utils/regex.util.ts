export class RegexUtil {
  private static strictStrip = /[-\\/.]/g;
  private static looseStrip = /[^\d]/g;

  static strip(number: string, strict?: boolean): string {
    const regex = strict ? RegexUtil.strictStrip : RegexUtil.looseStrip;
    return (number || '').replace(regex, '');
  }
}
