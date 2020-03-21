import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { ApiService } from './../../../shared/shared-services/core';
import { Pageable } from './../../../shared/shared-components/paging-lib/pageable';
import { Page } from './../../../shared/shared-components/paging-lib/page';

@Injectable()
export class TagsService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(pageable: Pageable): Observable<Page<any>> {
    return this.apiService.getPage('/tags',pageable)
          .pipe(map(data => data));
  }

}
