import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectFormComponent implements OnInit {
  isEditing = false;
  projectId: number | null = null;
  loading = false;
  error = '';
  success = '';

  project = {
    title: '',
    description: '',
    status: 'pending',
    due_date: ''
  };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.isEditing = true;
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (data) => {
          this.project.title = data.title;
          this.project.description = data.description || '';
          this.project.status = data.status || 'pending';
          this.project.due_date = data.due_date ? data.due_date.substring(0, 10) : '';
        },
        error: () => this.error = 'Error al cargar proyecto'
      });
    }
  }

  save(): void {
    if (!this.project.title) {
      this.error = 'El título es obligatorio';
      return;
    }

    this.loading = true;
    this.error = '';

    const request = this.isEditing
      ? this.projectService.updateProject(this.projectId!, this.project)
      : this.projectService.createProject(this.project as any);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.success = this.isEditing ? 'Proyecto actualizado' : 'Proyecto creado';
        setTimeout(() => this.router.navigate(['/projects']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al guardar proyecto';
      }
    });
  }
}
