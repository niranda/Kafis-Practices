import { HttpParams } from '@angular/common/http';
import { isNil } from 'lodash-es';

export function convertToHttpParams<T = object>(params: T): HttpParams {
  return Object.keys(params)
    .reduce((previousValue: HttpParams, key: string) => {
      const value = params[key];
      if (isNil(value)) {
        return previousValue;
      }
      if (value instanceof Array) {
        value.forEach(el => {
          previousValue = previousValue.append(key, el);
        });
      } else {
        previousValue = previousValue.append(key, value);
      }
      return previousValue;
    }, new HttpParams());
}
