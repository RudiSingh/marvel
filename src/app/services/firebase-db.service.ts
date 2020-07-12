import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {
  productCollection: AngularFirestoreCollection<any>;
  productList : Observable<any>
  productCheckList : Observable<ProductType[]>;
  productDoc : AngularFirestoreDocument<any>
  constructor(private afs : AngularFirestore, private authFire : AngularFireAuth, private router : Router) { 
   this.productList = this.afs.collection('marvel').valueChanges();
   //let data : any;
   this.productCheckList = this.afs.collection('marvel').snapshotChanges().pipe(map(res =>{
    return res.map(a =>{
          let data = a.payload.doc.data() as ProductType
          data.id = a.payload.doc.id;
          return data;
        })
      }))
  }
  
  getProduct(){
    return this.productCheckList
  }
 
  addProduct(product: any){
    this.afs.collection('marvel').add(product);
  }
  deleteProduct(product: any){
    //this.productCheckList
    this.productDoc = this.afs.doc(`marvel/${product.id}`);
    this.productDoc.delete();
  }

  updateProduct(product: any){
    this.productDoc = this.afs.doc(`marvel/${product.id}`);
    this.productDoc.update(product);
  }

  signOut(){
    this.authFire.signOut().then(()=>{
      this.router.navigateByUrl('');
    }).catch(error=>{
      alert(error)
    })
  }
}

@Injectable({
  providedIn: 'root'
})

export class ProductType   {
  id?:string;
  stone?:string;
  description?:string;
}
