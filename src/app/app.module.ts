import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./components/home/home.component";
import {
  ProductsComponent,
  AddProductsDialog,
  ReplenishProductsDialog
} from "./components/products/products.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatListModule,
  MatDialogModule,
  MatDividerModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatStepperModule,
  MatRadioModule,
  MatChipsModule,
  MatIconModule
} from "@angular/material";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataService } from "./services/data.service";
import { HttpClientModule } from "@angular/common/http";
import { InventoryComponent } from "./components/inventory/inventory.component";
import { ReplenishComponent } from "./components/replenish/replenish.component";
import {
  OrdersComponent,
  CrnDialog
} from "./components/orders/orders.component";
import { ReturnsComponent } from "./components/returns/returns.component";
import { LoginComponent } from "./components/login/login.component";
import { LocalUserGuard, AuthGuard } from "./guards/login.guard";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    AddProductsDialog,
    InventoryComponent,
    ReplenishComponent,
    OrdersComponent,
    ReplenishProductsDialog,
    ReturnsComponent,
    CrnDialog,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDividerModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [DataService, LocalUserGuard, AuthGuard],
  entryComponents: [AddProductsDialog, ReplenishProductsDialog, CrnDialog],
  bootstrap: [AppComponent]
})
export class AppModule {}
