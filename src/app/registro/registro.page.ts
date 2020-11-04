import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparaValidator } from '../validators/comparacao-validator';
import { UsuariosService } from '../services/usuarios.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/Usuario';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public formRegistro: FormGroup;
  public mensagens_validacao = {
      nome: [

        {tipo: 'required', mensagem: ' O campo nome é obrigatório!'},
        {tipo: 'minlenght', mensagem: 'O nome deve ter pelo menos 3 caracteres'}
    
      ],
     cpf: [
      {tipo: 'required', mensagem: ' O campo e-mail é obrigatório!'},
      {tipo: 'minlenght', mensagem: 'O cpf deve ter pelo menos 11 caracteres'},
      {tipo: 'maxlenght', mensagem: 'O cpf deve ter no maximo 14 caracteres'},
      {tipo: 'invalido', mensagem: 'CPF INVALIDO'}
      ],
      data_nascimento: [
        {tipo: 'required', mensagem: ' O campo data é obrigatório!'}
      ],
      genero: [
        {tipo: 'required', mensagem: ' O campo genero é obrigatório!'}
      ],
      celular: [
        {tipo: 'maxlenght', mensagem: 'O número de celular deve ter no maximo 16 caracteres'}
      ],
    email: [
      {tipo: 'required', mensagem: ' O campo e-mail é obrigatório!'},
      {tipo: 'email' , mensagem: 'E-mail invalido'}
    ],
    senha: [
      {tipo: 'required', mensagem: 'O campo senha é obrigatório '},
      {tipo: 'minlenght', mensagem: 'A senha deve ter pelo menos 6 caracteres'}
    ],
   confirma_senha: [
      {tipo: 'required', mensagem: 'O campo senha é obrigatório '},
      {tipo: 'minlenght', mensagem: 'A senha deve ter pelo menos 6 caracteres'},
      {tipo: 'comparacao', mensagem: 'Deve ser igual a senha'}
   ]
  };





  constructor(private formBuilder: FormBuilder,
      private usuarioService: UsuariosService,
      public alertController: AlertController,
      public router: Router
    ) {
    this.formRegistro = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([
        Validators.required,
         Validators.minLength(11),
          Validators.maxLength(14),
          CpfValidator.cpfValido
        ])],
       
      data_nascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirma_senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validator: ComparaValidator('senha', 'confSenha')
    });



  }

   async ngOnInit() {
    await this.usuarioService.buscarTodos();
    console.log(this.usuarioService.listaUsuarios);
  }
    public async salvarFormulario() {
        if(this.formRegistro.valid) {
          let usuario = new Usuario();
          usuario.nome = this.formRegistro.value.nome;
          usuario.cpf = this.formRegistro.value.cpf;
          usuario.dataNascimento = new Date(this.formRegistro.value.dataNascimento);
          usuario.genero = this.formRegistro.value.genero;
          usuario.celular = this.formRegistro.value.celular;
          usuario.email = this.formRegistro.value.email;
          usuario.senha = this.formRegistro.value.senha;
          if( await this.usuarioService.salvar(usuario)){
            this.exibirAlerta('SUCESSO','USUARIO SALVO COM SUCESSO');
            this.router.navigateByUrl('/login');

          } else{
            this.exibirAlerta('ERRO','ERRO AO  SALVAR O USUARIO');
          }
        }else{
            this.exibirAlerta('ADVERTENCIA!','FORMULARIO INVALIDO<br>VERIFIQUE OS CAMPOS DO SEU FORMULARIO');
        }
    }

    async exibirAlerta( titulo: string, mensagem: string) {
      const alert = await this.alertController.create({
        
        header: titulo,
        message: mensagem,
        buttons: ['OK']
      });
  
      await alert.present();
    }
}
