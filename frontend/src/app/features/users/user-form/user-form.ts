import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserFormComponent implements OnInit {
  isEditing = false;
  userId: number | null = null;
  loading = false;
  error = '';
  success = '';

  user = {
    name: '',
    email: '',
    password: '',
    role_id: 2,
    is_active: 1
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEditing = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.user.name = data.name;
          this.user.email = data.email;
          this.user.role_id = data.role_id || 2;
          this.user.is_active = data.is_active ?? 1;
        },
        error: () => this.error = 'Error al cargar usuario'
      });
    }
  }

  save(): void {
    if (!this.user.name || !this.user.email) {
      this.error = 'Nombre y email son obligatorios';
      return;
    }

    if (!this.isEditing && !this.user.password) {
      this.error = 'La contraseña es obligatoria';
      return;
    }

    this.loading = true;
    this.error = '';

    const request = this.isEditing
      ? this.userService.updateUser(this.userId!, this.user)
      : this.userService.createUser(this.user);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.success = this.isEditing ? 'Usuario actualizado' : 'Usuario creado';
        setTimeout(() => this.router.navigate(['/users']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al guardar usuario';
      }
    });
  }
}
