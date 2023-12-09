import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api-service.service';
import { ScheduleViewLinkDto } from '../../models/dtos';
import { CustomValidators } from '../../utils/validators';
import { customSort } from '../../utils/util';
import { environment } from '../../../environments/environment.development';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  form!: FormGroup;
  today = new Date();

  employees: any[] = [];
  services: any[] = [];

  linkEnvironment = environment.uiUrl + "schedule-link?token=";

  viewLinks: ScheduleViewLinkDto[] = [];
  dialog = false;

  items = [
    {
        label: 'Videos',
        icon: 'pi pi-fw pi-video',
        items: [
            [
                {
                    label: 'Video 1',
                    items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
                },
                {
                    label: 'Video 2',
                    items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
                }
            ],
            [
                {
                    label: 'Video 3',
                    items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
                },
                {
                    label: 'Video 4',
                    items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
                }
            ]
        ]
    },
    {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        items: [
            [
                {
                    label: 'User 1',
                    items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
                },
                {
                    label: 'User 2',
                    items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
                }
            ],
            [
                {
                    label: 'User 3',
                    items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
                },
                {
                    label: 'User 4',
                    items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
                }
            ],
            [
                {
                    label: 'User 5',
                    items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
                },
                {
                    label: 'User 6',
                    items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
                }
            ]
        ]
    },
    {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
            [
                {
                    label: 'Event 1',
                    items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
                },
                {
                    label: 'Event 2',
                    items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
                }
            ],
            [
                {
                    label: 'Event 3',
                    items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
                },
                {
                    label: 'Event 4',
                    items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
                }
            ]
        ]
    },
    {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
            [
                {
                    label: 'Setting 1',
                    items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
                },
                {
                    label: 'Setting 2',
                    items: [{ label: 'Setting 2.1' }, { label: 'Setting 2.2' }]
                },
                {
                    label: 'Setting 3',
                    items: [{ label: 'Setting 3.1' }, { label: 'Setting 3.2' }]
                }
            ],
            [
                {
                    label: 'Technology 4',
                    items: [{ label: 'Setting 4.1' }, { label: 'Setting 4.2' }]
                }
            ]
        ]
    }
];

  constructor(private formB: FormBuilder, private apiService: ApiService,) {
    this.form = this.formB.group({
      timePeriod: [[], Validators.required],
      expirationDate: ['', [Validators.required, CustomValidators.dateRange]],
      employee: ['', Validators.required],
      service: [null]
    });
   }
  
  ngOnInit() {
    this.getResources();
  }

  prepareForm() {
    let form = this.form.value;

    return {
      expirationDate: form.expirationDate,
      fromDateTime: form.timePeriod[0],
      toDateTime: form.timePeriod[1],
      employee: form.employee,
      service: form.service,
    }
  }

  createLink() {
    let value = this.prepareForm();
    console.log(this.form.value, value);
    
    this.apiService.sendToApi("Schedule/CreateLinkView", value).subscribe(x => {
      console.log(x);
      
      if (!x.hasError) {
        this.viewLinks.push(x.data);
        this.dialog = false;
        this.form.reset({timePeriod: [], expirationDate: '', employee: '', service: null})
      }
    })
  }

  getResources() {
    this.apiService.requestFromApi<any>("Service").subscribe(x => {
      this.services = x;
    });

    this.apiService.requestFromApi<any>("User/Employees").subscribe(x => {
      this.employees = x;
    })

    this.apiService.requestFromApi<any>("Schedule/LinksView").subscribe(x => {
      this.viewLinks = x;
    })

  }

  toggle(link: ScheduleViewLinkDto) {
    this.apiService.updateToApi("Schedule/ToggleActiveLink", null, {linkId: link.id}).subscribe(x => {
      console.log(x);
      if (x instanceof Error) return;
      link.isActive = x as boolean;
    })
  }

  remove(link: ScheduleViewLinkDto) {
    this.apiService.deleteFromApi("Schedule/DeleteLinkView", {linkId: link.id}).subscribe(x => {
      console.log(x);
      if (x instanceof Error) return;
      if (x) {
        this.viewLinks.splice(this.viewLinks.findIndex(x => x.id === link.id), 1);
      }
    })
  }

  copyLink(link: string): void {
    navigator.clipboard.writeText(link).then(x => console.log(x, 'copied')).catch(() => {
      console.error("Unable to copy text");
    });
  }

}
