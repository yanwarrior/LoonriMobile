import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptanceDetailPage } from './acceptance-detail.page';

describe('AcceptanceDetailPage', () => {
  let component: AcceptanceDetailPage;
  let fixture: ComponentFixture<AcceptanceDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptanceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
