declare var google: any;
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    private router = inject(Router);

    ngOnInit (): void {
        google.accounts.id.initialize({
            client_id: '18688104133-fidsj52ri787u8ebpe3edr6eh22hu99c.apps.googleusercontent.com',
            callback: (resp: any) => {
                this.handleLogin(resp);
            }
        });

        google.accounts.id.renderButton(document.getElementById('google-btn'), {
            theme: 'filled_blue',
            size: 'large',
            shape: 'rectangle',
            width: 350
        });
    }

    private decodeToken(token: string): void {
        return JSON.parse(atob(token.split('.')[1]));
    }

    handleLogin(response: any): void {
        if (response) {
            // decode the token
            const payload = this.decodeToken(response.credential);
            // store in session
            sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
            // navigate to home/browse
            this.router.navigate(['/browse']);
        }
    }

}
