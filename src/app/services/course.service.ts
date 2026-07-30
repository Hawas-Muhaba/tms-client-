import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Course } from "../models/course.model";

export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:5123/api/courses";

  getAll(page = 1, pageSize = 50) {
    return this.http
      .get<PagedResponse<Course>>(this.baseUrl, {
        params: { page: page.toString(), pageSize: pageSize.toString() },
      })
      .pipe(map((p) => p.items));
  }

  getById(id: string) {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }
}