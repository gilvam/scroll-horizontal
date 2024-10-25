import { CnpjUtil } from './cnpj.util';

describe('RegexUtil', () => {
	it('deve retornar o valor formatado', () => {
		const value = '00000000000000';

		const response = CnpjUtil.format(value);

		expect(response).toEqual('00.000.000/0000-00');
	});

	it('deve retornar CNPJ inválidos com valores únicos', () => {
		const values = [
			'00000000000000',
			'11111111111111',
			'22222222222222',
			'33333333333333',
			'44444444444444',
			'55555555555555',
			'66666666666666',
			'77777777777777',
			'88888888888888',
			'99999999999999'
		];

		const response = (CnpjUtil as any).blackList;

		expect(response).toEqual(values);
	});

	it('deve retornar CNPJ inválidos', () => {
		const value = '10';

		const response = CnpjUtil.validate(value);

		expect(response).toBeFalsy();
	});

	it('deve retornar números verificadores', () => {
		const value = '22';

		const response = (CnpjUtil as any).verifierDigit(value);

		expect(response).toEqual(1);
	});

	it('deve retornar CNPJ válido', () => {
		const value = '75.595.344/0001-90';

		const response = CnpjUtil.validate(value);

		expect(response).toBeTruthy();
	});

	it('deve retornar CNPJ vazio como inválido', () => {
		const value = '';

		const response = CnpjUtil.validate(value);

		expect(response).toBeFalsy();
	});

	it('deve retornar CNPJ da blacklist como inválido', () => {
		const value = '00000000000000';

		const response = CnpjUtil.validate(value);

		expect(response).toBeFalsy();
	});
});
