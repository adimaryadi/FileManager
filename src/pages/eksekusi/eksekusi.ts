import { Component } from '@angular/core';
import { NavController, NavParams , AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams , private filestorage: File, private peringatan: AlertController) {
  }

  ionViewDidLoad() {
  	this.storagelist();
  }

  pilihan 				= 	 this.navParams.get('pilihan');
  to:string 			= 	 this.navParams.get('to');
  path 					=    this.navParams.get('path');
  nama_file 			=    this.navParams.get('nama_file');
  nama_dari 			= 	 this.navParams.get('nama_dari');
  path_next 		 	= 	 this.navParams.get('path_next');
  eksekusi:string 		=	 '';
  file:string 			= 	 this.navParams.get('file');
  fullPath 		 		= 	 'file:///';
  datafolder:any 		= 	 [];
  tampungFolder:any 	= 	 [];
  folder:any 			= 	 [];
  selected:boolean 		=    true;
  listfolder:boolean 	= 	 false;
  button_pilih:boolean  =    false;


  storagelist() {
  	if (this.file == undefined) {
  		this.file 		= 		'';
  		this.selected 	= 		true;
  		this.listfolder =       true;
  	} else {
  		this.selected 	= 		false;
  		this.listfolder =       true;
  	}

  	if (this.file == '') {
  		this.button_pilih     =    false;
  	} else {
  		this.button_pilih     =    true;
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
  	// if (pilih == 'sdcard') {
  	// 	let path 			= 	'storage/extSdCard/';
  	// 	let nama_file		= 	this.nama_file;
  	// 	let pilihan 		=   pilih;
  	// 	let piliheksekusi   =   this.pilihan;
  	// 	let pathdari 	 	=   this.path;
  	// 	this.navCtrl.push(EksekusiPage, {
  	// 		file: 		path,
  	// 		nama_file:	nama_file,
  	// 		to:    pilihan,
  	// 		path:  pathdari,
  	// 		pilihan: piliheksekusi
  	// 	});
  	// } else if (pilih == 'internal') {
  	// 	let path  =   'storage/sdcard0/';
  	// 	let nama_file		= 	this.nama_file;
  	// 	let pilihan 		= 	pilih;
  	// 	let piliheksekusi   =   this.pilihan;
  	// 	let pathdari 	 	=   this.path;
  	// 	this.navCtrl.push(EksekusiPage, {
  	// 		file: path,
  	// 		nama_file:	nama_file,
  	// 		to:    pilihan,
  	// 		path:  pathdari,
  	// 		pilihan: piliheksekusi
  	// 	});  		
  	// }

  	console.log(pilih);

  }

  EksekusiPerintah(path,nama,fullpath) {
  	let stringPath 		 	= 	path;
  	let substring 		    =   stringPath.substr(1);
  	this.navCtrl.push(EksekusiPage, {
  		file:      substring,
  		nama_file: nama,
  		pilihan:   this.pilihan,
  		path:      this.path,
  		to: 	   nama,
  		nama_dari: this.nama_dari,
  		path_next: this.path_next
  	});
  }

  pilih_path:string;

  PathEksekusi() {
  	if(this.pilih_path == undefined) {
	  let peringatan    = 	 this.peringatan.create({
	  	title: 'Pemberitahuan !',
	  	subTitle: 'Pilih lokasi folder yang di ' + this.pilihan,
	  	buttons: ['Dimengerti']
	  });
	  peringatan.present();
  	} else {
  		let fromcopy      =    this.fullPath + this.path_next;
  		let destcopy 	  =    this.fullPath + this.file;
		if (this.pilihan == 'salin') {
	  		this.filestorage.copyDir(fromcopy,this.nama_dari, destcopy,this.pilih_path)
	  			.then((copy) => {
	  				let peringatan       =    this.peringatan.create({
	  					title: 'Pemberitahuan !',
	  					subTitle: 'folder ' + this.nama_dari + ' Disalin ke ' + this.pilih_path + ' suksess',
	  					buttons: [
	  						{
	  							text: 'Selesai',
	  							handler: () => {
	  								this.navCtrl.popToRoot();
	  							}
	  						}
	  					],
	  					enableBackdropDismiss: false
	  				});
	  				peringatan.present();
	  			})
	  			.catch((pusing) => {
	  				let peringatan       =   this.peringatan.create({
	  					title: 'Pemberitahuan !',
	  					subTitle: 'Penyalinan Gagal :{ Tidak Di izinkan disalin di folder' + this.pilih_path,
	  					buttons: ['OK']
	  				});
	  				peringatan.present();
	  			})
	  	}  		
  	}
  }

  Pilih_path(nama_path) {
  	this.pilih_path    =    nama_path;
  }
}
