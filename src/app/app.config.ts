import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { en_US, provideNzI18n, th_TH } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { standardHttpInterceptor } from './standard/core/interceptors/standard-http.interceptor';
import { standardResponseInterceptor } from './standard/core/interceptors/standard-response.interceptor';
import { mockApiInterceptor } from './standard/core/mock/mock-api.interceptor';
import { MOCK_CONFIG } from './standard/core/mock/mock.config';
import localeTh from '@angular/common/locales/th';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';

export class AppConfig {
  apiUrl!: string;
  apiTimeout!: number;
  apiRetry!: number;
  runmode?: string | undefined;
  permissionCode?: { [key: string]: string } | undefined;
  group?: { [key: string]: string } | undefined;
  application?: { [key: string]: string };
  reportDateRange?: number | undefined;
}


export const APP_DI_CONFIG: AppConfig = {
  apiUrl: environment.apiUrl,
  apiTimeout: environment.apiTimeout,
  apiRetry: environment.apiRetry,
  application: environment.application,
  // runmode: environment.runmode,
  // permissionCode: environment.permissionCode,
  // group: environment.group,
  // application: environment.application,
  // reportDateRange: environment.reportDateRange
};

export let toAstConfig: ToastrModule = {
  timeOut: 10000,
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideNzIcons(),
    provideNzI18n(en_US), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors(
        MOCK_CONFIG.enabled
          ? [mockApiInterceptor, standardHttpInterceptor, standardResponseInterceptor]
          : [standardHttpInterceptor, standardResponseInterceptor]
      )
    ),
    { provide: AppConfig , useValue: APP_DI_CONFIG },
    importProvidersFrom(

      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }  
      })
    ),
    importProvidersFrom(
      HttpClientModule,
      ModalModule.forRoot(),
      ToastrModule.forRoot(toAstConfig),
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    )
  ]
};
