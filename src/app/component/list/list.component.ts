import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {asElementData} from '@angular/core/src/view';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  addIsVisible = false;
  editIsVisible = false;
  zroeinfo;
  //loading = true;
  initdata = [];
  searchform: FormGroup;
  addform: FormGroup;
  editform: FormGroup;
  style: any = {
    top: '20px'
  };
  options = [];
  fuck;
  _showModalEdit = (data) => {
    this.zroeinfo = data;
    console.log("初始值："+ this.zroeinfo.fuck);
    this.editIsVisible = true;
  }
  editCancel () {
    this.editIsVisible = false;
  }
  editOk = () => {
    console.log("要修改的值："+ this.editform.value);
    const data = this.editform.value;
    this.ps.httpClientPost("zz/edit", {data}).subscribe();
    this.editIsVisible = false;
    this._initDate();
  }
  // 图片
  fileList = [];
  previewImage = '';
  previewVisible = false;
  handlePreview = (file: UploadFile) => {
    console.log(file.response);
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }
  // 上传图片接口
  uploadPic() {
    const data = {
      parentId: 1,
      type: 0,
      id: 1,
      filename: this.fileList[0].response.name,
      path: this.fileList[0].response.requestUrls.toString(),
    }
    console.log("098765:",this.fileList);
    this.ps.httpClientPost("pic/insert",{data}).subscribe();
  }
  // 搜索
  search() {
    console.log(this.searchform.value);
    const data = this.searchform.value;
    this.ps.httpClientPostList("zz/list", {data}).subscribe(resp => {
      this.initdata = resp.body.data.content;
    });
  }
  clear() {
    this.searchform.reset();
  }
  showAddModal = () => {
    console.log(this.addform.value);
    this.addIsVisible = true;
  }
// 添加门店
  addOk () {
    for (const i in this.addform.controls) {
      this.addform.controls[ i ].markAsDirty();
      this.addform.controls[ i ].updateValueAndValidity();
    }
    console.log("1111",this.addform.value);
    const data = this.addform.value;
    data.book = this.fileList;
    this.ps.httpClientPost("zz/add", {data}).subscribe();
    //this.uploadPic();
    this._initDate();
    this.addIsVisible = false;
  }

  addCancel () {
    this.addIsVisible = false;
  }
// 初始化
  _initDate() {
    this.ps.httpClientPostList("/zz/list ", {data: {}}).subscribe(resp => {
      this.initdata = resp.body.data.content;
      console.log("123123123:",this.initdata);
    });
  }
// 删除
  _del(id) {
    this.ps.httpClientPost("zz/del", {data: {id}}).subscribe();
    this._initDate();
  }
  constructor(private ps: ProductService, private fb: FormBuilder, private msg: NzMessageService) { }

  ngOnInit() {

    this._initDate();
    this.searchform = this.fb.group({
      name: [ null, [ Validators.required, Validators.minLength(4) ] ],
      fuck: [ null, [ Validators.required ] ]
    });
    this.addform = this.fb.group({
      //id: [ null, [ Validators.required ] ],
      name: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      fuck: [ null, [ Validators.required ] ]
    });
    this.editform = this.fb.group({
      id: [ null, [ Validators.required ] ],
      name: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      fuck: [ null, [ Validators.required ] ]
    });
  }
}
