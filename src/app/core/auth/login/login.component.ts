import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loginForm: FormGroup;
  forgotPasswordLoader: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private authService:AuthService,private _snackbar:MatSnackBar) {
  }

  ngOnInit() {    
    this.setupForm();
  }

  setupForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  onLogin() {
    if (this.loginForm.invalid) {
      alert('access denied');
      return;
    }
    console.log()
    let postObj = {
      Username:this.loginForm.value?.email,
      Password:this.loginForm.value?.password
    }
      this.authService.getLoggedInUserDetails(postObj).subscribe(response => {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        
        this.router.navigate(["/dashboard"]);
      }, err => {
        console.log(err)
        if(err.status == 401){
          this._snackbar.open("Invalid credentials","Try Again")
        }
        else{
          this._snackbar.open("Error Occured","Try Again")
        }
        
      });
  }
  ForgotPassword(){

    if(this.loginForm.value?.email){
      let postObj = {
        Username:this.loginForm.value?.email,
        Password:this.loginForm.value?.password
      }
      this.forgotPasswordLoader = true;
      this.authService.forgotPassword(postObj).subscribe(response => {
        this.forgotPasswordLoader = false;
        if(response){
          this._snackbar.open("Please check your mail","Ok")
        }
        else{
          this._snackbar.open("Account Not Found","Ok")
        }
      },(err)=>{
        this._snackbar.open("Error Occured","Try again")
      })

    }
    
  }
}
