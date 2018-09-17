import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { VentureService } from '../venture.service';
import { Control } from '../control.model';
import { Plan } from "../../project/plan.model";
import { Talent } from "../../skill/talent.model";
import { UIService } from '../../shared/ui.service';
import * as fromVenture from '../venture.reducer';
import * as fromRoot from '../../app.reducer';

// TODO - ? Refactor new-venture to launch or start TeamWork Combinations

@Component({
  selector: 'app-new-venture',
  templateUrl: './new-venture.component.html',
  styleUrls: ['./new-venture.component.css']
})
export class NewVentureComponent implements OnInit {
  controls$: Observable<Control[]>;
  projects$: Observable<Plan[]>;
  services$: Observable<Talent[]>;
  isLoading$: Observable<boolean>;

  cI: '';           // contextIni - startScript
  tL: '';           // testList   - checkScript
  iQ: '';           // inputquery
  tF: '';           // transformFunction
  uC: '';           // updateQuery
  searchResult: '';

  constructor(
    private ventureService: VentureService, 
    private uiService:  UIService, 
    private store: Store<fromVenture.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.controls$ = this.store.select(fromVenture.getAvailableControls);
    this.fetchControls();  
    
    this.projects$ = this.store.select(fromVenture.getAvailableProjects);
    this.fetchProjects();
    
    this.services$ = this.store.select(fromVenture.getAvailableServices);
    this.fetchServices();

    console.log(this.store);

    // console.log(this.controls$);
    // console.log(this.projects$);
    // console.log(this.services$);

  }

  // TODO ? - Change Control / Controls to Tags - ? what about Calories, Duration for tags? generic cost? timeframe?
  fetchControls() {
    this.ventureService.fetchAvailableControls(); 
  }

  fetchProjects() {
    this.ventureService.fetchAvailableProjects(); 
  }

  fetchServices() {
    this.ventureService.fetchAvailableServices(); 
  }

  onStartVenture(form: NgForm) {
    this.ventureService.startControl( form.value.control );
  }

  // Here below are the elements of the DNA, RNA process/algo

  // 3Jars Transform: 'Math.min( this.property1, this. property2)';   // It works written like this
  // property1: number = 10;
  // property2: number = 99;

  // ToDo: Test Sanitizer / Angular Elements, etc 
  onSearchStep() {
    this.searchResult = eval( this.tF  );
    this.ventureService.startAdventure();
  }

}
