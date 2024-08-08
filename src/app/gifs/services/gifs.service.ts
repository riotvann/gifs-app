import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, provideHttpClient } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({ providedIn: 'root' })
export class GifsService {
    public gifList: Gif[] = [];
    private _tagsHistory: string[] = [];
    private apiKey: string = '8MfkIIPaQe3xgAHUrqlUCkoOFMfWIatW';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
    constructor(private http: HttpClient) {
        this.loadLocalStorage();
    }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string) {
        tag = tag.toLowerCase();

        if (this._tagsHistory.includes(tag)) {
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag.toLowerCase() !== tag);
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this.tagsHistory));
    }

    private loadLocalStorage(): void {
        if (!localStorage.getItem('history')) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
        this.searchTag(this._tagsHistory[0]);
    }

    searchTag(tag: string): void {
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', tag)

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe((resp) => {
                console.log(resp);
                this.gifList = resp.data;
            })
        // fetch('https://api.giphy.com/v1/stickers/random?api_key=8MfkIIPaQe3xgAHUrqlUCkoOFMfWIatW&tag=&rating=g&q=valorant&limit=10')
        //     .then(resp => resp.json())
        //     .then(data => console.log(data));
        // this._tagsHistory.unshift(tag);
    }

}