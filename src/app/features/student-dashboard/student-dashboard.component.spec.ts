import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { StudentDashboardComponent } from './student-dashboard.component';
import { CourseService } from '../../services/course.service';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;

  beforeEach(async () => {
    const mockCourseService = {
      getAll: vi.fn(() => of([])),
      getById: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [StudentDashboardComponent],
      providers: [
        provideRouter([]),
        { provide: CourseService, useValue: mockCourseService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has coursesResource with getAll() stream', () => {
    expect(component.coursesResource).toBeDefined();
  });

  it('tracks selected course on enrollment', () => {
    const mockCourse = {
      id: 1,
      title: 'Test Course',
      code: 'TST-001',
      maxCapacity: 25,
      enrollmentCount: 10,
    };

    component.handleEnroll(mockCourse);

    expect(component.selectedCourse()).toEqual(mockCourse);
  });
});


