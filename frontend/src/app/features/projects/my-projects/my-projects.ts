import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/services/project';
import { AssignmentService } from '../../../core/services/assignment';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss'
})
export class MyProjectsComponent implements OnInit {
  projects: any[] = [];
  loading = true;
  error = '';
  success = '';

  constructor(
    private projectService: ProjectService,
    private assignmentService: AssignmentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.projectService.getMyProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar proyectos';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  markCompleted(projectId: number): void {
    if (!confirm('¿Marcar este proyecto como completado?')) return;
    this.assignmentService.markCompleted(projectId).subscribe({
      next: () => {
        this.success = 'Proyecto marcado como completado';
        this.loadProjects();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al completar proyecto';
        this.cdr.detectChanges();
      }
    });
  }

  getStatusLabel(status: string): string {
    const labels: any = {
      pending: 'Pendiente',
      in_progress: 'En Progreso',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  }
}
