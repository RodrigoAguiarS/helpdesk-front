
import { formatDate } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { Venda } from "src/app/models/venda";
import { VendaService } from "src/app/services/venda.service";

@Component({
  selector: "app-venda-list",
  templateUrl: "./venda-list.component.html",
  styleUrls: ["./venda-list.component.css"],
})
export class VendaListComponent implements OnInit {

  ELEMENT_DATA: Venda[] = [];
  FILTERED_DATA: Venda[] = []

  clienteFilter = '';
  
  displayedColumns: string[] = ["id", "consumidor", "dataVenda", "itens", "valorTotal", "pagamento"];

  dataSource = new MatTableDataSource<Venda>(this.ELEMENT_DATA);

  constructor(
    private service: VendaService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.findAll();
    this.dataSource.filterPredicate = (data: Venda, filter: string) => {
      const formattedDate = formatDate(data.dataVenda, 'dd/MM/yyyy HH:mm:ss', 'en-US');
      return formattedDate.includes(filter);
    }
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Venda>(this.ELEMENT_DATA);
      console.log(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyCliente() {
    const clienteFilterValue = this.clienteFilter.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Venda, filter: string) => {
      const clienteMatch = data.cliente.nome.toLowerCase().includes(clienteFilterValue);
      return clienteMatch
    };
    this.dataSource.filter = "true"; // qualquer valor que não seja vazio
  }

  orderByStatus(status: any): void{
    let list: Venda[] = []
    this.ELEMENT_DATA.forEach(element => {
      if(element.pagamento == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Venda>(list);
    this.dataSource.paginator = this.paginator;
  }
}
