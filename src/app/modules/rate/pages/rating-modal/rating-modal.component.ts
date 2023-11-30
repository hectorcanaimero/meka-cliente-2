/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as action from '@store/actions';
import { AppState } from '@store/app.state';
import { UtilsService } from '@core/services/utils.service';
import { MasterService } from '@core/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss'],
})
export class RatingModalComponent implements OnInit {

  @Input() service: any;
  activeButton = false;

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private ms: MasterService,
    private store: Store<AppState>,
    private uService: UtilsService,
    private translate: TranslateService
  ) { }


  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      score: ['', Validators.required],
      comment: ['']
    });
  }

  async onSubmit(): Promise<void> {
    const data = {
      score_company: this.form.value.score,
      comment_company: this.form.value.comment,
    };
    await this.uService.load({ message: this.translate.instant('PROCESSING'), duration: 1300 });
    console.log(data);
    // this.ms.patchMaster('comments/service', this.service._id, data)
    // .subscribe((res) => {
    //   this.store.dispatch(action.itemClosed({
    //     id: this.service._id,
    //     data: { status: 'closed' }
    //   }));
    //   timer(1500).subscribe(() => this.uService.modalDimiss());
    // });
  };

  getStar(ev: number): void {
    this.form.get('score')?.setValue(ev);
  }
}
