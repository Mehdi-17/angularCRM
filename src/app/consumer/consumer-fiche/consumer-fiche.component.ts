import { Consumer } from './../model/consumer';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ConsumerService } from './../consumer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crm-consumer-fiche',
  templateUrl: './consumer-fiche.component.html',
  styleUrls: ['./consumer-fiche.component.scss'],
})
export class ConsumerFicheComponent implements OnInit {
  addConsumerForm: FormGroup;
  subs: Subscription[] = [];

  constructor(private consumerService: ConsumerService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.addConsumerForm = new FormGroup({
      id: new FormControl(),
      civility: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      createdAt: new FormControl(),
      updatedAt: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.subs.push(
      this.activatedRoute.paramMap.subscribe(
        (param: ParamMap) => {
          const consumerId = param.get('id');
            if(consumerId){
              this.subs.push(
                this.consumerService.getConsumerById(consumerId).subscribe({
                  next:(consumer: Consumer)=>{this.addConsumerForm.patchValue(consumer)},
                  error: (error: Error)=> {},
                  complete: ()=>{}
                })
              );
            }
          }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  addConsumer(): void {
    this.consumerService.createOrUpdateConsumer(this.addConsumerForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/consumers');
      },
      error: () => {
        console.error(console.error());
      },
      complete: () => {},
    });
  }
}
