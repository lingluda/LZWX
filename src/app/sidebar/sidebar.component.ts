import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  mode = false;
  navLinks =[];
  constructor() { }

  ngOnInit() {
    this.navLinks =[
      // {
      //   class: '',
      //   path: '/notelist',
      //   menu: '通知列表页面'
      // },
      {
        class: 'anticon anticon-calendar',
        title: '老师',
        second: [
          {
          path: '/list',
          menu: '列表页面'
          },
          {
            path: '/product',
            menu: '列表页面'
          }
        ]
      },
     {
       class: 'anticon anticon-area-chart',
       title: '学生',
       second: [
         {
           path: '/product',
           menu: '列表页面'
         },
         {
           path: '/list',
           menu: '列表页面'
         }
       ]
     }
    ]
  }

}
