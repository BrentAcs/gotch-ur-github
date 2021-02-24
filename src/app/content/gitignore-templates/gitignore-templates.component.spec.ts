import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitignoreTemplatesComponent } from './gitignore-templates.component';

describe('GitignoreTemplatesComponent', () => {
  let component: GitignoreTemplatesComponent;
  let fixture: ComponentFixture<GitignoreTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitignoreTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitignoreTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
