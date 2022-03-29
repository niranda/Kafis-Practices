import { animate, style, transition, trigger } from '@angular/animations';

export const routingAnimation =
  trigger('routingAnimation', [
    transition('* <=> *', [
      style({ opacity: 0 }),
      animate('.5s', style({ opacity: 1 }))
    ]),
  ]);
