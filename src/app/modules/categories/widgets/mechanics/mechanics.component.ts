import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { filter, map, Observable, timer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Geolocation } from '@capacitor/geolocation';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '@core/services/utils.service';
import { CameraService } from '@core/services/camera.service';
import { DbCategoriesService } from '@modules/categories/services/db-categories.service';

import { Store } from '@ngrx/store';
import * as actions from '@store/actions';
import { AppState } from '@store/app.state';
import { StorageService } from '@core/services/storage.service';
import { slidesOptions } from './mechanics.data';
import { FireStorageService } from '@modules/chat/services/fire-storage.service';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.scss'],
})
export class MechanicsComponent implements OnInit, AfterViewInit {

  @Input() category: any;
  @Input() autopart = false;
  name!: string;
  coordinates: any;
  capture: any = [];
  formReactive!: FormGroup;
  slideOpts = slidesOptions;

  brands$!: Observable<any[]>;
  models$!: Observable<any[]>;
  vehicles$!: Observable<any[]>;
  conditions$!: Observable<any[]>;
  active = false;

  constructor(
    private fb: FormBuilder,
    private uService: UtilsService,
    private store: Store<AppState>,
    private storage: StorageService,
    private db: DbCategoriesService,
    private cameraService: CameraService,
    private storageService: FireStorageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.loadReactiveForm();
    this.getData();
    this.setAutopart();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.setDataForm();
  }

  getData() {
    this.vehicles$ = this.db.getVehicles();
    this.conditions$ = this.db.getTypeCondition();
    this.getService();
  }

  async onSubmit(): Promise<void> {
    await this.setReactive();
    const item: any = this.formReactive.value;
    item.pictures = this.capture;
    await this.uService.load({ message: this.translate.instant('PROCCESSING'), duration: 750 });
    this.store.dispatch(actions.itemAdd({ item }));
    this.formReactive.reset();
    this.uService.navigate('service-open');
  };

  getBrand(ev: any): void {
    this.brands$ = this.db.getBrandByType(ev.detail.value);
  };

  getModels(ev: any): void {
    this.models$ = this.db.getModel(ev.detail.value);
  };

  loadReactiveForm = () => {
    this.formReactive = this.fb.group({
      type: [0],
      year: [''],
      pictures: [''],
      latitude: [''],
      longitude: [''],
      user: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      vehicle: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(4)]],
    });
  };

  setReactive = async () => {
    this.formReactive.get('pictures')?.setValue(this.capture);
    const position = await Geolocation.getCurrentPosition();
    if(position) {
      this.formReactive.get('latitude')?.setValue(position.coords.latitude);
      this.formReactive.get('longitude')?.setValue(position.coords.longitude);
    }

  };

  capturePhoto = async () => {
    const photo = await this.cameraService.takePhoto2();
    if (photo) {
      const picture = await this.storageService.uploadService(uuidv4(), photo);
      this.capture.push(picture);
    }
  };

  removeCapture = (id: string) => {
    this.capture = this.capture.filter((row: any) => row !== id);
  };

  private setAutopart(): void {
    if (this.autopart) {
      this.formReactive.addControl('condition', new FormControl('', Validators.required));
      this.formReactive.get('type')?.setValue(1);
    }
  }

  private getService() {
    this.store.select('item')
    .pipe(filter(row => !row.loading), map((res: any) => res.item))
    .subscribe((res: any) => {
      if (res) {
        this.active = true;
      }
    });
  }

  // SETFORM USER
  private async setDataForm() {
    this.formReactive.get('category')?.setValue(this.category);
    const user: any = await this.storage.getStorage('oUser');
    this.formReactive.get('user')?.setValue(user._id);
  }
}
