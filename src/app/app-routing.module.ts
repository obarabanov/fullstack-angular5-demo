import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceivedFeedbackComponent } from './feedback/received-feedback/received-feedback.component';
import { ProvideFeedbackComponent } from './feedback/provide-feedback/provide-feedback.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'feedback/all', component: ReceivedFeedbackComponent },
    { path: 'feedback/give', component: ProvideFeedbackComponent }
  ];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
