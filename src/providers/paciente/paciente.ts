import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { Paciente } from '../../models/paciente';

@Injectable()
export class PacienteProvider {

  ENTIDADE = '/pacientes';

  constructor(public http: HttpClient,
    public afd: AngularFireDatabase,
    public afs: AngularFirestore
    ) {
  }

  listar() { // realtime_db
    return this.afd.list(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  listarFS() { // firestore_db
    return this.afs.collection(this.ENTIDADE)
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data() })))
  }

  buscar(cidade: string) { // realtime_db
    return this.afd.list(this.ENTIDADE, ref => ref.orderByChild('cidade').equalTo(cidade))
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.key, value: changes.payload.val() })));
  }

  buscarFS(uf: string, cidade: string) { // firestore_db
    console.log(uf);
    console.log(cidade);

    return this.afs.collection(this.ENTIDADE,
        ref => ref
          .where('uf', '==', uf)
          .where('cidade', '==', cidade)
          .orderBy('nome')
      )
      .snapshotChanges()
      .map(item => item.map(changes => ({key: changes.payload.doc.id, value: changes.payload.doc.data() })))
  }


  inserir(paciente) { // realtime_db
    return this.afd.list(this.ENTIDADE).push(paciente);
  }

  inserirFS(paciente: Paciente) { // firestore_db

// Converte a entidade Paciente para um objeto json genérico
    const obj = JSON.parse(JSON.stringify(paciente));
    
    const id = this.afs.createId();
    return this.afs.doc(this.ENTIDADE + '/' + id).set(obj);
  }

  atualizar(id, paciente){
    return this.afd.object(this.ENTIDADE + '/' + id).update(paciente);

  }
  atualizarFS(id, paciente) { // firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).update(paciente);
  }

  remover(id){
    return this.afd.object(this.ENTIDADE + '/' + id).remove();
  }

  removerFS(id) { // firestore_db
    return this.afs.doc(this.ENTIDADE + '/' + id).delete();
  }


}
