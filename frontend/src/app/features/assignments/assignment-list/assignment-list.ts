import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentService } from '../../../core/services/assignment';
import { UserService, User } from '../../../core/services/user';
import { ProjectService, Project } from '../../../core/services/project';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment-list.html',
  styleUrl: './assignment-list.scss'
})
export class AssignmentListComponent implements OnInit {
  assignments: any[] = [];
  users: User[] = [];
  projects: Project[] = [];
  loading = true;
  error = '';
  success = '';

  selectedUserId: number | null = null;
  selectedProjectId: number | null = null;

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.assignmentService.getAssignments().subscribe({
      next: (data) => {
        this.assignments = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar asignaciones';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.filter((u: any) => u.role === 'user');
        this.cdr.detectChanges();
      }
    });

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.cdr.detectChanges();
      }
    });
  }

  assign(): void {
    if (!this.selectedUserId || !this.selectedProjectId) {
      this.error = 'Selecciona un usuario y un proyecto';
      return;
    }

    this.error = '';
    this.assignmentService.assignProject(this.selectedProjectId, this.selectedUserId).subscribe({
      next: () => {
        this.success = 'Proyecto asignado correctamente';
        this.selectedUserId = null;
        this.selectedProjectId = null;
        this.loadAll();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al asignar proyecto';
        this.cdr.detectChanges();
      }
    });
  }

  deleteAssignment(id: number): void {
    if (!confirm('¿Eliminar esta asignación?')) return;
    this.assignmentService.deleteAssignment(id).subscribe({
      next: () => {
        this.success = 'Asignación eliminada';
        this.loadAll();
      },
      error: () => {
        this.error = 'Error al eliminar asignación';
        this.cdr.detectChanges();
      }
    });
  }
}
