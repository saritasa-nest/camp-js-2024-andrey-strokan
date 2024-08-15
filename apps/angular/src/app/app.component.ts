import { Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	standalone: true,
	imports: [AppRoutingModule],
})
export class AppComponent {}
