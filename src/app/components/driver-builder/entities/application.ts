export class Application{
    constructor(public name: string,public collectionId:string,public appType:AppType) {
    }

    public id: string;
    public isDefault: boolean = false;
    public isSelected: boolean;
    public selectedModel?:string=null;
    
}

export enum AppType {
    APP_TEMPLATE="0",
    APP_FORM="1",
    APP_ALL="3"
}