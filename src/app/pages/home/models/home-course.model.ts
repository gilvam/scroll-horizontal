import { HomeCourseItem } from './home-course-item.model';

export class HomeCourse {
	title: string;
	items: HomeCourseItem[];

	constructor(title: string, items: HomeCourseItem[]) {
		this.title = title;
		this.items = items;
	}
}
