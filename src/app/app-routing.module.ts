import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { ReplenishComponent } from "./components/replenish/replenish.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { ReturnsComponent } from "./components/returns/returns.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { LocalUserGuard, AuthGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "prefix" },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [LocalUserGuard],
    children: [
      { path: "", redirectTo: "products", pathMatch: "prefix" },
      { path: "products", component: ProductsComponent },
      { path: "inventory", component: InventoryComponent },
      { path: "replenish", component: ReplenishComponent },
      { path: "orders", component: OrdersComponent },
      { path: "returns", component: ReturnsComponent }
    ]
  },
  { path: "login", component: LoginComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
