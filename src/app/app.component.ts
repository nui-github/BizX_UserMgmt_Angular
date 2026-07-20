import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { StandardThemeService, Theme } from './standard/core/services/standard-theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  title = 'smart-command-center';

  constructor(private themeService: StandardThemeService, translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language

    if(localStorage.getItem("lang")) {
      const lang = localStorage.getItem("lang") ?? 'en';
      translate.setDefaultLang(lang);
      translate.use(lang);
    } else {
      translate.setDefaultLang('en');
      translate.use('en');
    }


     // the lang to use, if the lang isn't available, it will use the current loader to get them
  }

  ngOnInit(): void {
    const defaultDarkTheme: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    // this.themeService.setSelectedTheme(defaultDarkTheme.matches ? Theme.DARK: Theme.LIGHT);
    this.themeService.setDefaultThemeConfig();
  }

}
