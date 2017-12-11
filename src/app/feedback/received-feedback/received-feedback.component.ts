import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../Feedback';

@Component({
    selector: 'app-received-feedback',
    templateUrl: './received-feedback.component.html',
    styleUrls: ['./received-feedback.component.css']
})
export class ReceivedFeedbackComponent implements OnInit {

    feedbackList: Feedback[];

    constructor(private http: HttpClient) { }

    ngOnInit() { 
        this.refresh();
    }

    refresh() {
        this.feedbackList = [];
        this.http
            .get('/api/feedback')
            //.get('assets/test.json')
            .subscribe(
            data => {
                console.log('data', data);
                this.feedbackList = data as Feedback[];
                console.log('Feedback[]', this.feedbackList);
            },
            err => {
                console.error('Getting data failed.', err);
            }
            );
    }

}
