import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudyFieldAPI } from '../data/models/StudyField';
import { StudyFieldService } from '../study-field/study-field.service';
import { SchedulesService } from './schedules.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent implements OnInit {
  buttons: StudyFieldAPI[] = [];
  selected: any;
  listItems$: Observable<any[]>; // Observable<ScheduleAPI[]>

  constructor(
    private schedulesService: SchedulesService,
    private studyFieldService: StudyFieldService,
  ) { }

  ngOnInit(): void {
    this.studyFieldService.getStudyFields().subscribe(
      q => this.buttons = q,
      () => { },
      () => this.selected = this.buttons[0].id);
    this.refreshList();
  }

  deleteSubject(id: number): void {
    this.schedulesService.deleteSchedule(id);
  }

  refreshList(): void {
    this.listItems$ = this.schedulesService.getSchedules();
  }

}
