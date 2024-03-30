import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormBuilder } from '@angular/forms';
import { FormUtils } from '../../../../utils/form';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  loading!: boolean;
  futils!: FormUtils;
  state: any;
  days = [
    { label: 'Domingo', value: 0 },
    { label: 'Segunda', value: 1 },
    { label: 'Terça', value: 2 },
    { label: 'Quarta', value: 3 },
    { label: 'Quinta', value: 4 },
    { label: 'Sexta', value: 5 },
    { label: 'Sábado', value: 6 },
    
  ]

  constructor(private settings: SettingsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.loadState();
  }

  createForm() {
    this.futils = new FormUtils(this.fb.group({
      openTime: [''],
      closeTime: [''],
      isOpen: [true],
      days: ['']
    }));


  }

  async loadState() {
    this.state = await this.settings.state('Appointments')
    
    this.futils.form.patchValue(this.state);
    console.log(this.state, this.futils.form.value);
    
  }

  async save() {
    const form = this.futils.form.value;
    console.log(form);

    await this.settings.save('Appointments', form);
  }

}
