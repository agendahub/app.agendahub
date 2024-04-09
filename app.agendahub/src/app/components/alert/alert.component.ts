import { Component, Input, OnInit } from '@angular/core';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  
  @Input() type: AlertType = 'info';
  @Input() message: string = '';
  @Input() title: string = '';
  color!: string;

  ngOnInit(): void {
    this.color = this.getColor();
  }

  getColor() {
    switch (this.type) {
      case 'success':
        return 'green';
      case 'info':
        return 'blue';
      case 'warning':
        return 'yellow';
      case 'danger':
        return 'red';
      default:
        return 'info';
    }
  }


}
