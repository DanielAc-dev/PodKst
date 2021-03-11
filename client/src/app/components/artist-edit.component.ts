import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import {Artist} from '../models/artist';


@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtistEditComponent implements OnInit{
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){
        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');
        this.is_edit = true;
    }

    ngOnInit(){
        console.log('Artist-edit.component.ts cargado');
        //llamar al metodo del api para sacar un artista en base a su ID
        // Conseguir el listado de artistas
        this.getArtist();
    }
    
    getArtist(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if(!response.artist){
                        this._router.navigate(['/'])
                    }else{
                        this.artist = response.artist;
                    }
                },
                error =>{
                    var errorMessage = <any>error;
                    
                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        //this.alertMessage = body.message;
                        
                        console.log(error);
                    }
                }

            );
        });
    }

    onSubmit(){
        console.log(this.artist);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.editArtist(this.token,id, this.artist).subscribe(
                response => {

                    if(!response.artist){
                        this.alertMessage = 'Error en el servidor';
                    }else{
                        this.alertMessage = 'El artista se ha actualizado correctamente';
                        //this.artist = response.artist;
                        //this._router.navigate(['/editar-artista'],response.artist._id);
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
        });
    }

}