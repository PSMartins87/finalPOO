import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, } from '@angular/fire/compat/storage';
import { finalize, take } from 'rxjs/operators';
import { getStorage, ref, deleteObject, } from "firebase/storage";
import { Serie } from '../models/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieFirebaseService {
  private PATH: string = 'series';

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage) { }

  getSerie(id: string) {
    return this.angularFirestore
      .collection(this.PATH)
      .doc(id)
      .valueChanges();
  }

  getSeries() {
    return this.angularFirestore
      .collection(this.PATH)
      .snapshotChanges();
  }
  editarSerie(serie: Serie, id: string) {
    return this.angularFirestore
      .collection(this.PATH)
      .doc(id)
      .update({
        nome: serie.nome,
        autor: serie.autor,
        episodio: serie.episodio,
        genero: serie.genero,
        sinopse: serie.sinopse,
        temporada: serie.temporada,
        plataforma: serie.plataforma,
        downloadURL: serie.downloadURL,
      })
  }

  inserirSerie(serie: Serie, id: any) {
    return this.angularFirestore
      .collection(this.PATH)
      .doc(id.toString())
      .set({
        nome: serie.nome,
        autor: serie.autor,
        episodio: serie.episodio,
        genero: serie.genero,
        sinopse: serie.sinopse,
        temporada: serie.temporada,
        plataforma: serie.plataforma,
        downloadURL: serie.downloadURL,
      });
  }

  enviarImagem(imagem: any, serie: Serie) {
    let Id = new Date().getTime();
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado');
      return;
    }
    const path = `images/$Id}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp) => {
          serie.downloadURL = resp;
          this.inserirSerie(serie, Id);
        })
      })
    ).subscribe();
    return task;
  }
  //parecido com o de enviar imagem
  modificarImagem(serie: Serie, id: any, imagem: any) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado');
      return;
    }
    const path = `images/${id}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe((resp) => {
          serie.downloadURL = resp;
          this.editarSerie(serie, id);
        })
      })
    ).subscribe();
    return task;
  }

  excluirSerie(serie: Serie) {
    this.excluirImagem(serie);
    return this.angularFirestore
      .collection(this.PATH)
      .doc(serie.id)
      .delete();
  }

  excluirImagem(serie: Serie) {
    const path = `images/${serie.id}`;
    return this.angularFireStorage.ref(path).delete();
  }


}
