import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';

@Component({
    selector: 'app-browse',
    standalone: true,
    imports: [CommonModule, HeaderComponent, BannerComponent],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
    auth = inject(AuthService);
    movieService = inject(MovieService);
    name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
    userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
    email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;

    ngOnInit (): void {
        this.movieService.getMovies().subscribe({
            next(resp): void {
                console.log('resp', resp);
            },
            error(err: any): void {
                console.error(err);
            }
        });
    }

    signOut() {
        sessionStorage.removeItem('loggedInUser');
        this.auth.signOut();
    }

}
