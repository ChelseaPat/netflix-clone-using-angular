import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { forkJoin, map } from 'rxjs';

@Component({
    selector: 'app-browse',
    standalone: true,
    imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent],
    templateUrl: './browse.component.html',
    styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit {
    auth = inject(AuthService);
    movieService = inject(MovieService);
    name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
    userProfileImg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
    email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;

    movies: IVideoContent[] = [];
    tvShows: IVideoContent[] = [];
    ratedMovies: IVideoContent[] = [];
    nowPlayingMovies: IVideoContent[] = [];
    upcomingMovies: IVideoContent[] = [];
    popularMovies: IVideoContent[] = [];
    topRatedMovies: IVideoContent[] = [];

    sources = [
        this.movieService.getMovies(),
        this.movieService.getTvShows(),
        this.movieService.getRatedMovies(),
        this.movieService.getNowPlayingMovies(),
        this.movieService.getUpcomingMovies(),
        this.movieService.getPopularMovies(),
        this.movieService.getTopRated(),
    ];

    ngOnInit (): void {
        forkJoin(this.sources)
        .pipe(
            map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
                return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated};
            })
        ).subscribe( {
            next: (resp) => {
                this.movies = resp.movies.results as IVideoContent[];
                this.tvShows = resp.tvShows.results as IVideoContent[];
                this.ratedMovies = resp.ratedMovies.results as IVideoContent[];
                this.nowPlayingMovies = resp.nowPlaying.results as IVideoContent[];
                this.upcomingMovies = resp.upcoming.results as IVideoContent[];
                this.popularMovies = resp.popular.results as IVideoContent[];
                this.topRatedMovies = resp.topRated.results as IVideoContent[];
            },
            error: (err: any) => {
                console.error('ERROR: ', err)
            }
        });
    }

    signOut() {
        sessionStorage.removeItem('loggedInUser');
        this.auth.signOut();
    }

}
