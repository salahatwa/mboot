
export interface Validator {
    name: string;
    pattern?:string;
    message: string;
  }

export interface FieldConfig {
    disabled?: boolean,
    placeholder?: string,
    label?: string;
    layout?:string;
    dragIcon?:string;
  name?: string;
  inputType?: string;
  options?:Array<OptionValue>;
  collections?: any;
  type: string;
  subtype?:string,
  value?: any;
  validations?: Validator[];
  subFields?:FieldConfig[];
  action?:ActionBuilder;
}

export interface ActionBuilder{
  appId?:number;
  noteId?:number;
  formId?:number;
  noteCreatorId?:string;
  actionType?:string;
  slug?:string;
}

export class OptionValue{
    label?:any="";
    value?:any="";
}

export interface FieldLayout{
   rows?:GridRow[];
}

export interface GridRow{
   cols?:GridColumn[];
}

export interface GridColumn{
  colClass?:string,
  placeId?:string,
}