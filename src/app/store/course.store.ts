import { inject } from '@angular/core';
import { signalStore, withMethods, patchState } from '@ngrx/signals';
import { withEntities, removeEntity, setAllEntities } from '@ngrx/signals/entities';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

export const CourseStore = signalStore(
  { providedIn: 'root' },
  withEntities<Course>(),
  withMethods((store, svc = inject(CourseService)) => ({
    deleteCourse(id: number) {
      const previousSnapshot = store.entities();

      patchState(store, removeEntity(id));

      svc.delete(id)
        .pipe(
          catchError(() => {
            patchState(store, setAllEntities(previousSnapshot));
            patchState(store, { error: 'Cannot delete course: active student enrollments exist.' } as any);
            return EMPTY;
          }),
        )
        .subscribe();
    },
  })),
);
