import { Component } from '@angular/core';

interface Sample {
  equal: string,
  result: number
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent {

  historyList: Sample[] = [{
      'equal': '1+2+3=',
      'result': 6
    },{
      'equal': '1+2+3=',
      'result': 6
    }
  ]

}
