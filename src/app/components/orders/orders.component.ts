import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  MatTableDataSource,
  MatTable,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";

var ELEMENT_DATA = [
  [
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 }
  ],
  [
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 }
  ],
  [
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 },
    { name: "asdad", quantity: 12, address: "asmdpamdamd", pin: 222222 }
  ]
];

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"]
})
export class OrdersComponent implements OnInit {
  @ViewChild("tableOngoing", { static: true }) tableOngoing;
  @ViewChild("tableApprove", { static: true }) tableApprove;
  @ViewChild("tableDispatch", { static: true }) tableDispatch;

  displayedColumns: string[] = ["name", "quantity", "address", "pin"];
  displayedColumns2: string[] = [
    "name",
    "quantity",
    "address",
    "pin",
    "approve"
  ];
  displayedColumns1: string[] = [
    "name",
    "quantity",
    "address",
    "pin",
    "dispatch"
  ];
  dataSource = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    for (let i = 0; i < 3; i++) {
      this.dataSource[i] = new MatTableDataSource(ELEMENT_DATA[i]);
    }
  }

  approve(element, i) {
    this.dataSource[0].data.splice(i, 1);
    this.tableOngoing.renderRows();
    this.dataSource[1].data.push(element);
    this.tableDispatch.renderRows();
  }

  dispatch(element, i) {
    const dialogRef2 = this.dialog.open(CrnDialog, {
      data: ""
    });

    dialogRef2.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource[1].data.splice(i, 1);
        this.tableApprove.renderRows();
        this.dataSource[2].data.push(element);
        this.tableDispatch.renderRows();
        // this.data.post("updateProduct", result).subscribe(
        //   res => {
        //     let index = ELEMENT_DATA.indexOf(
        //       ELEMENT_DATA.find(x => x._id == result._id)
        //     );
        //     ELEMENT_DATA.splice(index, 1, result);
        //     alert("Updated");
        //   },
        //   err => {
        //     alert("Failed adding product.");
        //     console.log(err);
        //   }
        // );
      }
    });
  }
}

@Component({
  selector: "crn-dialog",
  templateUrl: "crn-dialog.html"
  // styleUrls: ["./crn-dialog.css"]
})
export class CrnDialog {
  gst_img = "";
  pan_img = "";
  object = Object.keys;

  constructor(
    public dialogRef: MatDialogRef<CrnDialog>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
