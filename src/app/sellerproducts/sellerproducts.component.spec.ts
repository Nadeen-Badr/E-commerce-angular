import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerproductsComponent } from './sellerproducts.component';

describe('SellerproductsComponent', () => {
  let component: SellerproductsComponent;
  let fixture: ComponentFixture<SellerproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerproductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
