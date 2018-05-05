import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl, Validators
} from '@angular/forms';
import { ProductService } from '../../shared/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-v1',
  templateUrl: './v1.component.html',
  styleUrls: ['./v1.component.css']
})
export class V1Component implements OnInit {
  // 登陆
  username;
  password;
  // 表格
  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  data = [];
  // 顶部表单
  validateForm: FormGroup;
  dialogForm: FormGroup;
  controlArray = [];
  isCollapse = true;
  // 对话框
  isVisibleTop = false;
  style: any = {
    top: '20px'
  };
  showModalTop = () => {
    this.isVisibleTop = true;
  }
  handleOkTop = (e) => {
    console.log('点击了确定');
    const data = this.dialogForm.value;
    this.ps.httpClientPost("insert", {data}).subscribe();
    console.log(this.dialogForm.value);
    this.projectList();
    this.isVisibleTop = false;
   // var data =
  }
  handleCancelTop = (e) => {
    console.log(e);
    this.isVisibleTop = false;
  }
   // 顶部表单
  toggleCollapse() {
    this.isCollapse = !this.isCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.isCollapse ? (index < 3) : true;
    });
  }

  resetForm() {
    this.validateForm.reset();
  }
   // 表格
  _displayDataChange($event) {
    this._displayData = $event;
    this._refreshStatus();
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }
  // 初始化
  projectList() {
    this.ps.httpClientPost("fuck", {data: {stampbitname: '柳州中转仓'}}).subscribe(resp => {
        console.log(resp);
        /*const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);*/
        this.data = resp.body.data;
      }
    );
  }
  removeInput(id) {
    this.ps.httpClientPost("del", {data: {id}}).subscribe();
    this.projectList();
  }
  constructor(private ps: ProductService, private fb: FormBuilder, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.dialogForm = this.fb.group({
      address: [null, [Validators.required]],
      company_id: [null, [Validators.required]],
      customer_name: [null, [Validators.required]],
      wx: [null, [Validators.required]],
    });
    this.validateForm = this.fb.group({});
    // 顶部
    for (let i = 0; i < 10; i++) {
      this.controlArray.push({ index: i, show: i < 3 });
      this.validateForm.addControl(`field${i}`, new FormControl());
    }
    // 请求
    this.projectList();
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.username = queryParams.username;
      this.password = queryParams.password;
    });
  }
}
