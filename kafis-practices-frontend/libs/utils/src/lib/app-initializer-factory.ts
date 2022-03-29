import { LOCATION_INITIALIZED } from "@angular/common";
import { Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export function appInitializerFactory(translate: TranslateService, injector: Injector): () => Promise<any> {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const langToSet = 'uk';
      translate.setDefaultLang('uk');
      translate.use(langToSet).subscribe(() => {
        console.info(`Successfully initialized '${langToSet}' language.'`);
      }, err => {
        console.error(`Problem with '${langToSet}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}
