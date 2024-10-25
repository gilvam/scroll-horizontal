import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { ImageLoadingDirective } from '../../directives/image-loading.directive';

@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [MatIcon, MatFabButton, ImageLoadingDirective],
	templateUrl: './carousel.component.html',
	styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
	private destroy$ = new Subject<void>();
	items = [
		{
			image: 'https://picsum.photos/1001/200',
			title: 'A Evolução da Inteligência Artificial e seu Impacto na Sociedade',
			description: 'Explora como a IA está mudando áreas como medicina, finanças, educação e o mercado de trabalho, além dos desafios éticos e de segurança.'
		},
		{
			image: 'https://picsum.photos/1002/200',
			title: 'Sustentabilidade e o Futuro das Energias Renováveis',
			description: 'Analisa o crescimento das energias eólica, solar e hidrelétrica, abordando seus benefícios, limitações e o impacto no meio ambiente e na economia.'
		},
		{
			image: 'https://picsum.photos/1003/200',
			title: 'Educação do Futuro: Como a Tecnologia Está Transformando as Salas de Aula',
			description: 'Descreve como plataformas digitais, realidade aumentada e IA estão sendo integradas ao ensino, promovendo uma educação mais personalizada e acessível.'
		},
		{
			image: 'https://picsum.photos/1004/200',
			title: 'A Ciência por Trás do Sono e sua Importância para a Saúde Mental',
			description: 'Investiga como o sono influencia a saúde mental e física, os efeitos da privação de sono e dicas para melhorar a qualidade do descanso.'
		},
		{
			image: 'https://picsum.photos/1005/200',
			title: 'O Poder das Redes Sociais e a Era da Informação Rápida',
			description: 'Explora o impacto das redes sociais na comunicação, na formação de opinião pública e nos desafios relacionados à privacidade e às fake news.'
		},
		{
			image: 'https://picsum.photos/1006/200',
			title: 'Cidades Inteligentes: Inovação Urbana e o Futuro das Metrópoles',
			description: 'Fala sobre como tecnologias de ponta, como IoT e big data, estão sendo usadas para criar cidades mais eficientes, sustentáveis e seguras.'
		},
		{
			image: 'https://picsum.photos/1007/200',
			title: 'Mindfulness e Saúde Mental: Como a Prática da Atenção Plena Pode Ajudar',
			description: 'Explica o conceito de mindfulness, os benefícios para o bem-estar mental e físico e como incorporar a prática no dia a dia.'
		},
		{
			image: 'https://picsum.photos/1008/200',
			title: 'Exploração Espacial: Marte e a Busca pela Colonização do Planeta Vermelho',
			description: 'Analisa os avanços e desafios das missões para Marte, incluindo a pesquisa da NASA e de empresas privadas para possibilitar uma eventual colonização.'
		},
		{
			image: 'https://picsum.photos/1009/200',
			title: 'A História e Evolução da Moda: Tendências que Transformaram Gerações',
			description: 'Conta como a moda se desenvolveu ao longo dos anos, influenciando culturas e refletindo mudanças sociais, e fala sobre tendências que marcaram épocas.'
		},
		{
			image: 'https://picsum.photos/1010/200',
			title: 'Os Desafios do Crescimento da População e seus Impactos no Meio Ambiente',
			description: 'Discorre sobre o crescimento populacional, os desafios de recursos e sustentabilidade e as soluções que estão sendo desenvolvidas para atender à demanda futura.'
		}
	];

	currentIndex = 0;

	prevSlide() {
		this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
	}

	nextSlide() {
		this.currentIndex = this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0;
	}
}
