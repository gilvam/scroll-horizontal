export class HomeCourseItem {
	text: string;
	image: string;
	cash: number;
	installment: number;

	constructor(text: string, image: string, cash = 0, installment = 0) {
		this.text = text;
		this.image = image;
		this.cash = cash;
		this.installment = installment;
	}
}
