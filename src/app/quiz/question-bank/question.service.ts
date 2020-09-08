import { Question} from "./question.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from  "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class QuestionsService{
    private questions: Question[];

    private questionsUpdated = new Subject<{questions: Question[], questionCount: number}>();

    constructor(private http: HttpClient, private router: Router){}

    getQuestions(itemsPerPage: number, currentPage: number) {
        const queryString = `?pageSize=${itemsPerPage}&page=${currentPage}`;
        //return [...this.posts];
        this.http.get<{ message: string, questions: any, qcount: number}>("http://localhost:3000/api/questions" + queryString)
        .pipe(map((questionData)=> {
            return {
                    questions: questionData.questions.map(question => {
                        return {id: question._id,
                            type: question.type,
                            category: question.category,
                            text: question.text,
                            maxScore: question.maxScore,
                            imagePath: question.imagePath,
                            creator: question.creator
                        };
                    }),
                    maxQuestions: questionData.qcount
                }
        }))
        .subscribe((mappedQuestionsData)=>{
            this.questions = mappedQuestionsData.questions;
            this.questionsUpdated.next({
                questions: [...this.questions], 
                questionCount: mappedQuestionsData.maxQuestions
            });
        });
    }

    getPostUpdatedListener() {
        return this.questionsUpdated.asObservable();
    }

    addQuestion(question: Question, imageFile: File) {
        const questiontData = new FormData();
        //postData.append('id', post.id);
        questiontData.append('type', question.type);
        questiontData.append('category', question.category);
        questiontData.append('text', question.text);
        questiontData.append('maxScore', question.maxScore.toString());
        questiontData.append('image', imageFile, imageFile.name);
        this.http.post<{message: string, post: Question}>("http://localhost:3000/api/questions", questiontData)
                .subscribe(responseData=> {
                    //post.id = responseData.post.id;
                    //post.imagePath = responseData.post.imagePath;
                    
                    //this.posts.push(post);
                    //this.postsUpdated.next([...this.posts]);
                    this.router.navigate(["/"]);
                });
    }
}


