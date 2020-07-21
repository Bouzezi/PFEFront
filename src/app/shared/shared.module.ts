import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatSidenavModule, MatCardModule, MatPaginatorModule, MatTableModule, MatButtonToggleModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SignUpComponent,
    SignInComponent
    
    
    
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,           
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
   
    
  ]
})
export class SharedModule { }
