import { Component, OnInit } from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mode = false;
  navLinks =[];
  constructor() { }
  openChange(value){
    console.log(value);
    //forEach()
  }
  ngOnInit() {
    this.navLinks =[
      {
        id: 1,
        class: 'anticon anticon-calendar',
        path: '/',
        title: '数据字典',
        isOpen: true,
        second: [
          {
            id: 2,
            class: 'anticon anticon-calendar',
            path: '/techdept',
            title: '老师',
            isOpen: false,
          },
          {
            id: 3,
            class: 'anticon anticon-calendar',
            path: '/product',
            title: '学生',
            isOpen: false,
          }
        ]
      },
     {
       id: 4,
       class: 'anticon anticon-calendar',
       path: '/',
       title: '基础数据',
       isOpen: true,
       second: [
         {
           id: 5,
           class: 'anticon anticon-calendar',
           path: '/list',
           title: '数据',
           isOpen: false,
         },
         {
           id: 6,
           class: 'anticon anticon-calendar',
           path: '/product',
           title: '字典',
           isOpen: false,
         }
       ]
     }
    ]
  }

}
