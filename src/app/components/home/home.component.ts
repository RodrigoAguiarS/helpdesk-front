import { LiderService } from 'src/app/services/lider.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lideres?: number;
  constructor(
    private service: LiderService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.getQuantidadeLideres().subscribe((quantidade: number) => {
      this.lideres = quantidade;
      console.log(this.lideres)
    });
  }
}

