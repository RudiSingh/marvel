import { Component, OnInit } from '@angular/core';
import { FirebaseDBService } from '../services/firebase-db.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Subject, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  //providers : [FirebaseDBService,AngularFirestore]
})
export class ListComponent implements OnInit {
  marvelChangeObj : any = { stone : '', description : ''}
  product : any[] = [];
  productAll : any[] = [];
  loading : boolean = false;
  operation : boolean = false;
  searchData : string ='';
  operationText : string = '';
  startAt = new Subject();
  endAt = new Subject();
  startObserve = this.startAt.asObservable();
  endObserve = this.endAt.asObservable();
  liveSearch = [];
  constructor(private firebaseDb : FirebaseDBService , private afs : AngularFirestore) { 
    this.loading = true;
  }

  ngOnInit() {
    this.firebaseDb.getProduct().subscribe(data =>{
      this.loading = false;
      this.productAll = data;
    },error => {
      console.log(error);
    })
    combineLatest(this.startObserve,this.endObserve).subscribe(data =>{
      this.fireFunction(data[0],data[1])
     
    })
  }
  fireFunction(start,end){
    this.afs.collection('marvel',ref => ref.limit(4).orderBy('stone')
    .startAt(start).endAt(end)).valueChanges()
    .subscribe(data=>{
      if(data.length > 0){
        
        var result = this.productAll.filter(function(o1){
          return data.some(function(o2){
              return o1['stone'] === o2['stone'];
          });
      })
        this.liveSearch = result;
      }else{
        this.liveSearch = [];
      }
      
})
  }
  search($event){
    let q = $event.target.value;
    if(q != ''){
      this.startAt.next(q);
      this.endAt.next(q+ '\uf8ff');
    }
  }

  addtoList(ls){
    var isInArray =this.product.find(function(el){ return el.id === ls.id }) !== undefined;
    if(!isInArray){
      this.product.push(ls);
    }
    this.searchData = '';
    this.liveSearch = [];
  }
  action(type,prodObject){
    this.operation = true;
    this.clearState();
    if(type=='ADD'){
      //add
      this.operationText = type;
      this.marvelChangeObj.stone ='';
      this.marvelChangeObj.description ='';
    }else if(type=='UPDATE'){
      //update
      this.operationText = type;
      this.marvelChangeObj = prodObject; 
    }else{
      this.firebaseDb.deleteProduct(prodObject);
      this.operation = false;
      this.liveSearch = [];
      let prod = this.product.filter(element =>{
        return element.id != prodObject.id
      });
      this.product = [];
      this.product = Object.assign([],prod);
    }
  }
  cancel(changeObject){
    this.operation = false;
  }
  update(changeObject,operationText){
    this.operation = false;
    this.clearState();
    if(operationText=='ADD'){
      this.firebaseDb.addProduct(changeObject)
    }else if(operationText=='UPDATE'){
      this.firebaseDb.updateProduct(changeObject)
    }
    
  }
  signOut(){
    this.firebaseDb.signOut();
  }
  clearState(){
    setTimeout(()=>{
      this.liveSearch = [];
      this.searchData = '';
    },500)
  }
  
}
