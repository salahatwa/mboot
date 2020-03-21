import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,throwError  } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { ApiService } from './../../../shared/shared-services/core';

const cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

export class CTemplate{

  templateName:string;
  templateContent:string;
  templateModel:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class TemplateControllerService {
  // base_url: string = "http://localhost:8080/builder/";
  validate_template_endpoint="validate/template";

  constructor(private http: HttpClient,private apiService:ApiService) { }


  public validateTemplate(cTemplate:CTemplate){

    this.apiService.openFile('/template/render/pdf',cTemplate).subscribe(response => { 
      this.downLoadFile(response, "application/pdf",cTemplate.templateName+".pdf");
     });
    // return this.http.post<CTemplate>(this.base_url + this.validate_template_endpoint, cTemplate,cudOptions).pipe(
    //    catchError(this.handleError)
    //  );  
   }

   downLoadFile(data: any, type: string,fileName:string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    window.open(url, fileName);
    // const element = document.createElement('a');
    //   element.href = url;
    //   element.download =fileName
    //   document.body.appendChild(element);
    //   element.click();
      
}


   private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    // and reformat for user consumption
    console.error('ERROR::'+ JSON.stringify(error)); // log to console instead
    return throwError(error);
  }

}
