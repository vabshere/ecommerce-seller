import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  links = [
    { id: "products", name: "Products" },
    // { id: "inventory", name: "Inventory" },
    // { id: "replenish", name: "Replenish" },
    { id: "orders", name: "Orders" },
    { id: "returns", name: "Returns" }
  ];

  constructor() {}

  ngOnInit() {}
}
