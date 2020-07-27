import {Component, OnInit} from '@angular/core';
import {ActivationStart, Event, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public shouldDisplayNavbar = true;
  public shouldDisplayFooter = true;

  public constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationStart)
      )
      .subscribe(
        (event: ActivationStart) => {
          if (event.snapshot.component === PageNotFoundComponent) {
            this.shouldDisplayNavbar = false;
            this.shouldDisplayFooter = false;
          } else {
            this.shouldDisplayNavbar = true;
            this.shouldDisplayFooter = true;
          }
        }
      );
  }

}
