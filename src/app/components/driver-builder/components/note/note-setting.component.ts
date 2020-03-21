import { Component, OnInit ,ViewChild} from '@angular/core';
import { JoditAngularComponent } from '../../../../shared/shared-components/editor/jodit-angular.component';
import { JwtService } from './../../../../shared/shared-services/core';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-note-setting',
  template: `
  `,
  styles: []
})
export class NoteSettingComponent implements OnInit {

  @ViewChild(JoditAngularComponent) joditEditor: JoditAngularComponent;

  //----------------EDITOR CONFIG---------------------

 editorConfig={
    zIndex: 0,
    readonly: false,
    // beautyHTML:false,
    activeButtonsInReadOnly: [ 'fullsize', 'print', 'about', 'dots'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    // allowTags:'</#list>',
    saveModeInCookie: false,
    spellcheck: false,
    editorCssClass: false,
    triggerChangeEvent: true,
    width: 'auto',
     height: 100,
    minHeight: 510,
    direction: '',
    language: 'auto',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: "P",
   defaultMode: "1",
    useSplitMode: true,
    useAceEditor:true,
    sourceEditorNativeOptions:{
        "showGutter": true,
        "theme": "ace/theme/idle_fingers",
        "mode": "ace/mode/xml",
        "useWorker":false,
        "wrap": true,
        "highlightActiveLine": true
    },
    colors: {
        greyscale:  ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'],
        palette:    ['#980000', '#FF0000', '#FF9900', '#FFFF00', '#00F0F0', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'],
        full: [
            '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
            '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
            '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
            '#A61C00', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
            '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#733554',
            '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
        ]
    },
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 300,
    removeButtons: [],
    disablePlugins: [],
    extraButtons: [
        {
            name    : 'source',
            mode    : 1,
        }
    ],
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    buttons: [
        //  '|',
        'bold',
        'strikethrough',
        'underline',
        'italic', '|',
        'ul',
        'ol', '|',
        'outdent', 'indent',  '|',
        'font',
        'fontsize',
        'brush',
        'paragraph', '|',
        'image',
        // 'video',
        'table',
        'link', '|',
        'align', 'undo', 'redo', '|',
        'hr',
        'eraser',
        'copyformat', '|',
        'symbol',
        'fullsize',
        // 'source'
    ],
    buttonsMD:[ 'bold',
    'strikethrough',
    'underline',
    'italic', '|',
    'ul',
    'ol', '|',
    'outdent', 'indent',  '|',
    'font',
    'fontsize',
    'brush',
    'paragraph', '|',
    'image',
    // 'video',
    'table',
    'link', '|',
    'align', 'undo', 'redo', '|',
    'hr',
    'eraser',
    'copyformat', '|',
    'symbol',
    'fullsize',
    // 'source'
],
    buttonsSM:[ 'bold',
    'image', '|',
    'brush',
    'paragraph', '|',
    'align', '|',
    'undo', 'redo', '|',
    'eraser',
    'dots'],
    buttonsXS: [
        'bold',
        'image', '|',
        'brush',
        'paragraph', '|',
        'align', '|',
        'undo', 'redo', '|',
        'eraser',
        'dots'
    ],
    events: {},
    textIcons: false,
    uploader: {
        url:  `${environment.api_url}`+'/storage/upload/multiple',
        // url: 'https://mz-backend.herokuapp.com/builder/api/storage/local/uploadMultipleFiles',
        // url: 'https://xdsoft.net/jodit/connector/index.php?action=fileUpload',
        // format: 'json',
        filesVariableName: function(e){return "files"},

        insertImageAsBase64URI: false,
        imagesExtensions: [
            "jpg",
            "png",
            "jpeg",
            "gif"
          ],
        withCredentials: true,
        headers: {
           "Authorization": 'Bearer ' + this.jwtService.getToken()
        },

        prepareData: function (data) {
            data.append('id', 24);
            return data;
        },
        isSuccess: function (resp) {
            return resp;
        },
       

        // getMsg: function (resp) {
        //     return resp.msg.join !== undefined ? resp.msg.join(' ') : resp.msg;
        // },
      
        // error: function (e) {
        //     console.log(e);
        //     // this.events.fire('errorPopap', [e.getMessage(), 'error', 4000]);
        // },
       // defaultHandlerSuccess: function (data, resp) {
         //   console.log('2>>>'+JSON.stringify(data)+"@@@@:"+JSON.stringify(resp));
           // this.joditEditor.editor.setMode(2);
                   //  this.joditEditor.addElement(data.baseurl);
               
         //},
        // defaultHandlerError: function (resp) {
        //     this.events.fire('errorPopap', [this.editorConfig.uploader.getMsg(resp)]);
        // }
    },
   //  filebrowser: {
     //    ajax: {
       //      url: 'https://mz-backend.herokuapp.com/builder/api/storage/upload/multiple'
         //}
     //}
}

  constructor(protected jwtService: JwtService) { }

  ngOnInit() {
  }

}
