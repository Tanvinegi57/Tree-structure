import { Component } from '@angular/core';
import { faPen, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ServiceService } from './services/service.service';
 import {  FormBuilder,  FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'tree-structure';

  constructor(private api: ServiceService , private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getRootData()
  }

  // ID
  rootID!: number;
  Level2Id!: number;
  Level3Id!: number;

  // font awesome icons
  faPenIcon = faPen;
  faTimesCrossIcon = faTimes;
  faPlus = faPlus;

  // variables
  open1: boolean = false;
  open2: boolean = false;
  open3: boolean = false;


  //to store responses
  root: any;
  level1: any;
  level2: any;
  level3: any;
  level4: any;
  level5: any;

  // to toggle add and edit text fields
  textField1: boolean = false
  textField2: boolean = false
  textField3: boolean = false



  getRootData() {
    this.api.getRootData().subscribe((res)=>{
      this.root = res;
      this.root.map((data: any)=>{
        console.log(data)
      })
    })

    this.api.getLevel2Data().subscribe((res)=>{
      this.level2 = res;
      this.level2.map((data: any)=>{
        console.log("Level 3 data",data)
      })
    })

    this.api.getLevel3Data().subscribe((res)=>{
      this.level4 = res;
      this.level4.map((data: any)=>{
        return data
      })
    })
  }

  showRootLevel(id: number){
    this.rootID = id
      this.root.map((data:any)=>{
        if(this.rootID === data.id){
    this.open1 = !this.open1

          this.level1 = data.level1
        }
      })

  }

  showLevel2(id: number){
    this.Level2Id = id
    this.level2.map((data:any)=>{
      if(this.Level2Id === data.id){
        this.open2 = !this.open2
        this.level3 = data.level2
      }
    })
    this.getRootData()

  }
  
  showLevel3(id:number){
    this.Level3Id = id
    this.level4.map((data:any)=>{
      if(this.Level3Id === data.id){
        this.open3 = !this.open3
        this.level5 = data.level3
      }
    })
    this.getRootData()

  }

  // ADD FUNCTIONALITY OF LEVEL-1

  onAction: string =""
  openAddTextField(id: number, action: string){
    this.rootID = id
    this.onAction = action
    this.textField1 = !this.textField1
  }

  form = this.formBuilder.group({
    title: [''],
  });


  // add level-1 data and edit root level
  saveLevel1Data(rootId: number){
    const data = {
      title: this.form.value.title,
      rootLevelId: rootId
    }

    if(this.onAction === 'Save'){
      console.log("save")
      this.api.addLevel1Data(data).subscribe((res)=>{
        console.log("ADD RESPONSE",res)
      })
      
      this.level1.push(data)
    }else if(this.onAction === 'Update'){
      console.log("edit")
      this.rootID = rootId
    //  this.form.controls['title'].setValue(title)
      this.api.editrootData(rootId, this.form.value ).subscribe((res)=>{
        console.log(res)
      })
    }
  }

  cancel(){
    this.textField1 =!this.textField1
  }
  cancel1(){
    this.textField2 =!this.textField2
  }
  // add level-2 data and edit level-1 data

  openAddTextFieldForLevel1(id: number, action: string){
    this.Level2Id = id
    this.onAction = action
    this.textField2 = !this.textField2
  }
  saveLevel2Data(level1Id: number,  rootLevel1Id: number){
    const data = {
      title: this.form.value.title,
      level1Id: level1Id
    }
    if(this.onAction === 'Save'){
      console.log("save")
      this.api.addLevel2Data(data).subscribe((res)=>{
        console.log(res)
      })
      console.log("this.level3",this.level3)
      this.level3.push(data)
    }else if(this.onAction === 'Update'){
      console.log("EDIT")
      const data = {
        title: this.form.value.title,
        rootLevelId: rootLevel1Id
      }
      this.api.editLevel1Data(level1Id, data).subscribe((data)=>{
        console.log(data);
      })
    }
  }

  openAddTextFieldForLevel2(id: number, action: string){
    this.Level3Id = id
    this.onAction = action
    this.textField3 = !this.textField3
  }

  saveLevel3Data(level2Id:number, level1Id: number){
    const data = {
      title: this.form.value.title,
      level2Id: level2Id
    }
    if(this.onAction === 'Save'){
      this.api.addLevel3Data(data).subscribe((res)=>{
        console.log(res)
      })
      this.level5.push(data)
      this.form.reset()
    }else if(this.onAction === 'Update'){
      const data = {
        title: this.form.value.title,
        level1Id: level1Id
      }
      this.api.editLevel2Data(level1Id,data ).subscribe((res)=>{
        console.log(res)
      })
      this.form.reset()
    }
  }
}
