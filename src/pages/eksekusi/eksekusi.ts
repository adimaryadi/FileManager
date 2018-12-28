import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';

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

  constructor(public navCtrl: NavController, public navParams: NavParams , private filestorage: File) {
  }

  ionViewDidLoad() {
  	this.storagelist();
  }

  pilihan 				= 	 this.navParams.get('pilihan');
  to:string 			= 	 this.navParams.get('to');
  path 					=    this.navParams.get('path');
  nama_file 			=    this.navParams.get('nama_file');
  eksekusi:string 		=	 '';
  file:string 			= 	 this.navParams.get('file');
  fullPath 		 		= 	 'file:///';
  datafolder:any 		= 	 [];
  tampungFolder:any 	= 	 [];
  folder:any 			= 	 [];
  selected:boolean 		=    true;
  listfolder:boolean 	= 	 false;

  storagelist() {
  	if (this.file == undefined) {
  		this.file 		= 		'';
  		this.selected 	= 		true;
  		this.listfolder =       false;
  	} else {
  		this.selected 	= 		false;
  		this.listfolder =       true;
  	}
  	this.filestorage.listDir(this.fullPath, this.file)
  		.then((dir) => {
  			this.datafolder    =   dir;
  			for (let i = 0; i < this.datafolder.length; i++) {
  					if (this.datafolder[i].isDirectory == true) {
  						let nama_folder   =  	this.datafolder[i].name;
  						let path 		  =     this.datafolder[i].fullPath;
  						let fullpath 	  =     this.datafolder[i].nativeURL;
  						this.tampungFolder=     {
  							nama:  		 nama_folder,
  							path:  	  	 path,
  							fullpath: 	 fullpath
  						}
  						this.folder.push(this.tampungFolder);
  					}
  			}
  			console.log(this.folder);
  		})
  		.catch((pusing) => {
  			console.log(pusing);
  		})
  }

  Penyimpanan(pilih) {
  	if (pilih == 'sdcard') {
  		let path 			= 	'storage/extSdCard/';
  		let nama_file		= 	this.nama_file;
  		let pilihan 		=   pilih;
  		let piliheksekusi   =   this.pilihan;
  		let pathdari 	 	=   this.path;
  		this.navCtrl.push(EksekusiPage, {
  			file: 		path,
  			nama_file:	nama_file,
  			to:    pilihan,
  			path:  pathdari,
  			pilihan: piliheksekusi
  		});
  	} else if (pilih == 'internal') {
  		let path  =   'storage/sdcard0/';
  		let nama_file		= 	this.nama_file;
  		let pilihan 		= 	pilih;
  		let piliheksekusi   =   this.pilihan;
  		let pathdari 	 	=   this.path;
  		this.navCtrl.push(EksekusiPage, {
  			file: path,
  			nama_file:	nama_file,
  			to:    pilihan,
  			path:  pathdari,
  			pilihan: piliheksekusi
  		});  		
  	}
  }

  EksekusiPerintah() {
  	let substring     =    this.path;
  	let path 		  =    substring.substr(1);
  	let darifolder 	  =    this.fullPath + path;
  	if (this.pilihan == 'salin') {
  		console.log(darifolder);
  	}
  }
}
