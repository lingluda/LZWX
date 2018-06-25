import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';

@Component({
  selector: 'app-techdept',
  templateUrl: './techdept.component.html',
  styleUrls: ['./techdept.component.css']
})
export class TechdeptComponent implements OnInit {
  initdata = [];
  editdata;
  _checkedNumber = 0;
  nzPageIndex;
  nzPageSize;
  nzTotal;
  searchvalue;
  searchform: FormGroup;
  addform: FormGroup;
  editform: FormGroup;
  AddIsVisible = false;
  editIsVisible = false;

  _allChecked = false;
  _indeterminate = false;
  _displayData = [];

  _displayDataChange($event) {
    this._displayData = $event;
    console.log('123:', this._displayData);
    console.log('1222321421:::::::::::::::::::', this.nzPageSize);
    this._refreshStatus();
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    //this._disabledButton = !this._displayData.some(value => value.checked);
    console.log(this._displayData.filter(value => value.checked));
    this._checkedNumber = this._displayData.filter(value => value.checked).length;
    console.log(this._checkedNumber);
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

  constructor(private ps: ProductService, private fb: FormBuilder, private _message: NzMessageService, private _notification: NzNotificationService) {
  }

  showEditModal = (data) => {
    this.editdata = data;
    this.editIsVisible = true;
  };

  editCancel() {
    this.editIsVisible = false;
  }

  editOK() {
    if (this.editform.valid === false) {
      return false;
    }
    const data = {
      id: this.editdata.id,
      name: this.editform.value.name,
      type: 1
    };
    this.ps.httpClientPost('/base/update', {data}).subscribe(resp => {
      this.init(1, this.nzPageIndex, this.nzPageSize,null);
      this.createMessage(resp.body.code, resp.body.msg);
    });
    this.editIsVisible = false;
    this.editdata = '';
  }

  createMessage = (type, text) => {
    this._message.create(type, text);
  };
  showAddModal = () => {
    this.AddIsVisible = true;
  };

  addCancel() {
    this.AddIsVisible = false;
  }

  addOK() {
    for (const i in this.addform.controls) {
      this.addform.controls[i].markAsDirty();
    }
    if (this.addform.valid === false) {
      return false;
    }
    const data = {
      name: this.addform.value.name,
      type: 1
    };

    console.log('数值：', this.addform.getRawValue());
    this.ps.httpClientPost('base/save', {data}).subscribe(resp => {
      this.init(1, this.nzPageIndex, this.nzPageSize,null);
    });
    this.AddIsVisible = false;
    this.addform.reset();
  }

  init(type, page, size, searchvalue) {
    this.ps.httpClientPostList('/base/list', {data: {type: type, page: page, size: size,name: searchvalue}}).subscribe(resp => {
      this.initdata = resp.body.data.content;
      this.nzTotal = resp.body.data.totalElements;
      this.nzPageSize = resp.body.data.size;
    });
  }
  sizeChange(size){
    console.log('页数改变：', size);
    this.nzPageSize = size;
    //this.init(1,this.nzPageIndex, this.nzPageSize,this.searchvalue)
  }
  indexchange(index) {
    console.log('下标改变：', index);
    console.log('下标改变页数大小：',this.nzPageSize);
    this.nzPageIndex = index;
    this.init(1, this.nzPageIndex, this.nzPageSize,this.searchvalue);
  }

  del(id) {
    this.ps.httpClientPost('/base/del', {data: {id: id}}).subscribe(resp => {
      console.log('删除123：', this.nzPageIndex);
      this.init(1, this.nzPageIndex, this.nzPageSize,null);
    });
  }

  search() {
    this.init(1,this.nzPageIndex, this.nzPageSize,this.searchvalue)
    /*const data = {
      name: this.searchform.value.name,
      type: 1
    };
    this.ps.httpClientPostList('base/list', {data}).subscribe(resp => {
      this.initdata = resp.body.data.content;
      this.nzTotal = resp.body.data.totalElements;
      this.nzPageSize = resp.body.data.size;
    });*/
  }

  searchim(name) {
    const data = {
      name: name,
      type: 1
    };
    this.ps.httpClientPost('base/list', {data}).subscribe(resp => {
      this.initdata = resp.body.data;
    });
  }

  clear() {
    this.searchform.reset();
  }

  // onKey() {
  //       this.search();
  // }
  change(value) {
    this.searchvalue = value;
    this.init(1, this.nzPageIndex, this.nzPageSize,this.searchvalue);
  }

  ngOnInit() {

    //this._notification.create("success", '这是标题', '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案');

    this.init(1, this.nzPageIndex, this.nzPageSize,null);

    this.searchform = this.fb.group({
      name: null,
    });

    this.addform = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(8)]],
    });

    this.editform = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(8)]],
    });
  }

}
