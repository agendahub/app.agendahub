import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

export type Breadcrumb = {
  label: string;
  icon: string;
  url?: string;
};

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Breadcrumb[] = [{
    label: "Home",
    icon: "fa-solid fa-home",
    url: "home"
  }];

  constructor(private router: Router, private activated: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.parse(this.activated.snapshot);
      }
    });
  }

  parse(snapshot: ActivatedRouteSnapshot | (null | undefined), take = 1) {
    this.breadcrumbs = this.breadcrumbs.slice(0, take);

    if (snapshot) {
      let breadcrumb: Set<Breadcrumb | Breadcrumb[]> = new Set();

      if (snapshot.firstChild?.data["breadcrumb"]) {
        breadcrumb.add(snapshot.firstChild.data["breadcrumb"]);
      }

      if (snapshot.firstChild?.children) {
        for (let child of snapshot.firstChild.children) {
          if (child.data["breadcrumb"]) {
            breadcrumb.add(child.data["breadcrumb"]);
          }
        }
      }

      this.breadcrumbs.push(...Array.from(breadcrumb.values()).flat());
    }
  }

}
