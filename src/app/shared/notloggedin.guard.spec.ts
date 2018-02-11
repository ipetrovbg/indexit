import { TestBed, async, inject } from '@angular/core/testing';

import { NotloggedinGuard } from './notloggedin.guard';

describe('NotloggedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotloggedinGuard]
    });
  });

  it('should ...', inject([NotloggedinGuard], (guard: NotloggedinGuard) => {
    expect(guard).toBeTruthy();
  }));
});
