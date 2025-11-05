import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCrud } from './transaction-crud';

describe('TransactionCrud', () => {
  let component: TransactionCrud;
  let fixture: ComponentFixture<TransactionCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
