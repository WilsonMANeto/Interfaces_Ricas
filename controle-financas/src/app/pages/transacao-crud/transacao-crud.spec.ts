import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacaoCrud } from './transacao-crud';

describe('TransacaoCrud', () => {
  let component: TransacaoCrud;
  let fixture: ComponentFixture<TransacaoCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacaoCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacaoCrud);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
