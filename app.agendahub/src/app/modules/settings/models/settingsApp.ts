export class SettingsApp {
    days!: number[];
    openTime!: Date;
    closeTime!: Date;

    static fromJson(json: any): SettingsApp {
        const settings = new SettingsApp();
        settings.days = json.days;
        settings.openTime = new Date(json.openTime);
        settings.closeTime = new Date(json.closeTime);
        return settings;
    }
}