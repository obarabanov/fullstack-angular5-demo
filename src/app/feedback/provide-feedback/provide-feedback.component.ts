import { Component, OnInit } from '@angular/core';
import { Feedback } from '../Feedback';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-provide-feedback',
    templateUrl: './provide-feedback.component.html',
    styleUrls: ['./provide-feedback.component.css']
})
export class ProvideFeedbackComponent implements OnInit {

    model: Feedback = new Feedback();
    submitted = false;
    saved = false;

    constructor(private http: HttpClient) { }

    ngOnInit() { }

    onSubmit() {
        this.submitted = true;
        console.log('model:', this.model);
        
        this.http
            .post('/api/feedback', this.model)
            .subscribe(
                data => {
                    this.saved = true;
                },
                err => {
                    console.error('Saving data failed.', err);
                    this.submitted = false;
                }
            );
    }

    newFeedback() {
        this.model = new Feedback();
        this.submitted = false;
        this.saved = false;
    }

}
