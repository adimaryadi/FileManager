import { Component } from '@angular/core';
import { NavController , NavParams , ActionSheetController, AlertController , ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { EksekusiPage } from '../eksekusi/eksekusi';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private toastControl: ToastController , public navCtrl: NavController, private file: File , public navParams: NavParams , public actionsheet: ActionSheetController, private alert: AlertController) {
 
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
  list_file:any 		 	= 		[];
  file_entry:any 		    = 		[];
  buttonNewFolder:boolean 	= 		false;

  ListFile() {
  	if (this.path == undefined) {
  		this.path 				= 	 	'';
  	} else {
  		this.buttonNewFolder	= 	 	true;
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
  				} else if(this.file_list[i].isFile == true) {
  					let name_file 	 	= 	 this.file_list[i].name;
  					let path    		= 	 this.file_list[i].fullPath;
  					let fullPath 		= 	 this.file_list[i].nativeURL;
  					this.list_file 		= 	 {
  						nama_file:      name_file,
  						path_file: 	 	path,
  						fullpath: 	    fullPath
  					};
  					this.file_entry.push(this.list_file);
  				}
  			}
  			// console.log(this.file_list);
  		})
  		.catch((pusing) => {
  			console.log(pusing);
  		})
  }
 
  NextFolder(nama_folder_,nama_file) {
  	let stringPath 		= 	nama_folder_;
  	let substring 		= 	stringPath.substr(1);

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
  			nama_dari: nama_file,
  			path_next: this.folderPath
  		});
  	} else if (pilihan == 'pindah') {
  		this.navCtrl.push(EksekusiPage, {
  			pilihan: pilihan,
  			path: path,
  			nama_dari: nama_file,
  			path_next: this.folderPath
  		});  		
  	} else if (pilihan == 'hapus') {
  		let hapus		=   this.dirPath + this.path;
  		console.log(hapus);
  		this.file.checkDir(hapus, nama_file)
  			.then((cekdir) => {
  				if (cekdir == true) {
  					let pesan  =  this.alert.create({
  						title: 'Pesan !',
  						subTitle: 'Folder ' + nama_file + ' akan dihapus',
  						buttons: [
  							{
  								text: 'batal',
  								role: 'cancel'
  							},
  							{
  								text: 'Hapus',
  								handler: () => {
  									this.deleteDir(hapus, nama_file);
  								}
  							}
  						]
  					});
  					pesan.present();
  				}
  			})
  			.catch((pusing) => {
  				console.log(pusing);
  				this.navCtrl.pop();
  			})
  	} else {
  		let alert  =  this.alert.create({
  			title: 'pesan ?',
  			subTitle: 'Pusing Kesalahan Sistem',
  			buttons: ['OK']
  		});
  		alert.present();
  	}
  }

  NewFolder() {

  	let newfolderAlert 	 =    this.alert.create({
  		title: 'Membuat folder baru di ' + this.nama_file,
  		inputs: [
  			{
  				name: 'folderbaru',
  				placeholder: 'Folder Baru'
  			}
  		],
  		buttons: [
  			{
  				text: 'Batal',
  				role: 'cancel'
  			},
  			{
  				text: 'Buat',
  				handler: data => {
  					let folder_baru    =   data.folderbaru;
  					this.createFolder(folder_baru);
  				}
  			}
  		]
  	});
  	newfolderAlert.present();
  }
  
  deleteDir(hapus,nama) {
  	this.file.removeRecursively(hapus, nama)
  		.then((hapus) => {
  			if (hapus.success == true) {
  				this.navCtrl.pop();
  				let pesantoast 	    =    this.toastControl.create({
  					message: 'Folder ' + nama + ' Sudah dihapus',
  					duration: 3000,
  					position: 'bottom'
  				});
  				pesantoast.present();
  			} else {
  				console.log(hapus);
  			}
  		})
  		.catch((pusing) => {
  			let peringatan      =    this.alert.create({
  				title: 'Pemberitahuan !',
  				subTitle: nama + ' Tidak Bisa Dihapus',
  				buttons: ['OK']
  			});
  			peringatan.present();
  		})  	
  }
  
  createFolder(nama_folder) {

  	if (nama_folder.length == 0) {
  		let pesan = this.alert.create({
  			title: 'Pesan !',
  			subTitle: 'Nama Folder Tidak boleh kosong',
  			buttons: ['Dimengerti']
  		});
  		pesan.present();
  	} else {
  		let wherepath 		= 	 this.dirPath + this.path;
  		this.file.checkDir(wherepath, nama_folder)
  			.then((cekdir) => {
  				if (cekdir == true) {
  					let pesan = this.alert.create({
  						title: 'Pesan !',
  						subTitle: 'Nama folder ada',
  						buttons: ['Dimengerti']
  					});
  					pesan.present();
  				}
  			})
  			.catch((betul) => {
			  		this.file.createDir(wherepath, nama_folder, false)
			  			.then((dir) => {
			  				this.navCtrl.pop();
			  				if (dir.isDirectory == true) {
			  					let substring 	= 	dir.fullPath;
			  					let path 		= 	substring.substr(1);
			  					let nama 	 	= 	dir.name;
			  					this.navCtrl.push(HomePage, {
			  						folderPath: path,
			  						nama_file:  nama
			  					});
			  					let pesantoast 	=   this.toastControl.create({
			  						message: 'Folder ' + nama + ' Berhasil dibuat',
			  						duration: 3000,
			  						position: 'top'
			  					});
			  					pesantoast.present();
			  				}
			  			})
			  			.catch((pusing) => {
			  				let pesan  =  this.alert.create({
			  					title: 'Pesan !',
			  					subTitle: 'Gagal -_- !',
			  					buttons: ['OK']
			  				});

			  				pesan.present();
			  			}) 
  			})
  			console.log(wherepath);
  	}
  }
}
