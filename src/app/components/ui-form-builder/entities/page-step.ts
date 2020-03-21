export interface PageStep {
  pageConfig?:PageSetting;
  content:PageContent[];
}

export interface PageSetting{
  type?: string;
  formId?:number;
}

export interface PageContent{
  title: string;
  subtitle: string;
  theme:any;
  isCompleted:boolean;
  attributes: any;
}
