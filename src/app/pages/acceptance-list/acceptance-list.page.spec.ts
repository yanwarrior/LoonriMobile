import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptanceListPage } from './acceptance-list.page';

describe('AcceptanceListPage', () => {
  let component: AcceptanceListPage;
  let fixture: ComponentFixture<AcceptanceListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptanceListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
