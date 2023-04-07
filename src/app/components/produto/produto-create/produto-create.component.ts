import { Produto } from "src/app/models/produto";
import { Component, OnInit } from "@angular/core";
import { Categoria } from "src/app/models/categoria";
import { FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ProdutoService } from "src/app/services/produto.service";
import { ProdutoResposta } from "src/app/models/produtoResposta";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-produto-create",
  templateUrl: "./produto-create.component.html",
  styleUrls: ["./produto-create.component.css"],
})
export class ProdutoCreateComponent implements OnInit {

  camposAtivos: boolean = true;

  public produto: Produto = {
    nome: "",
    preco: 0,
    descricao: "",
    categoria: Categoria.ALIMENTOS,
    codigoBarras: "",
    estoque: {
      quantidadeEmEstoque: 0,
      quantidadeMinima: 0,
      quantidadeMaxima: 0,
    },
  };

  produtoExiste = false;

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  preco: FormControl = new FormControl(null, Validators.required);
  descricao: FormControl = new FormControl(null, Validators.required);
  categoria: FormControl = new FormControl(null, Validators.required);
  codigoBarras: FormControl = new FormControl(null, Validators.minLength(3));
  quantidadeEmEstoque: FormControl = new FormControl(null, Validators.required);
  quantidadeMinima: FormControl = new FormControl(null, Validators.required);
  quantidadeMaxima: FormControl = new FormControl(null, Validators.required);

  constructor(
    private http: HttpClient,
    private produtoService: ProdutoService,
    private toast:    ToastrService,
    private snackBar: MatSnackBar,
    private router:          Router,
    ) { }


  ngOnInit(): void {
    console.log('camposAtivos:', this.camposAtivos);
  }

  create(): void {
    this.produtoService.create(this.produto).subscribe(() => {
      console.log(this.produto)
      this.snackBar.open("Produto cadastrado com sucesso', 'Cadastro'", "", {
        duration: 3000,
      });
      this.router.navigate(['vendas/create'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validaCampos(): boolean {
    return this.nome.valid && this.codigoBarras.valid
     && this.preco.valid && this.quantidadeEmEstoque.valid && this.quantidadeMaxima.valid
     && this.quantidadeMinima.valid && this.quantidadeEmEstoque.valid && this.codigoBarras.valid
  }

  buscarProdutoPorCodigo(codigoBarras: string): void {
    if (!codigoBarras) return;
  
    this.http.get<ProdutoResposta>(`http://localhost:8080/api/produtos/produtos/${codigoBarras}`).subscribe(
      (produto) => {
        this.atualizarProduto(produto);
        this.camposAtivos = false;
        this.snackBar.open("Produto já cadastrado no banco, atualize suas informações!", "", {
          duration: 3000,
        });
      },
      (error) => {
        if (error.status === 404) {
          this.limparCampos();
          this.camposAtivos = true;
          this.snackBar.open("Nenhum produto encontrado', 'Produto não encontrado!", "", {
            duration: 3000,
          });
        } else {
           this.toast.error("Erro desconhecido")
        }
      }
    );
  }
  
  private atualizarProduto(produto: ProdutoResposta): void {
    this.produto.nome = produto.nome;
    this.produto.preco = produto.preco;
    this.produto.descricao = produto.descricao;
    this.produto.categoria = produto.categoria;
    this.produto.codigoBarras = produto.codigoBarras;
    this.produto.estoque.quantidadeEmEstoque = produto.estoque.quantidadeEmEstoque;
    this.produto.estoque.quantidadeMaxima = produto.estoque.quantidadeMaxima;
    this.produto.estoque.quantidadeMinima = produto.estoque.quantidadeMinima;
    this.produtoExiste = true;
  }
  
  private limparCampos(): void {
    this.nome.reset();
    this.preco.reset();
    this.descricao.reset();
    this.categoria.reset();
    this.quantidadeEmEstoque.reset();
    this.quantidadeMaxima.reset();
    this.quantidadeMinima.reset();
  }
}  

