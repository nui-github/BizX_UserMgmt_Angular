import { FormControl } from "@angular/forms";

export class StandardAuth {
    public username!: string | null;
    public password!: string | null;
}

export interface StandardLoginForm {
    username: FormControl<string>;
    password: FormControl<string>;
    remember?: FormControl<boolean>;
}

export interface StandardLoginResponse {
    username: string;
    firstname: string;
    lastname: string;
    uid: string;
    ucode: string;
    email: string;
    gid: string;
    cpid: string;
    firstLogin: string;
    profileName: string;
    permissions: string[];
}

export interface StandardForgotPasswordForm {
    email: FormControl<string>
}

export interface ICheckForgotPassword {
    username: string;
}