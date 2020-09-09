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
        const questionData = new FormData();
        //postData.append('id', post.id);
        questionData.append('type', question.type);
        questionData.append('category', question.category);
        questionData.append('text', question.text);
        questionData.append('maxScore', question.maxScore.toString());
        
        if (!imageFile == undefined) {
            questionData.append('image', imageFile, imageFile.name);
        }
        console.log(questionData);
        this.http.post<{message: string, question: Question}>("http://localhost:3000/api/questions", questionData)
                .subscribe(responseData=> {
                    //post.id = responseData.post.id;
                    //post.imagePath = responseData.post.imagePath;
                    
                    //this.posts.push(post);
                    //this.postsUpdated.next([...this.posts]);
                    console.log(responseData);
                    //this.router.navigate(["/"]);
                }); 
    }
}


