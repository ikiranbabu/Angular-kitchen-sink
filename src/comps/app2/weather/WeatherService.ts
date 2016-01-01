import {Injectable} from 'angular2/core';
import {Http, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {IWeatherItem} from "./IWeather";

@Injectable()
export class WeatherService {
    static BASE_URL:string = 'https://secure.digitalsignage.com/Weather/';

    constructor(private http:Http) {
    }

    search(query:string):Observable<any> {
        // if you wish to use ?q=param_here you can use
        //const search:URLSearchParams = new URLSearchParams();
        //search.set('q', query);
        //return this.http.get(`${WeatherService.BASE_URL}`, new RequestOptions({search}))

        // do is a great way to trace for debugging Observables
        return this.http
            .get(`${WeatherService.BASE_URL}${query}`)
            .do(x => console.log(`ZZZZZZZZZZZZZZZZZZ Weather info ${x}`))
            .map((res:any) => res.json())
            .map((e) => {
                var items:Array<IWeatherItem> = e[0].data.weather;
                return items;
            });
        //.map((item: Array<{item: IWeatherItem}>) => item.map((item: {show: IWeatherItem}));
    }
}