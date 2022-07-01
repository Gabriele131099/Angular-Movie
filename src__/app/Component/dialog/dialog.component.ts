import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogExample implements OnInit {

  constructor(
  ) {}
  
  @Input() message:string =''
    close(){
      this.message=''
    }
  ngOnInit(): void {
   
  }
}
