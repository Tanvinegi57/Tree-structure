import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService implements OnInit{
  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.getRootData();
this.getLevel2Data()
      
  }

  // company/individual & services/ transportation data
  getRootData() {
    return this.http.get('http://localhost:3000/rootLevel?_embed=level1');
  }

  getLevel2Data() {
    return this.http.get('http://localhost:3000/level1?_embed=level2');
  }
  getLevel3Data() {
    return this.http.get('http://localhost:3000/level2?_embed=level3');
  }

  addLevel1Data(data: any){
    return this.http.post('http://localhost:3000/level1', data)
  }
  editrootData(id:number,data:any){
    return this.http.put('http://localhost:3000/rootLevel/'+id,data)
  }

  addLevel2Data(data: any){
    return this.http.post('http://localhost:3000/level2', data)
  }
  editLevel1Data(id:number,data:any){
    return this.http.put('http://localhost:3000/level1/'+id,data)
  }

  addLevel3Data(data:any){
    return this.http.post('http://localhost:3000/level3',data)
  }
  editLevel2Data(id:number,data:any){
    return this.http.put('http://localhost:3000/level2/'+id,data)
  }

}
