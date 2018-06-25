import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/product.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  data;
  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    const data = this.validateForm.value;
    this.ps.httpClientPost('login', {data}).subscribe(resp => {
      this.createMessage(resp.body.code, resp.body.msg);
      localStorage.setItem('header', resp.body.data.toString());

    });
    // this.http.post('login', {data}).subscribe(resp => {
    //   console.log("1",resp,"1");
    // });
  }

  createMessage = (type, text) => {
    this._message.create(type, text);
  };

  constructor(private fb: FormBuilder, private ps: ProductService, private router: Router, private _message: NzMessageService,private http: HttpClient) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
