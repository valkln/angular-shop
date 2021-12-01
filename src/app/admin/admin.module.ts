import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddPageComponent } from './add-page/add-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthGuard } from '../shared/auth.guard';
import { QuillModule } from 'ngx-quill';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AlertModule } from '../shared/alert/alert.module';

@NgModule({
	imports: [
		AlertModule,
		QuillModule.forRoot(),
		MatInputModule,
		MatTableModule,
		MatSelectModule,
		MatCardModule,
		MatToolbarModule,
		MatButtonModule,
		ReactiveFormsModule,
		FormsModule,
		CommonModule,
		RouterModule.forChild([
			{
				path: '', component: AdminLayoutComponent, children: [
					{ path: '', redirectTo: '/admin/login', pathMatch: 'full' },
					{ path: 'login', component: LoginPageComponent },
					{ path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
					{ path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
					{ path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
					{ path: 'product/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
				]
			}
		])
	],
	exports: [RouterModule],
	declarations: [
		AdminLayoutComponent,
		LoginPageComponent,
		DashboardPageComponent,
		AddPageComponent,
		OrdersPageComponent,
		EditPageComponent
	]
})
export class AdminModule { }