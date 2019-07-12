import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapLayer } from '../haven-new-layer/haven-new-layer.component';

class Operation {
  property: string;
  value: number;
  operand: string;
}

@Component({
  selector: 'app-haven-layer-fill',
  templateUrl: './haven-layer-fill.component.html',
  styleUrls: ['./haven-layer-fill.component.css']
})
export class HavenLayerFillComponent implements OnInit {
  tops = [];

  operations: Operation[] = [];

  currentOperation = '';
  currentOperationLiteral = '';
  constructor(
    public dialogRef: MatDialogRef<HavenLayerFillComponent>,

    @Inject(MAT_DIALOG_DATA) public data: MapLayer) {
    this.tops.push('Custom Value');
    this.tops.push(...Object.keys(data.properties));
    const op1 = new Operation();
    op1.property = this.tops[0];
    op1.operand = '+';
    op1.value = 0;
    this.operations.push(op1);
    this.updateFullOperation();
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close(this.operations);
  }

  selChange(event, op: Operation) {
    op.property = event.value;
    op.value = this.data.properties[op.property];
    this.updateFullOperation();
  }

  operandChange(event, op: Operation) {
    op.operand = event.value;
    this.updateFullOperation();
  }

  updateFullOperation() {
    this.currentOperation = '';
    this.currentOperationLiteral = '';
    let count = 0;
    this.operations.forEach(el => {
      this.currentOperationLiteral += ` ${el.value.toString()} `;
      if (el.property === 'Custom Value') {
        this.currentOperation += ` ${el.value} `;
      } else {
        this.currentOperation += ` ${el.property} `;
      }
      if (count < this.operations.length - 1) {
        this.currentOperation += ` ${el.operand} `;
        this.currentOperationLiteral += ` ${el.operand} `;

      }
      count++;
    });
  }

  remove(index: number) {
    this.operations.splice(index, 1);
    this.updateFullOperation();
  }
  add() {
    const op = new Operation();
    op.property = this.tops[0];
    op.operand = '+';
    op.value = 0;
    this.operations.push(op);
    this.updateFullOperation();
  }

  customValChange(event, op: Operation) {
    op.value = event.target.value;
    this.updateFullOperation();
  }
}
