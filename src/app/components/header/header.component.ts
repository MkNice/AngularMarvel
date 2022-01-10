import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public dataFromService: string;

  constructor(public testService: TestService) { }

  ngOnInit(): void {
    this.dataFromService = this.testService.getSaveData();
  }

}
