import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartListPage } from './cart-list.page';

describe('CartListPage', () => {
  let component: CartListPage;
  let fixture: ComponentFixture<CartListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
