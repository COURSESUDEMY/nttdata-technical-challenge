import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { ResponseUser } from '../core/interfaces/user';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const RESPONSE: ResponseUser = {
  from: 0,
  limit: 10,
  total: 1,
  user: [
    {
      email: 'johndoe@example.com',
      google: false,
      name: 'John Doe',
      rol: 'admin',
      status: true,
      statusName: 'Habilitado',
      uid: '123456789',
    },
    {
      email: 'johndoe1@example.com',
      google: false,
      name: 'John',
      rol: 'admin',
      status: false,
      statusName: 'Deshabilitado',
      uid: '123456784',
    },
  ],
};

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

const RESPONSE_ERROR = new HttpErrorResponse({
  status: 400,
  statusText: 'Bad Request',
  error: 'Error en el Servidor',
});

describe('DataService', () => {
  let dataService: DataService;

  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    httpController = TestBed.inject(HttpTestingController);
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should return  an User list User[] when getUser() is called with a successful HTTP response', () => {
    let result = undefined;
    dataService.getUser().subscribe((value) => (result = value));
    httpController
      .expectOne({
        method: 'GET',
        url: `http://localhost:3000/api/user`,
      })
      .flush(RESPONSE);
    expect(result).toEqual(dataService.maperData(RESPONSE));
  });

  it('should map the response data to User[] when getUser() is called with a successful HTTP response', () => {
    let result = undefined;
    dataService.getUser().subscribe((value) => (result = value));
    httpController
      .expectOne({
        method: 'GET',
        url: `http://localhost:3000/api/user`,
      })
      .flush(RESPONSE);
    expect(result).toEqual(RESPONSE_FORMAT);
  });

  it('should handle errors and return a throwError() when getUser() is called with an unsuccessful HTTP response', () => {
    jest.spyOn(dataService, 'getUser').mockReturnValueOnce(
      throwError(() => {
        throw new HttpErrorResponse({
          status: 400,
          statusText: 'Bad Request',
          error: 'Error en el Servidor',
        });
      })
    );

    dataService.getUser().subscribe(
      () => {},
      (error) => {
        expect(error).toEqual(RESPONSE_ERROR);
      }
    );
  });

  it('should handle and return a custom error message when getUser() is called with a 0 status error', () => {
    jest.spyOn(dataService, 'getUser').mockReturnValueOnce(
      throwError(() => {
        throw new HttpErrorResponse({
          status: 0,
          statusText: 'Bad Request',
          error: { message: 'Error en el Servidor' },
        });
      })
    );

    dataService.getUser().subscribe(
      () => {},
      (error) => {
        expect(error.message).toEqual('Error en el Servidor');
      }
    );
  });

  it('should handle and return a custom error message when getUser() is called with a 500 status error', () => {
    jest.spyOn(dataService, 'getUser').mockReturnValueOnce(
      throwError(() => {
        throw new HttpErrorResponse({
          status: 500,
          statusText: 'Bad Request',
          error: { message: 'Error en el Servidor' },
        });
      })
    );

    dataService.getUser().subscribe(
      () => {},
      (error) => {
        expect(error.message).toEqual('Error en el Servidor');
      }
    );
  });

  it('should handle and return a custom error message when getUser() is called with a 400 status error', () => {
    jest.spyOn(dataService, 'getUser').mockReturnValueOnce(
      throwError(() => {
        throw new HttpErrorResponse({
          status: 400,
          statusText: 'Bad Request',
          error: { message: 'Error en el Servidor' },
        });
      })
    );

    dataService.getUser().subscribe(
      () => {},
      (error) => {
        expect(error.message).toEqual('Error en el Servidor');
      }
    );
  });

  it('should return an Observable with an error message when receiving an error object with a valid status code', () => {
    const error = { status: 400, message: 'Bad Request' };
    const result = dataService._Error(error);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(
      (response) => {
        expect(response).toEqual(new Error('Error en el Servidor'));
      },
      (error) => {
        fail('Should not have thrown an error');
      }
    );
  });

  it('should return an Observable with an error message when receiving an error object with an invalid status code', () => {
    const error = { status: 100, message: 'Invalid Status Code' };
    const result = dataService._Error(error);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(
      (response) => {
        expect(response).toEqual(new Error('Error en el Servidor'));
      },
      (error) => {
        fail('Should not have thrown an error');
      }
    );
  });

  it('should return an Observable with an error message when receiving an error object with a status code of 0', () => {
    const error = { status: 0, message: 'Server Error' };
    const result = dataService._Error(error);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(
      (response) => {
        expect(response).toEqual(new Error('Error en el Servidor'));
      },
      (error) => {
        fail('Should not have thrown an error');
      }
    );
  });

  it('should return an Observable with an error message when receiving an error object with a status code of 4001', () => {
    const error = { status: 4001, message: 'Invalid Token' };
    const result = dataService._Error(error);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(
      (response) => {
        expect(response).toEqual(new Error('Token no es válido'));
      },
      (error) => {
        fail('Should not have thrown an error');
      }
    );
  });

  it('should return an Observable with an error message when receiving an error object with a status code of 404', () => {
    const error = { status: 404, message: 'Not Found' };
    const result = dataService._Error(error);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(
      (response) => {
        expect(response).toEqual(new Error('Error en el Servidor'));
      },
      (error) => {
        fail('Should not have thrown an error');
      }
    );
  });

  it('should return an Observable with an error message when receiving an error object with a status code of 500', () => {
    const error = { status: 500, message: 'Internal Server Error' };
    const result = dataService._Error(error);
    expect(result).toBeInstanceOf(Observable);
    result.subscribe(
      (response) => {
        expect(response).toEqual(new Error('Error en el Servidor'));
      },
      (error) => {
        fail('Should not have thrown an error');
      }
    );
  });
});
