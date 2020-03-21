import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { ApiService } from '../../../shared/shared-services/core';
import { AutocompleteService } from './../../../shared/shared-components/auto-complete/autocomplete.service';
import { HttpParams } from '@angular/common/http';
import { Page } from './../../../shared/shared-components/paging-lib/page';
import { Tag } from '../entities';


@Injectable()
export class TagsAutoCompleteService implements AutocompleteService{
  constructor (
    private apiService: ApiService
  ) {}


 async fetch(params?: HttpParams): Promise<any> {

  params=params.append('tag',params.get('query'));
 
   let results:Page<Tag>=await  this.apiService.get('/tags',params).toPromise();

     return results.content;
   }

}
