import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from '../../../shared-ui';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;

  function updateForm(userEmail: any) {
    fixture.componentInstance.login['email'] = userEmail;
    /*  fixture.componentInstance.login['password'].setValue(
      userPassword
    ); */
    // fixture.componentInstance.loginForm.controls['firstName'].setValue(
    //   userEmail
    // );
    // fixture.componentInstance.loginForm.controls['password'].setValue(
    //   userPassword
    // );
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // it will be manage route related  feature like router, router outlet.
        HttpClientTestingModule, // it will be manage http api related  feature like router, router outlet.
        ToastrModule.forRoot(), //it will test toast msg and services
        SocialLoginModule,
      ],
      providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '1051803384347-91967jipju1ume5ul4dcr5g84bfaja56.apps.googleusercontent.com'
                ),
              },
            ],
          } as SocialAuthServiceConfig,
        },
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  it('login component should be loaded', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const login = fixture.componentInstance;
    expect(login).toBeTruthy();
  });

  it(`Login Title should be checked in here 'Login | Estimation Calculator'`, () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const login = fixture.componentInstance;
    expect(login.title).toEqual('Login | Estimation Calculator');
  });

  it(`Checking login successfully then redirect to home`, () => { });
});
