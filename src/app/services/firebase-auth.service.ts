import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from 'rxjs/internal/scheduler/async';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(private router : Router , private authFire : AngularFireAuth) { 
    
  }
  async register(email:string,password:string): Promise<any>{
    try{
      const result = await this.authFire.createUserWithEmailAndPassword(email,password)
      if(result){
        this.router.navigateByUrl('/product');
      }
    }catch(error){
      alert(error.code.split('/')[1]);
    }
    
  }
   login(email:string,password:string){
    this.authFire.signInWithEmailAndPassword(email,password).then(userCredentials =>{
      if(userCredentials){
        this.router.navigateByUrl('/product');
      }
    }).catch(error =>{
      alert(error.code.split('/')[1]);
    })
    
  }
  signInWithGoogle(){                                                                                                                          
    this.router.navigateByUrl('/product');
    this.authFire.signInWithRedirect(new auth.GoogleAuthProvider()).then(() =>{
        this.router.navigateByUrl('/product');
    }).catch(error=>{
      this.router.navigateByUrl('');
      alert(error.error)
    })
  }
}
