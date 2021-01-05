import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service: PaymentDetailService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm){
    if (this.service.formData.paymentDetailId === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  // tslint:disable-next-line: typedef
  insertRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Submitted succesfully', 'Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }
  // tslint:disable-next-line: typedef
  updateRecord(form: NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated succesfully', 'Payment Detail Register');
      },
      err => { console.log(err); }
    );
  }

  // tslint:disable-next-line: typedef
  resetForm(form: NgForm){
    form.reset();
    this.service.formData = new PaymentDetail();
  }
}
