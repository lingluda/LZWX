import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {
  initdata = [];
  _initDate() {
    this.ps.httpClientPostList("/note/list ", {data: {}}).subscribe(resp => {
      this.initdata = resp.body.data.rows;
    });
  }
  constructor(private ps: ProductService, private fb: FormBuilder) { }
  ngOnInit() {
    this._initDate();
  }

}
