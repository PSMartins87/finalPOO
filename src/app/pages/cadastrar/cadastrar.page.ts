import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SerieFirebaseService } from 'src/app/service/serie-firebase.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private loadingCtrl: LoadingController,
    private serieSF: SerieFirebaseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.data = new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      nome: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      episodio: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      sinopse: ["", [Validators.required, Validators.minLength(200)]],
      temporada: ["", [Validators.required]],
      plataforma: ["", [Validators.required]],
      imagem: ["", [Validators.required]]
    });
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert('Catalogo', 'Erro', 'Todos os campos sao obrigatórios');
      return false;
    } else {
      this.cadastrar();
    }
  }

  private cadastrar() {
    this.showLoading("Aguarde", 10000)
    this.serieSF
      .enviarImagem(this.imagem, this.form_cadastrar.value)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Catalogo', 'Sucesso', 'Dados validos!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        this.presentAlert("Catalogo", "Erro", "Erro ao cadastrar");
        console.log(error);
      })
  }

  async presentAlert(
    header: string, 
    subHeader: string,
     massage: string) {
    const alert = await this.alertController
    .create({
      header: header,
      subHeader: subHeader,
      message: massage,
      buttons: ['OK'],
    });

    await alert.present();
  }
  irParaHome() {
    this.router.navigate(["/home"]);
  }

  async showLoading(
    mensagem: string,
     duracao: number) {
    const loading = await this.loadingCtrl
    .create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }

}
