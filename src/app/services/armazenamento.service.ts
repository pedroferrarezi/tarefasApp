import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoService {

  constructor(private storage: Storage) { }

  public salvarDados(chave: string, dados:any) {
    if(chave.trim().length > 0 && dados) {
      return this.storage.set(chave,dados)
      .then(() => {
        console.log('dados armazenados com sucesso');
        return true;

      })
      .catch(erro => {
        console.log('erro ao gravar os dados', erro);
        return false;
      });
    } else {
      return false;
    } // fim do salvar dados
 

 }
    public PegarDados(chave:string) { 


      if( chave.trim().length > 0 ) {
        return this.storage.get(chave)
        .then(dadosArmazenados => {
          return dadosArmazenados;
        }) 
        .catch(erro => {
          console.log('erro ao buscar os dados', erro);
          return null;
        });
      } else {
        return null;
      }
  } //fim do salvar dados
  public removerDados(chave: string) {
    if(chave.trim().length > 0) {
      return this.storage.remove(chave)
      .then(() => {
      
        return true;

      })
      .catch(erro => {
    
        return false;
      });
    } else {
      return false;
  }
}
}

