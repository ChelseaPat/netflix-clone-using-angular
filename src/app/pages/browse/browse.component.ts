import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../core/components/banner/banner.component';

@Component({
    selector: 'app-browse',
    standalone: true,
    imports: [CommonModule, HeaderComponent, BannerComponent],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.scss'
})
export class BrowseComponent {
    auth = inject(AuthService);
    name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
    userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
    email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;

    signOut() {
        sessionStorage.removeItem('loggedInUser');
        this.auth.signOut();
    }

}
