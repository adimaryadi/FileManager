import { Component } from '@angular/core';
import { NavController , NavParams , ActionSheetController, AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { EksekusiPage } from '../eksekusi/eksekusi';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private file: File , public navParams: NavParams , public actionsheet: ActionSheetController, private alert: AlertController) {
 
  }

  ionViewDidLoad() {
  	this.ListFile();
  	
  }
  folderPath:string 	 	= 		this.navParams.get('folderPath');
  nama_file					=		this.navParams.get('nama_file');
  file_list:any 			=  		[];
  list:any 					= 	 	[];
  folder:any 				= 		[];
  path:string 			 	= 	    this.folderPath;
  dirPath:string 			= 		'file:///';

  ListFile() {
  	if (this.path == undefined) {
  		this.path 			= 	 	'';
  	}
  	this.file.listDir(this.dirPath , this.path)
  		.then((file) => {
  			this.file_list   	= 	 file;
  			for (let i = 0; i < this.file_list.length; i++) {

  				if (this.file_list[i].isDirectory == true) {
  					let name 			=    this.file_list[i].name;
  					let path 			= 	 this.file_list[i].fullPath;
  					let fullpath		=    this.file_list[i].nativeURL;
  					this.list   =    {
  						nama_file:   name,
  						path: 	     path,
  						storage:     fullpath
  					}
  					this.folder.push(this.list);
  				}
  			}
  			console.log(this.path);
  		})
  		.catch((pusing) => {
  			console.log(pusing);
  		})
  }

  NextFolder(nama_folder_,nama_file) {
  	let stringPath 		= 	nama_folder_;
  	let substring 		= 	stringPath.substr(1);
  	console.log(substring);
  	this.navCtrl.push(HomePage, {
  		folderPath:    substring,
  		nama_file:	   nama_file
  	});

  }

  // pilihan 
  pilihan(path,nama_file) {
    const action = this.actionsheet.create({
  		title: 'Pilih ' + nama_file,
  		buttons: [
  			{
  				text: 'Salin',
  				handler: () => {
  					let pilihan   =   'salin';
  					this.eksekusi(pilihan , path , nama_file);
  				}
  			},
  			{
  				text: 'Pindahkan',
  				handler: () => {
  					let pilihan   =   'pindah';
  					this.eksekusi(pilihan, path , nama_file);
  				}
  			},
  			{
  				text: 'Hapus',
  				handler: () => {
  					let pilihan   =   'hapus';
  					this.eksekusi(pilihan, path, nama_file);
  				}
  			}
  		]
  	});
    action.present();
  }

  eksekusi(pilihan, path, nama_file) {
  	if (pilihan == 'salin') {
  		this.navCtrl.push(EksekusiPage, {
  			pilihan: pilihan,
  			path: path,
  			nama_file: nama_file
  		});
  	} else if (pilihan == 'pindah') {
  		this.navCtrl.push(EksekusiPage, {
  			pilihan: pilihan,
  			path: path,
  			nama_file: nama_file
  		});  		
  	} else if (pilihan == 'hapus') {
  		console.log('hapus');
  	} else {
  		let alert  =  this.alert.create({
  			title: 'pesan ?',
  			subTitle: 'Pusing Kesalahan Sistem',
  			buttons: ['OK']
  		});
  		alert.present();
  	}

  }
}
