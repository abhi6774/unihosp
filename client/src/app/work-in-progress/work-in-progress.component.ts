import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TopbarModule } from '../components/topbar/topbar.module';

@Component({
  selector: 'uni-work-in-progress',
  standalone: true,
  imports: [CommonModule, TopbarModule],
  templateUrl: './work-in-progress.component.html',
  styleUrl: './work-in-progress.component.scss'
})
export class WorkInProgressComponent {

}
