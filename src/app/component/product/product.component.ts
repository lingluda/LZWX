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

export class ProductComponent implements OnInit {
  initdata =[];
  constructor(private fb: FormBuilder,private http: HttpClient,private ps: ProductService) {
    const data = {
      id:96,
      majorid:1
    }
    this.ps.httpClientPost("teacher/list",{data}).subscribe(resp=>{
      this.initdata = resp.body.data;
    })
  }

  ngOnInit() {
  }
  }
