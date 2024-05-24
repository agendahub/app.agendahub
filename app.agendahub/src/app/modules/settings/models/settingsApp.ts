export class SettingsApp {
  days!: number[];
  openTime!: Date;
  closeTime!: Date;
  isOpen!: boolean;
  changeOld!: boolean;
  sendEmailToCustomerScheduleDay!: boolean;

  static fromJson(json: any): SettingsApp {
    const settings = new SettingsApp();
    settings.sendEmailToCustomerScheduleDay = json.sendEmailToCustomerScheduleDay;
    settings.openTime = new Date(json.openTime);
    settings.closeTime = new Date(json.closeTime);
    settings.changeOld = json.changeOld;
    settings.isOpen = json.isOpen;
    settings.days = json.days;

    return settings;
  }
}
