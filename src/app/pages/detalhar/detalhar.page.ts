import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Serie } from 'src/app/models/serie';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SerieFirebaseService } from 'src/app/service/serie-firebase.service';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  serie: Serie;
  data: string;
  edicao: boolean = true;
  form_detalhar: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private serieFS: SerieFirebaseService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.serie = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.form_detalhar = this.formBuilder.group({
      nome: [this.serie.nome, [Validators.required]],
      autor: [this.serie.autor, [Validators.required]],
      episodio: [this.serie.episodio, [Validators.required]],
      genero: [this.serie.genero, [Validators.required]],
      sinopse: [this.serie.sinopse, [Validators.required]],
      temporada: [this.serie.temporada, [Validators.required]],
      plataforma: [this.serie.plataforma, [Validators.required]],
      downloadURL: [this.serie.downloadURL]
    });
  }
  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }
  get errorControl() {
    return this.form_detalhar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_detalhar.valid) {
      this.presentAlert('Catalogo', 'Erro', 'Todos os campos sao obrigatórios');
      return false;
    } else {
      this.editar();
    }
  }

  alterarEdicao() {
    if (this.edicao == true) {
      this.edicao = false;
    } else {
      this.edicao = true;
    }
  }

  editar() {
    if (this.imagem != undefined) {
      this.serieFS
      .modificarImagem(this.form_detalhar.value,this.serie.id, this.imagem)
        .then(() => {
          this.presentAlert("Catalogo", "Sucesso", "Serie Editada!");
          this.router.navigate(["/home"]);
        })
        .catch((error) => {
          this.presentAlert("Catalogo", "Erro", "Erro ao editar");
          console.log(error);
        })
    } else {
      this.serieFS.editarSerie(
        this.form_detalhar.value,
        this.serie.id)
        .then(() => {
          this.presentAlert("Catalogo", "Sucesso", "Serie Editada!");
          this.router.navigate(["/home"]);
        })
        .catch((error) => {
          this.presentAlert("Catalogo", "Erro", "Erro ao editar");
          console.log(error);
        })
    }
  }



  excluir() {
    this.presentAlertConfirm(
      'Catalogo',
      'Excluir Serie',
      'Você realmente deseja excluir a serie?',
    );
  }

  private excluirSerie() {
    this.serieFS.excluirSerie(this.serie)
      .then(() => {
        this.presentAlert("Catalogo", "Sucesso", "Serie Excluida!");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.presentAlert("Catalogo", "Erro", "Erro ao excluir");
        console.log(error);
      })
  }


  async presentAlert(
    header: string,
     subHeader: string, 
     message: string) {
    const alert = await this.alertController
    .create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertConfirm(
    header: string, 
    subHeader: string,
     message: string) {
    const alert = await this.alertController
    .create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.excluirSerie();
          },
        },
      ],
    });
    await alert.present();
  }

  irParaHome() {
    this.router.navigate(["/home"]);
  }
}