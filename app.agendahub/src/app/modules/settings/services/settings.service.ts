import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { ApiService } from "../../../services/api-service.service";
import { SettingsApp } from "../models/settingsApp";

export type SettingsState = "General" | "Notifications" | "Appointments" | "Security";

export const SettingsEndpoints: Record<SettingsState, string> = {
  General: "api/CompanyParameter/",
  Notifications: "User/GetPreferences/",
  Appointments: "api/CompanyParameter/",
  Security: "api/CompanyParameter/",
};

/**
 * Service to manage the settings of the application
 *
 * ### Features:
 * * Retrieve the settings from the API
 * * Store the settings in the states object
 * * Provide the settings to the components
 *
 * ### Usage:
 * * Import the service in the component
 * * Use the state method to get the settings
 *
 * ### Example:
 * ```typescript
 * constructor(private settings: SettingsService) {
 *   console.log(this.settings.state('General'));
 * }
 * ```
 */
@Injectable({
  providedIn: "root",
})
export class SettingsService {
  /**
   * Object with the states of the settings
   * ### States to handle:
   * * General
   * * Notifications
   * * Appointments
   *
   */
  private states!: Record<SettingsState, unknown>;

  private _lock = new BehaviorSubject<SettingsState | null>(null);

  constructor(private api: ApiService) {
    this.states = {} as Record<SettingsState, unknown>;
  }

  public locks() {
    return this._lock.asObservable();
  }

  public async state<T = any>(state: SettingsState, forceRequest = false): Promise<T> {
    if (state in this.states && !forceRequest) {
      return this.states[state] as T;
    }

    return (await this.retrieveSettingsFromApi(state)) as T;
  }

  public async save(state: SettingsState, settings: unknown, updateLocal = false) {
    if (updateLocal) {
      this.states[state] = settings;
      return settings;
    }

    return await this.saveSettingsToApi(state, settings);
  }

  public lock(state: SettingsState) {
    this._lock.next(state);
  }

  public unlock() {
    this._lock.next(null);
  }

  private async retrieveSettingsFromApi(state: SettingsState) {
    return firstValueFrom(this.api.requestFromApi(SettingsEndpoints[state], null, false)).then((response) => {
      this.states[state] = this.parse(response, state);
      return this.states[state];
    });
  }

  private async saveSettingsToApi(state: SettingsState, settings: unknown) {
    return firstValueFrom(this.api.updateToApi(SettingsEndpoints[state], settings)).then((response) => {
      this.states[state] = response;
      return response;
    });
  }

  private parse(value: any, state: SettingsState) {
    switch (state) {
      case "General":
        return value;
      case "Notifications":
        return value;
      case "Appointments":
        return SettingsApp.fromJson(value);
    }
  }
}
