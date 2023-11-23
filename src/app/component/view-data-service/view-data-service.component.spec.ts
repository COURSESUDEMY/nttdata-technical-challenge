import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataServiceComponent } from './view-data-service.component';
import { DataService } from '../../service/data.service';
import { of, throwError } from 'rxjs';

const RESPONSE_FORMAT: any[] = [
  {
    email: 'johndoe@example.com',
    name: 'John Doe',
    status: true,
    statusName: 'Habilitado',
  },
  {
    email: 'johndoe1@example.com',
    name: 'John',
    status: false,
    statusName: 'Deshabilitado',
  },
];

describe('ViewDataServiceComponent', () => {
  let dataService: DataService;

  let component: ViewDataServiceComponent;
  let fixture: ComponentFixture<ViewDataServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewDataServiceComponent],
    }).compileComponents();
  });

  beforeEach((done) => {
    fixture = TestBed.createComponent(ViewDataServiceComponent);
    dataService = TestBed.inject(DataService);

    component = fixture.componentInstance;
    component.userData = RESPONSE_FORMAT;
    fixture.detectChanges();

    done();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should successfully retrieve user data from the data service', () => {
    jest.spyOn(dataService, 'getUser');
    dataService.getUser().subscribe(() => of(RESPONSE_FORMAT));
    component.getUsers();
    setTimeout(() => {
      expect(component.userData).toEqual(RESPONSE_FORMAT);
      expect(component.userError).toEqual('');
    }, 100);
  });

  it('should display error message when data service returns an error', () => {
    const errorMessage = 'Error message';
    jest
      .spyOn(dataService, 'getUser')
      .mockReturnValue(throwError({ message: errorMessage }));
    setTimeout(() => {
      component.getUsers();
      expect(component.userError).toEqual(errorMessage);
      expect(component.userData).toEqual([]);
    }, 100);
  });
});
