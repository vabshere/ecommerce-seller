import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "../services/data.service";

@Injectable({
  providedIn: "root"
})
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public data: DataService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.data.isAuthenticated$.pipe(
      map(result => {
        if (result) {
          this.router.navigate(["home"]);
        }
        return !result;
      })
    );
  }
}

@Injectable()
export class LocalUserGuard implements CanActivate {
  constructor(public data: DataService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.data.isAuthenticated$.pipe(
      map(result => {
        if (!result) {
          this.router.navigate(["login"]);
        }
        return !!result;
      })
    );
  }
}
