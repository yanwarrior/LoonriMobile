import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EtalasePage } from './etalase.page';

describe('EtalasePage', () => {
  let component: EtalasePage;
  let fixture: ComponentFixture<EtalasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtalasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EtalasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
