import { DemoObservableService } from './../common/demo-observable.service';
import { Component, OnInit } from '@angular/core';
import { map, Subscription, take } from 'rxjs';

@Component({
  selector: 'crm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private subs: Subscription[] = [];

  constructor(private observableService: DemoObservableService) { }

  ngOnInit(): void {
  }

  testObservable(): void{
    const subscription: Subscription = this.observableService.test().pipe(
      map(x=>x*10),
      take(2)
    ).subscribe({
      next: (data: number)=>{console.log(data)},
      error: (error: Error)=>{console.error(error)},
      complete: ()=>{console.log("Completed")},
    });

    this.subs.push(subscription);
  }

  ngOnDestroy(): void{
    this.subs.forEach(sub=> sub.unsubscribe());
  }


}
