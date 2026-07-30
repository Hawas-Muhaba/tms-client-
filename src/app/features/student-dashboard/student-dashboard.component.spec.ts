import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { StudentDashboardComponent } from './student-dashboard.component';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders four catalog cards and disables the full course enroll button', () => {
    const cards = Array.from(
      fixture.nativeElement.querySelectorAll('tms-course-card') as NodeListOf<Element>
    );
    expect(cards.length).toBe(4);

    const fullCourseCard = cards.find((card) =>
      card.textContent?.includes('Angular UI Lab')
    );
    const fullCourseButton = fullCourseCard?.querySelector('button') as
      | HTMLButtonElement
      | null;

    expect(fullCourseButton?.disabled).toBe(true);
  });

  it('updates the last enrollment request when a course is selected', () => {
    const firstEnrollButton = Array.from(
      fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
    ).find(
      (button) => button.textContent?.includes('Enroll') && !button.disabled
    );

    firstEnrollButton?.click();
    fixture.detectChanges();

    const status = fixture.nativeElement.querySelector('.selection-hint');
    expect(status?.textContent).toContain('Last enrollment request');
    expect(status?.textContent).toContain('Advanced Java Services');
  });

  it('shows the empty state when no courses are available', () => {
    component.availableCourses.set([]);
    fixture.detectChanges();

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState?.textContent).toContain('No courses are available');
  });
});
