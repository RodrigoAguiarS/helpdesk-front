import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  ELEMENT_DATA: Produto[] = [];
  FILTERED_DATA: Produto[] = []
  displayedColumns: string[] = [
    "id",
    "nome",
    "preco",
    "categoria",
    "codigoBarras",
    "quantidadeEmEstoque",
    "quantidadeMinima",
    "quantidadeMaxima",
    "acoes",
  ];

  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);

  constructor(
    private service: ProdutoService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {}

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  orderByStatus(status: any): void{
    let list: Produto[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.categoria == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Produto>(list);
    this.dataSource.paginator = this.paginator;
  }
}
