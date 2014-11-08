module app.identity {
    export interface IUser {
        UserName: string;
        FistName: string;
        LastName: string;
        Password: string;
        ConfirmPassword: string;
        Email: string;
        Created: string;
        Modified: string;

        PasswordEncrypted?: string;
        ConfirmPasswordEncrypted?: string;

        Url : string;

    }
}
