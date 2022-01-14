import { Component, OnInit , ViewChild, AfterViewInit,} from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { NgProgressComponent } from 'ngx-progressbar';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, AfterViewInit {  
  
  goals:Goal[];
  
  addNewGoal(goal: Goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }

  toggleDetails(index: number){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }  
  
  completeGoal(isComplete: any, index: number){
    if (isComplete) {
      this.goals.splice(index,1);
    }
  }
  
  deleteGoal(isComplete: any, index: number){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)      
      if (toDelete){
        this.goals.splice(index,1)
      }
    }
  }
  @ViewChild(NgProgressComponent) progressBar: NgProgressComponent;
  constructor(goalService:GoalService) { 
      this.goals = goalService.getGoals()
  }  

  ngAfterViewInit(){
    this.progressBar.start()
    setTimeout(() => { 
      if(this.goals){
        this.progressBar.complete()
      }
    });
    
    
  }
  ngOnInit() {

  }
}