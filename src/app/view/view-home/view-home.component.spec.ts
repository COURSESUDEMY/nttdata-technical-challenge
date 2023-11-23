import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHomeComponent } from './view-home.component';
import { ActivatedRoute } from '@angular/router';
import { ViewDataServiceComponent } from '../../component/view-data-service/view-data-service.component';
import { UpdateUserComponent } from '../../navigation/update-user/update-user.component';

describe('ViewHomeComponent', () => {
  let component: ViewHomeComponent;
  let fixture: ComponentFixture<ViewHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHomeComponent, ViewDataServiceComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
