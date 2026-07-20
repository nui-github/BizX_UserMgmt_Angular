import { Injectable } from "@angular/core";
import { AppConfig } from "../../../app.config";

export enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

export enum ThemeColor {
  BLUE = "Blue_Theme",
  AQUA = "Aqua_Theme",
  PURPLE = "Purple_Theme",
  GREEN = "Green_Theme",
  CYAN = "Cyan_Theme",
  ORANGE = "Orange_Theme",
}

export interface ThemeConfig {
  theme: Theme;
  themeColor: ThemeColor;
}

@Injectable({
  providedIn: 'root'
})
export class StandardThemeService {
  private _storageKey = "usermanagement.standard.app.theme.config";
  private _selectedTheme: Theme = Theme.LIGHT;
  private _selectedThemeColor: ThemeColor = ThemeColor.BLUE;
  private _domHtml: HTMLHtmlElement | null;
  private currentThemeConfig!: ThemeConfig;


  constructor(private config: AppConfig) {
    this._domHtml = document.querySelector("html");
    this.setDefaultThemeConfig();
  }

  get selectedTheme() {
    return this._selectedTheme;
  }

  private setToHtmlAttribute(attribute: string, value: string) {
    if (this._domHtml) {
      this._domHtml.setAttribute(attribute, value);
    }
  }

  setSelectedTheme(theme: Theme) {
    this._selectedTheme = theme;
    this.currentThemeConfig.theme = this._selectedTheme;
    this.setToHtmlAttribute('data-bs-theme', this._selectedTheme);
    localStorage.setItem(this._storageKey, JSON.stringify(this.currentThemeConfig));
  }

  setThemeToDefault() {
    this.setSelectedTheme(Theme.LIGHT);
  }

  get selectedThemeColor() {
    return this._selectedThemeColor;
  }

  setThemeColor(color: ThemeColor) {
    this._selectedThemeColor = color;
    this.currentThemeConfig.themeColor = this._selectedThemeColor;
    this.setToHtmlAttribute('data-color-theme', this._selectedThemeColor);
    localStorage.setItem(this._storageKey, JSON.stringify(this.currentThemeConfig));
  }

  setThemeColorToDefault() {
    this.setThemeColor(ThemeColor.BLUE);
  }

  setDefaultThemeConfig() {
    this.currentThemeConfig = JSON.parse(localStorage.getItem(this._storageKey) ?? "{}");

    if(!this.currentThemeConfig.theme) {
      this.currentThemeConfig.theme = this.getTheme(this.config.application?.["theme"] ?? "default");
    }
    if(!this.currentThemeConfig.themeColor) {
      this.currentThemeConfig.themeColor = this.getThemeColor(this.config.application?.["themeColor"] ?? "default");
    }

    this.setSelectedTheme(this.currentThemeConfig?.theme ?? Theme.LIGHT);
    this.setThemeColor(this.currentThemeConfig?.themeColor ?? ThemeColor.BLUE);
  }

  getTheme(theme: string) {
    let resultMapping: Theme;
    switch (theme) {
      case "dark":
        resultMapping = Theme.DARK;
        break;
      default:
        resultMapping = Theme.LIGHT;
        break;
    }
    return resultMapping;
  }

  getThemeColor(themeColor: string) {
    let resultMapping: ThemeColor;
    switch (themeColor.toUpperCase()) {
      case "AQUA":
        resultMapping = ThemeColor.AQUA;
        break;
      case "PURPLE":
        resultMapping = ThemeColor.PURPLE;
        break;
      case "GREEN":
        resultMapping = ThemeColor.GREEN;
        break;
      case "CYAN":
        resultMapping = ThemeColor.CYAN;
        break;
      case "ORANGE":
        resultMapping = ThemeColor.ORANGE;
        break;
      default:
        resultMapping = ThemeColor.BLUE;
        break;
    }
    return resultMapping;
  }
}
