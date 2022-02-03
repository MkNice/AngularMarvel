import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input() collectionSize;
  @Input() numberPagesDisplay;
  @Input() itemsPerPage;
  @Output() currentPageNumber = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  onPageChanged(pageNumber) {
    this.currentPageNumber.emit(pageNumber);
  }
}
