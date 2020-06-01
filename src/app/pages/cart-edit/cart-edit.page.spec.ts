import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartEditPage } from './cart-edit.page';

describe('CartEditPage', () => {
  let component: CartEditPage;
  let fixture: ComponentFixture<CartEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
