import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductSerializer } from 'src/app/serializers/product-serializer';
import { Storage } from '@ionic/storage';
import { ProductService } from 'src/app/services/product.service';
import { CredentialSerializer } from 'src/app/serializers/credential-serializer';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  private product: ProductSerializer = new ProductSerializer();

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage,
    private productService: ProductService,
    private route: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.get();
  }

  async get() {
    const id = this.activatedRoute.snapshot.params["id"];
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.productService.get(credential, id)
      .subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          console.log(error);
        }
      )
  }

  async update() {
    const id = this.activatedRoute.snapshot.params["id"];
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.productService.update(credential, id, this.product)
      .subscribe(
        (response) => {
          this.route.navigate(['product-list']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async delete() {
    const alert =  await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to delete this data?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: async () => {
            const id = this.activatedRoute.snapshot.params['id'];
            const credential: CredentialSerializer = await this.storage.get('credential');
            this.productService.delete(credential, id)
              .subscribe(
                (response) => {
                  this.route.navigate(['product-list']);
                },
                (error) => {
                  console.log(error);
                }
              );
          }
        }
      ]
    });

    await alert.present();
  }

}
