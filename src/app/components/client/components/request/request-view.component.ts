import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from './../../../../shared/shared-services/core';
import { HttpParams } from '@angular/common/http';
import { Page } from './../../../../shared/shared-components/paging-lib/page';
import { CustomPaginationService } from './../../../../shared/shared-components/paging-lib/services/custom-pagination.service';


export interface RequestsData {
  createAt: Date;
  userName: string;
  submittedNoteName:string;
  canUpdate :boolean;
  slug:string;
  model:any;
}



@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class RequestViewComponent implements OnInit {
  article='asd';

  displayedColumns: string[] = ['No', 'slug' , 'submittedNoteName','createAt', 'userName' , 'action'];

  page: Page<RequestsData> = new Page();

  constructor(private apiService:ApiService,private paginationService: CustomPaginationService) {
    
    
  }

  ngOnInit() {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
  }

  getData()
  {
    this.apiService.getPage('/analysis/request-view',this.page.pageable).subscribe(data=>{
      console.log(data);
      this.page = data;
    });
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }

}