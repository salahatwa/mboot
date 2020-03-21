import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ProgressBarLoaderService } from './progress-bar-loader.service';

@Component({
  selector: 'app-progress-bar-loader',
  templateUrl: './progress-bar-loader.component.html',
  styleUrls: ['./progress-bar-loader.component.scss']
})
export class ProgressBarLoaderComponent implements OnInit, AfterViewChecked {

  loading: boolean;

        constructor(private loaderService: ProgressBarLoaderService,private changeDetector : ChangeDetectorRef ) {
          try{
          this.loaderService.isLoading.subscribe((v) => {
            // console.log(v);
            this.loading = v;
          });
        }catch(e){console.log(e+'--');}
        }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

}
