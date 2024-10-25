import { Component } from '@angular/core';
import { BodyComponent } from '../../core/components/body/body.component';
import { CarouselComponent } from '../../_shared/components/carousel/carousel.component';
import { SliderComponent } from '../../_shared/components/slider/slider.component';
import { HomeCourse } from './models/home-course.model';
import { HomeCourseItem } from './models/home-course-item.model';
import { ImageGalleryComponent } from '../../_shared/components/image-gallery/image-gallery.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [BodyComponent, CarouselComponent, SliderComponent, ImageGalleryComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	homeCourseList: HomeCourse[];

	constructor() {
		const items1 = [
			new HomeCourseItem(
				'Curso de Direito Penal e Processo Penal - Crimes em Espécie e Legislação Especial',
				'https://picsum.photos/401/300',
				800.99,
				5
			),
			new HomeCourseItem('Processo Civil para Concursos Públicos', 'https://picsum.photos/402/300', 450.9, 5)
		];
		const homeCourse1 = new HomeCourse('Cursos preparatórios para concursos extrajudicial', items1);

		const items2 = [
			new HomeCourseItem('Curso de Usucapião Extrajudicial', 'https://picsum.photos/401/300', 500, 5),
			new HomeCourseItem('Curso de Estremação', 'https://picsum.photos/402/300', 400, 5),
			new HomeCourseItem('Curso Teórico e Prático de Inventário e Partilha Extrajudicial', 'https://picsum.photos/402/300', 500.99, 5),
			new HomeCourseItem('Direito do Consumidor', 'https://picsum.photos/402/300', 0, 0)
		];
		const homeCourse2 = new HomeCourse('cursos de qualificação extrajudicial', items2);

		const items3 = [
			new HomeCourseItem('Curso de Usucapião Extrajudicial', 'https://picsum.photos/401/300', 500, 5),
			new HomeCourseItem('Curso de Estremação', 'https://picsum.photos/402/300', 400, 5),
			new HomeCourseItem('Curso Teórico e Prático de Inventário e Partilha Extrajudicial', 'https://picsum.photos/402/300', 500.99, 5),
			new HomeCourseItem('Direito do Consumidor', 'https://picsum.photos/402/300', 0, 0)
		];
		const homeCourse3 = new HomeCourse('cursos de qualificação extrajudicial', items2);

		this.homeCourseList = [homeCourse1, homeCourse2];
	}

	getX(): number {
		return 10;
	}
}
