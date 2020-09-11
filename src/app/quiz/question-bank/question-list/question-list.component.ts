import { AuthService } from './../../../auth/auth.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Question } from '../question.model';
import { QuestionsService } from '../question.service';
import { Subscription}  from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  questionSub: Subscription;
  isLoading = false;
  userIsAuthenticated: Boolean = false;
  loggedInUserId: string;
  private authListenerSubs: Subscription;
  totalItems = 0;     //to hold total posts count overall
  itemsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  constructor(public questionsService: QuestionsService, private authService: AuthService) { }

  ngOnInit(): void {

    this.questionsService.getQuestions(this.itemsPerPage, this.currentPage);

    this.questionSub = this.questionsService.getQuestionUpdatedListener().subscribe((questionData: {questions: Question[], questionCount: number})=> {
      console.log(questionData);
      this.questions = questionData.questions;
      this.totalItems = questionData.questionCount;
      this.isLoading = false;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.loggedInUserId = this.authService.getUserId();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe((isAuthenticated)=>{
        this.userIsAuthenticated = isAuthenticated;
        this.loggedInUserId = this.authService.getUserId();
    }); 
  }

  onDelete(questionid: string){

  }

  onChangedPage(pageEventData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageEventData.pageIndex +1 ;
    this.itemsPerPage = pageEventData.pageSize;
    this.questionsService.getQuestions(this.itemsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.questionSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
}
}
