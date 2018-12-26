import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EksekusiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eksekusi',
  templateUrl: 'eksekusi.html',
})
export class EksekusiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.Cek();
  }

  pilihan 			= 	 this.navParams.get('pilihan');
  path 				=    this.navParams.get('path');
  nama_file 		=    this.navParams.get('nama_file');
  eksekusi:string 	=	 '';
  file:string 		= 	 '';

  Cek() {
  	if (this.pilihan == 'salin') {
  		this.eksekusi      =     this.pilihan;
  		this.file 		   = 	 this.nama_file;
  	} else if (this.pilihan =='pindah') {
  		this.eksekusi 	   =     this.pilihan;
  		this.file 		   =     this.nama_file;
  	} else {
  		this.navCtrl.pop();
  	}
  }

}
