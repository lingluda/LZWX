import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = false;
  logout() {
    this.ps.toLogout();
  }
  constructor(private ps: ProductService) { }
  ngOnInit() {
  }

}
