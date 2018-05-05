import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { ProductService } from '../../shared/product.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
// export interface Config {
//   id: number;
//   amount: number;
//   amountagreement: number;
// }
export class ProductComponent implements OnInit {
  options = [];
  selectedOption;
  validateForm: FormGroup;
  _dataSet;
  //config: Config;
  constructor(private fb: FormBuilder,private http: HttpClient,private ps: ProductService) {
    //,private ps: ProductService
  }


  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  //_dataSet = [];
  _indeterminate = false;

  isVisibleTop = false;
  isVisibleMiddle = false;
  style: any = {
    top: '20px'
  };
  showModalTop = () => {
    this.isVisibleTop = true;
  };
  handleOkTop = (e) => {
    console.log('点击了确定');
    var data = this.validateForm.value;
    //let header:Headers = new Headers();
   // header.append('Authorization','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjI1MjMxNjAsInVzZXJuYW1lIjoiMyJ9.HR0OKGTNDnXjXZhIh5FLfz6ZNWgR3bPA7INL718qVXk');

    this.http.post("/fuck",{data}).subscribe((val) => {
      console.log("POST call successful value returned in body",
        val);
  },
  response => {
      console.log("POST call in error", response);
  },
  () => {
      console.log("The POST observable is now completed.");
  });

    console.log(this.validateForm);
    console.log(this.validateForm.value);
    this.isVisibleTop = false;
  };

  handleCancelTop = (e) => {
    console.log(e);
    this.isVisibleTop = false;
  };

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }


  ngOnInit() {
    var _dataSet;
  //   this.ps.getProduct().subscribe(data =>{
  //     console.log(data.code);
  //     console.log(data.msg);
  //     console.log(data.data);

  //     this._dataSet = data.data;
  //   }
  // );
    //  this.http.get("/name")
    //   .subscribe(data=> {
    //     console.log(data);
    //     this._dataSet = data;
    //   }
    // );
    //   for (let i = 1; i <= 90; i++) {
    //   this._dataSet.push({
    //     key        : i,
    //     name       : 'John Brown',
    //     age        : `${i}2`,
    //     address    : `New York No. ${i} Lake Park`,
    //     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    //   });
    // }
    this.validateForm = this.fb.group({
      id: [ null, [ Validators.required ] ],
      amount: [this.selectedOption],
      amountagreement: [ null, [ Validators.required ] ]
    });



    setTimeout(_ => {
      this.options = [
        { value: '1', label: 'Jack' },
        { value: '2', label: 'Lucy' },
        { value: 'disabled', label: 'Disabled', disabled: true }
      ];
      this.selectedOption = this.options[ 0 ];
      console.log(this.selectedOption);
    }, 100);

  }
  }
