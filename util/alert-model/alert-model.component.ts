import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.scss']
})
export class AlertModelComponent implements OnInit {
  @Input() message: string;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}
}
