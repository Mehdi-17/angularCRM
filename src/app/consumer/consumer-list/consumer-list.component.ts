import { Router } from '@angular/router';
import { Consumer } from './../model/consumer';
import { ConsumerService } from './../consumer.service';
import { Observable, Cons } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-consumer-list',
  templateUrl: './consumer-list.component.html',
  styleUrls: ['./consumer-list.component.scss'],
})
export class ConsumerListComponent implements OnInit {
  consumersList?: Observable<Consumer[]>;
  searchedName?: string;

  constructor(
    private consumerService: ConsumerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consumersList = this.consumerService.getConsumersList();
  }

  ngOnDestroy(): void {}

  doSearch(): void {
    const consumersResponse: Consumer[] = [];
    this.consumersList = this.consumerService.getConsumersByName(
      this.searchedName!
    );
  }

  edit(consumer: Consumer): void {
    const id: number = consumer.id;
    this.router.navigateByUrl(`/consumer/${id}`);
  }

  delete(id: number): void{
    this.consumerService.delete(id).subscribe({
      next:()=>{
        if(this.searchedName){
          this.doSearch();
        }else{
          this.consumersList = this.consumerService.getConsumersList();
        }
      },
      error:(error: Error)=>{console.error(error)},
      complete: ()=>{}
    });
  }
}
