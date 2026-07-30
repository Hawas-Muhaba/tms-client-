import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentFormComponent } from './enrollment-form';

describe('EnrollmentFormComponent', () => {
  let component: EnrollmentFormComponent;
  let fixture: ComponentFixture<EnrollmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the student ID validation error when submitting an empty form', () => {
    component.submit();
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('.error');
    expect(error?.textContent).toContain('Enter a valid Student ID');
  });

  it('logs the full payload on a valid submission', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    component.form.patchValue({
      studentId: 'STU-1234',
      courseId: '1',
      term: 'Fall 2026',
      notes: 'Need approval',
    });

    component.submit();
    fixture.detectChanges();

    expect(logSpy).toHaveBeenCalledWith('Enrollment payload:', expect.objectContaining({
      studentId: 'STU-1234',
      courseId: '1',
      notes: 'Need approval',
    }));
  });
});
