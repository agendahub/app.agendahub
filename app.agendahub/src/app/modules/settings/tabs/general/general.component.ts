import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  
  constructor(private settings: SettingsService) { }

  ngOnInit(): void {
    this.settings.state('General')
  }

}
