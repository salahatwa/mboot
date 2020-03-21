import { CollectionComponent } from './components/collection/collection.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteComponent } from './components/note/note.component';
import { CollectionsListComponent } from './components/collection/collections-list/collections-list.component';

const routes: Routes = [
    // {
    //     path: 'home',
    //     component: HomeComponent,
    //     resolve: {
    //         isAuthenticated: HomeAuthResolver
    //       }
    // },
    {
        path: 'collections',
        component: CollectionsListComponent,
        // children: [
        //     {
        //      path:  'detail:name',
        //      component:  CollectionComponent
        //     }
        // ]
    },

    {
        path:  'collections/:name',
        component:  CollectionComponent
       }
       ,
    {
        path: 'note',
        component: NoteComponent
    },
   
    {
        path: 'note-content',
        component: NoteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DriverRoutingModule { }
