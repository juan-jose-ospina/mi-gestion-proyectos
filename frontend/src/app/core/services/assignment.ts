import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private apiUrl = `${environment.apiUrl}/assignments`;

  constructor(private http: HttpClient) {}

  getAssignments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  assignProject(projectId: number, userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { project_id: projectId, user_id: userId });
  }

  markCompleted(projectId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/complete`, { project_id: projectId });
  }

  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDashboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard`);
  }
}
