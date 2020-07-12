import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseAuthService } from '../services/firebase-auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { async } from 'rxjs/internal/scheduler/async';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers : [AngularFireAuth,FirebaseAuthService]
})
export class LoginComponent implements OnInit {
  details : any = {
    username : '',
    password :''
  }
  
  // form: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });
  // @Input() error: string | null;
  // @Output() submitEM = new EventEmitter();
  
  constructor(private router: Router ,private firebase: FirebaseAuthService , private authFire : AngularFireAuth , private auth : FirebaseAuthService) { }

  ngOnInit() {
    
  }


  submit() {
    // if (this.form.valid) {
    //   this.submitEM.emit(this.form.value);
    // }
    this.firebase.register(this.details.username,this.details.password);
  }
  onLogin(){
    this.firebase.login(this.details.username,this.details.password)
  }
  googleSignIn(){
    this.firebase.signInWithGoogle();
   // this.redirrect();
  }
  redirrect(){
    setTimeout(()=>{
      this.router.navigateByUrl('/product');
    },5000)
  }
  
}
