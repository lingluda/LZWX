import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-techdept',
  templateUrl: './techdept.component.html',
  styleUrls: ['./techdept.component.css']
})
export class TechdeptComponent implements OnInit {
  initdata = [];
  searchform: FormGroup;
  constructor(private ps: ProductService, private fb: FormBuilder) { }
  init(){
    this.ps.httpClientPost("/base/list",{data: {type : 1}}).subscribe(resp =>{
      this.initdata = resp.body.data;
    })
  }
  del(id){
    this.ps.httpClientPost("/base/del",{data: {id : id}}).subscribe();
    this.init();
  }
  search(){
    const data={
      name: this.searchform.value.name,
      type: 1
    };
    // const data = this.searchform.value;
    // data.
    console.log("123::",data);
    this.ps.httpClientPost("base/list", {data}).subscribe(resp => {
      this.initdata = resp.body.data;
    });
  }
  clear(){
    this.searchform.reset();
  }
  add(){

  }
  ngOnInit() {
    this.init();
    this.searchform = this.fb.group({
      name: [ null, [ Validators.required ] ]
    });
  }

}
