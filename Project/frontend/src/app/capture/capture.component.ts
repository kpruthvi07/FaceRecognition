import { Component, OnInit } from '@angular/core';
import { PageService } from '../service/page.service';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {

  constructor(private pageService : PageService) { }

  ngOnInit(): void {
  }

  captureImage(){
    this.pageService.capture().subscribe((response:any)=>{
      console.log(response['msg']);
    });
    
  }

}
