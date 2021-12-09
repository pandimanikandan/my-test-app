import { Component, OnInit, Output,  EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  private _item; // private property _item

  // use getter setter to define the property
  get movieDetail(): any { 
    return this._item;
  }
  
  @Input()
  set movieDetail(val: any) {
    this._item = val;
  }
 
  constructor() { }

  ngOnInit(): void {
  }

  close () {
    this.onClose.emit();
  }

}
