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
}
