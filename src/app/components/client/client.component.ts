import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TagsService } from './services';
import { ArticleListConfig, Tag } from './entities';
import { UserService } from './../../shared/shared-services/core';
import { Title } from '@angular/platform-browser';
import { Page } from './../../shared/shared-components/paging-lib/page';
import { CustomPaginationService } from './../../shared/shared-components/paging-lib/services/custom-pagination.service';
import { TagsAutoCompleteService } from './services/tags.autocomplete.service';
import { NotifierService } from './../../shared/shared-components/notifier/notifier.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  constructor(
    private router: Router,
    private tagsService: TagsService,
    private userService: UserService,
    private titleService: Title,
    private paginationService: CustomPaginationService,
    public tagSearchService:TagsAutoCompleteService,
    private _notifier: NotifierService
  ) {
   // this.initializeWebSocketConnection();
   // console.log('socket initialized successfully');
  }
  private serverUrl = 'http://localhost:8080/builder/ws';
  private title = 'WebSockets chat';
  private stompClient;

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);

let header={
'token':'sample token',
'seesion':'wow'
}


let that = this;
 this.stompClient.connect({}, onConnected, onError);

function onConnected() {

    console.log("its working");

 that.stompClient.subscribe("/user/queue/notify", (message) => {
       console.log("SOKKKKKKKKKKKKKKKET LISTINGING");
       console.log(message);

        this._notifier.notify(
         'success received message',
          1,
       );

      });

}


 function onError(error) {

  console.log(error);
}

  //  this.stompClient.connect({}, function(frame) { 
  //  });
  }

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  page: Page<Tag> = new Page();
  tagSearch: any;
  
  tagsLoaded = false;

  @ViewChild("itemTemplate") linkTemplate: TemplateRef<any>;

  ngOnInit() {
    this.titleService.setTitle("Home");
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        // if (authenticated) {
        //   this.setListTo('feed');
        // } else {
          this.setListTo('all');
        // }
      }
    );

    this.getData();
   
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }

  getData()
  {
    this.tagsService.getAll(this.page.pageable)
    .subscribe(tags => {
      this.page = tags;
      this.tagsLoaded = true;
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
