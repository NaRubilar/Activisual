import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestablecerpasswordPage } from './restablecerpassword.page';

describe('RestablecerpasswordPage', () => {
  let component: RestablecerpasswordPage;
  let fixture: ComponentFixture<RestablecerpasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestablecerpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
