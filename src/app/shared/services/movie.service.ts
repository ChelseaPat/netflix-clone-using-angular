import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

const options = {
    params: {
        include_adult: 'false',
        include_video: 'true',
        language: 'en-US',
        page: '1',
        sort_by: 'popularity.desc'
    },
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGNmMjllNTRkM2IxOTQ1MmMwNzU1ZWUyMDc0MDMzMiIsInN1YiI6IjY1YmViYTcyMWRiYzg4MDE3YzFkNTk2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KoCjUUqZmTZewJ30wNKII1jmNFTpNA0YXE3mFPFKdTs'
    }
};

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    http = inject(HttpClient);

    getMovies(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options);
    }

    getTvShows(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', options);
    }
    
    getRatedMovies(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', options);
    }
    
    getBannerImage(id: number): Observable<any> {
        return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/images`, options);
    }
    
    getBannerVideo(id: number): Observable<any> {
        return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
    }
    
    getBannerDetail(id: number): Observable<any> {
        return this.http.get<any>(`https://api.themoviedb.org/3/movie/${id}`, options);
    }
    
    getNowPlayingMovies(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/now_playing', options);
    }
    
    getPopularMovies(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/popular', options);
    }
    
    getTopRated(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated', options);
    }
    
    getUpcomingMovies(): Observable<any> {
        return this.http.get<any>('https://api.themoviedb.org/3/movie/upcoming', options);
    }
}
