import { RegexUtil } from './regex.util';

describe('RegexUtil', () => {
	it('deve retornar apenas números', () => {
		const value = 'a/b.c1';

		const response = RegexUtil.strip(value);

		expect(response).toEqual('1');
	});
});
