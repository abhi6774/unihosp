import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopbarModule } from '../components/topbar/topbar.module';
import { PublicProfileService } from '../services/publicProfile.service';
import { HospitalDetials } from '../interfaces/publicProfile.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uni-hospital',
  standalone: true,
  imports: [TopbarModule, CommonModule],
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.scss'
})
export class HospitalComponent implements OnInit, OnDestroy {

  private publicProfileService: PublicProfileService = Inject(PublicProfileService);
  constructor(private activatedRoute: ActivatedRoute) { }

  subscription!: Subscription;

  hospitalId: string = '';

  hospital: HospitalDetials | null = null;

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      console.log(param['id']);
      if (param['id']) {
        this.hospitalId = param['id'];
        this.publicProfileService.getHospitalById(this.hospitalId).subscribe(hospital => {
          console.log(hospital);
          this.hospital = hospital;
        })
      }
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
