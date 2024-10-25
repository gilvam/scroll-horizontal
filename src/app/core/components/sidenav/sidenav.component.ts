import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavService } from '../../services/sidenav.service';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-sidenav',
	standalone: true,
	imports: [MatSidenavContainer, MatSidenavContent, MatNavList, MatSidenav, MatListItem, RouterLink, RouterLinkActive, MatIcon, AsyncPipe],
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {
	@ViewChild(MatSidenav) sidenav?: MatSidenav;

	constructor(public sidenavService: SidenavService) {}

	ngAfterViewInit(): void {
		this.sidenavService.set(this.sidenav);
	}
}
