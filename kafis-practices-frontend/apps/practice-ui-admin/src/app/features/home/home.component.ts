import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { routingAnimation } from '@practice/ui/components/ui-elements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [routingAnimation]
})
export class HomeComponent {

  constructor() { }

  public getAnimationData(outlet: RouterOutlet): string | null {
    return outlet.activatedRouteData.state ? outlet.activatedRouteData.state : null;
  }

}
