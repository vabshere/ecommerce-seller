import { Component, OnInit, Inject, ViewChild, OnChanges } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  MatPaginator,
  MatChipInputEvent,
  MatHorizontalStepper,
  MatStep
} from "@angular/material";
import { DataService } from "src/app/services/data.service";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnChanges {
  @ViewChild("table", { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ["name", "brief", "image", "replenish"];
  dataSource = new MatTableDataSource([]);

  constructor(public dialog: MatDialog, private data: DataService) {}

  ngOnInit() {
    this.data.get("getProducts").subscribe(res => {
      this.dataSource.data = this.dataSource.data.concat(res);
      this.table.renderRows();
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByFn(index: any, item: any) {
    return item.key;
  }

  trackByFn2(index: any, item: any) {
    return item.key;
  }

  addSales() {
    const dialogRef = this.dialog.open(AddProductsDialog, {
      data: {
        name: "",
        brief: "",
        image: "",
        colors: ["White", "Black"],
        sizes: [],
        category: "",
        quantity: {},
        price: 0
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.post("addProduct", result).subscribe(
          res => {
            this.dataSource.data.push(result);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
          },
          err => {
            alert("Failed adding product.");
            console.log(err);
          }
        );
      }
    });
  }

  replenish(element) {
    const dialogRef2 = this.dialog.open(ReplenishProductsDialog, {
      data: element
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        this.data.post("updateProduct", result).subscribe(
          res => {
            let index = this.dataSource.data.indexOf(
              this.dataSource.data.find(x => x._id == result._id)
            );
            this.dataSource.data.splice(index, 1, result);
            this.table.renderRows();
            alert("Updated");
          },
          err => {
            alert("Failed adding product.");
            console.log(err);
          }
        );
      }
    });
  }

  ngOnChanges() {
    this.dataSource ? (this.dataSource.paginator = this.paginator) : "";
  }
}

@Component({
  selector: "add-products-dialog",
  templateUrl: "add-products-dialog.html",
  styleUrls: ["./add-products-dialog.css"]
})
export class AddProductsDialog implements OnInit, OnChanges {
  @ViewChild("table", { static: true }) table;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatHorizontalStepper, { static: true })
  stepper: MatHorizontalStepper;
  @ViewChild("step1", { static: true }) step1: MatStep;
  @ViewChild("step2", { static: true }) step2: MatStep;
  @ViewChild("step3", { static: true }) step3: MatStep;

  object = Object.keys;
  img;
  displayedColumns: string[] = ["mat-radio", "name", "brief", "image"];
  dataSource = new MatTableDataSource([]);

  selectedCategory = {};

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits = [{ name: "Lemon" }, { name: "Lime" }, { name: "Apple" }];
  quantity = {};

  constructor(
    public dialogRef: MatDialogRef<AddProductsDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private ds: DataService
  ) {}

  ngOnInit() {
    this.ds.get("getProductCategories").subscribe(res => {
      this.dataSource.data = this.dataSource.data.concat(res);
      this.table.renderRows();
    });
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource ? (this.dataSource.paginator = this.paginator) : "";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      this.img = e.target.result;
      this.data.image = this.img;
    };
    reader.readAsDataURL(evt.target.files[0]);
  }

  addSize(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.data.sizes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeSize(size) {
    const index = this.data.sizes.indexOf(size);

    if (index >= 0) {
      this.data.sizes.splice(index, 1);
    }
  }

  addColor(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.data.colors.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removeColor(color) {
    const index = this.data.colors.indexOf(color);
    console.log("called", index, this.data.colors, color);

    if (index >= 0) {
      console.log("called2");
      this.data.colors.splice(index, 1);
    }
  }

  step1Check() {
    if (this.data.category) {
      this.step1.completed = true;
      this.selectedCategory = this.dataSource.data.find(
        x => x._id == this.data.category
      );
      this.stepper.next();
    }
  }

  step2Check() {
    if (
      !!this.data.name &&
      !!this.data.brief &&
      !!this.data.sizes.length &&
      !!this.data.colors.length &&
      !!this.data.image &&
      !!this.data.price
    ) {
      this.step2.completed = true;
      this.createQuantityObject();
      this.stepper.next();
    }
  }

  createQuantityObject() {
    for (let i = 0; i < this.data.colors.length; i++) {
      for (let j = 0; j < this.data.sizes.length; j++) {
        if (!j) this.quantity[this.data.colors[i]] = {};
        this.quantity[this.data.colors[i]][this.data.sizes[j]] = 0;
      }
    }

    this.data.quantity = { ...this.quantity };
  }

  step3Check() {
    this.step3.completed = true;
    this.stepper.next();
  }
}

@Component({
  selector: "replenish-products-dialog",
  templateUrl: "replenish-products-dialog.html",
  styleUrls: ["./replenish-products-dialog.css"]
})
export class ReplenishProductsDialog {
  gst_img = "";
  pan_img = "";
  object = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<ReplenishProductsDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
