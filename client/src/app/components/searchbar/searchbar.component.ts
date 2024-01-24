import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { Subscription, tap,  } from 'rxjs';


@Component({
  selector: 'uni-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements AfterViewInit {

  focused = false;

  constructor(protected searchService: SearchService) { }

  results$ = this.searchService.queryResult('').pipe(tap((res) => { console.log(res); return res }))

  subscription!: Subscription;

  ngAfterViewInit(): void { }

  onFocus($event: any) {
    $event.preventDefault();
    this.focused = true;
  }
  onBlur($event: any) {
    $event.preventDefault();
    this.focused = false;
  }

  onSearchInput($event: KeyboardEvent) {
    const element = $event.target as HTMLInputElement;
    this.results$ = this.searchService.queryResult(element.value);
  }
}
