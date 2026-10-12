import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyId } from './verify-id';

describe('VerifyId', () => {
  let component: VerifyId;
  let fixture: ComponentFixture<VerifyId>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyId],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyId);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
