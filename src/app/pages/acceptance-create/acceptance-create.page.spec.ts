import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptanceCreatePage } from './acceptance-create.page';

describe('AcceptanceCreatePage', () => {
  let component: AcceptanceCreatePage;
  let fixture: ComponentFixture<AcceptanceCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptanceCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
