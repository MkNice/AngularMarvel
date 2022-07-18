import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input() collectionSize: Observable<number>;
  @Input() maxSizePages: number;
  @Input() itemsPerPage: number;

  @Output() nextPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  public onPageChanged(pageNumber: number) {
    this.nextPage.emit(pageNumber);
  }
}
