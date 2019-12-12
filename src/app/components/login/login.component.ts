import { Component, OnInit, NgZone } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(
    private router: Router,
    private data: DataService,
    private zone: NgZone
  ) {}

  ngOnInit() {}

  onSubmit = (username: string, password: string): void => {
    this.submitted = true;

    this.data.post("admin/login", { username: username, password: password });
    this.data.isAuthenticated$.next(true);
    this.zone.run(() => this.router.navigate(["/home"]));
    // this.loginService
    //   .signIn(username, password)
    //   .then(() => {
    //     console.log("logged in");
    //     this.router.navigate(["manage"]);
    //   })
    //   .catch(err => {
    //     this.submitted = false;
    //     this.functions.handleError(err.message);
    //   });
  };
}
