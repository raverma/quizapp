
import { QuestionsService } from './../question.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Question } from '../question.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css']
})
export class QuestionCreateComponent implements OnInit {
  private isLoading = false;
  private mode = 'create';    //initialize with create mode as this same component is used for edit mode also
  private questionId: string;
  private question: Question;
  private selectedFile: File = null;
  imagePreview: string;
  form: FormGroup;
  constructor(public questionService: QuestionsService, public route: ActivatedRoute ){}

  ngOnInit(): void {
      this.form = new FormGroup({
        type: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)]}),
        category: new FormControl(null, {validators: [Validators.required]}),
        text: new FormControl(null, {validators: [Validators.required]}),
        maxScore: new FormControl(null,{validators: [Validators.min(1)]}),
        image: new FormControl(null,null),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('questionId')){
          this.mode = 'edit';
          this.questionId = paramMap.get('questionId');
          this.isLoading=true;
         
          
      }
      else{
          this.mode = 'create';
          this.questionId = null;
      }
  });
  }

  onSaveQuestion() {
    if (this.form.invalid){
        return;
    }

    const question: Question = {id: this.questionId, type: this.form.value.type, category: this.form.value.category, text: this.form.value.text, maxScore: this.form.value.score ,creator: null};
    //this.postCreated.emit(post);
    this.isLoading = true;
    if (this.mode === "edit" ){
        this.questionService.addQuestion(question, this.selectedFile);
    }
    else{
        this.questionService.addQuestion(question, this.selectedFile);
        this.form.reset();
    }
    this.isLoading = false;
}

onFilePicked(event: Event) {
  this.selectedFile = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image: this.selectedFile});
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
      this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(this.selectedFile);

}

}
