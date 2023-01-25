import { Component } from '@angular/core';
import { faPen, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { ServiceService } from './services/service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tree-structure';

  constructor(private api: ServiceService) {}

  ngOnInit(): void {
    this.getResponse();
  }

  // ID
  Level2ID!: number;

  // font awesome icons
  faPenIcon = faPen;
  faTimesCrossIcon = faTimes;
  faPlus = faPlus;

  // variables
  open1: boolean = false;
  open2: boolean = false;
  open3: boolean = false;
  // open4: boolean = false;

  level2: any[] = [];
  level3: any[] = [];
  level4: any[] = [];

  openDiv1() {
    this.open1 = !this.open1;
    this.open2 = false;
    this.open3 = false;
  }
  openLevel2(id: number) {
    this.open2 = !this.open2;
    this.open3 = false;

    this.Level2ID = id;

    console.log('ID', this.Level2ID);

    if (this.Level2ID === id) {
      console.log('DATA', this.level2);

      this.level2.map((level3nodes) => {
        console.log('level3', level3nodes.level3);
      });
      // this.level3
    }
  }
  openLevel3() {
    this.open3 = !this.open3;
  }
  // openLevel4() {
  //   this.open4 = !this.open4;
  // }

  getResponse() {
    return this.api.getData().subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        res.forEach((element: any) => {
          console.log(element, '222222');
        });

        res.map((res: any) => {
          this.level2 = res.level2;
          console.log(this.level2, 'level 2');
        });

        this.level2.map((response: any) => {
          console.log(response, 'LEVEL 3 LOOP');
          // console.log(level3Array);
          this.level3 = response.level3;
          console.log(this.level3, 'Level 3');
        });

        this.level3.map((resLevel4: any) => {
          console.log(resLevel4.Level4, 'Level4');
          this.level4 = resLevel4.Level4;
        });
      },
      error: () => {
        console.log('error occured');
      },
    });
  }
}
