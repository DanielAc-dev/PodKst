import { ImportResolver } from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import { User } from "../models/user";
import { Console } from 'console';

@Component ({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: String;
    public user:User;
    public identity;
    public token;
    public alertMessage;

    constructor(
        private _userService: UserService
    ){
    this.titulo = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;
    }

    ngOnInit(){
        console.log('user_edit.component.ts cargado')
    }
    onSubmit(){
        console.log(this.user);
        this._userService.updateUser(this.user).subscribe(
            response =>{
                this.user = response.user;

                if(!response.user){
                    this.alertMessage = 'El usuario no se ha actualizado';
                }else{
                    //this.user = response.user;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.getElementById("identity_name").innerHTML = this.user.name;

                    this.alertMessage = 'El usuario se ha actualizado correctamente';
                }
            },
            error =>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                  var body = JSON.parse(error._body);
                  this.alertMessage = body.message;
                 console.log(error);
                }
            }
        );
    }

}