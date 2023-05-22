import { Component, OnInit } from '@angular/core';
import { VsiriusFilter } from 'src/modules/_shared/_models/vsirius-filter';
import { ProductService } from 'src/modules/_shared/_services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listData: VsiriusFilter[] = [{
    "fieldName": "external_product_id_type",
    "labelName": "Product ID Type",
    "value": [
      "EAN",
      "GTIN",
      "UPC",
      "ASIN"
    ],
    "itemType": "bracelet"
  },
  {
    "fieldName": "target_gender",
    "labelName": "Target Gender",
    "value": [
      "Male",
      "Unisex",
      "Female"
    ],
    "itemType": "bracelet"
  },
  {
    "fieldName": "item_type",
    "labelName": "Category (item-type)",
    "value": [
      "link-bracelets",
      "anklets",
      "charm-bracelets",
      "link-charm-bracelets",
      "strand-bracelets",
      "tennis-bracelets",
      "stretch-bracelets",
      "bangle-bracelets",
      "wrap-bracelets",
      "identification-bracelets",
      "cuff-bracelets",
      "bracelets"
    ],
    "itemType": "bracelet"
  },
  {
    "fieldName": "metal_type",
    "labelName": "Metal Type",
    "value": [
      "Bronze",
      "Zinc Alloy",
      "Aluminum",
      "Brass",
      "Sterling Silver",
      "Tungsten Steel",
      "Rose Gold",
      "Yellow Gold",
      "Silver",
      "White Bronze",
      "Pewter",
      "Stainless Steel",
      "Tungsten",
      "Titanium",
      "White Gold",
      "Nickel",
      "Copper"
    ],
    "itemType": "bracelet"
  },
  {
    "fieldName": "material_type1",
    "labelName": "Material Type",
    "value": [
      "Nylon",
      "Metal",
      "Stone",
      "Porcelain",
      "Aluminum ",
      "Pewter",
      "Stainless Steel",
      "Resin",
      "Titanium",
      "White Gold",
      "Copper",
      "Polyvinyl Chloride",
      "Bronze",
      "Hemp",
      "Polyester",
      "Vinyl",
      "Silicone",
      "Rose Gold",
      "Acetate",
      "Suede",
      "Yellow Gold",
      "Silver",
      "Alloy Steel",
      "Polyurethane",
      "Platinum Alloy",
      "Faux Suede",
      "Acrylic",
      "Zinc Alloy",
      "Brass",
      "Glass",
      "Leather",
      "Iron",
      "Plastic",
      "Cotton",
      "Sterling Silver ",
      "Silk",
      "Platinum",
      "Rubber",
      "Faux Leather",
      "Fur",
      "Wood",
      "Zinc",
      "Zirconium",
      "Ceramic",
      "Paper",
      "German Silver",
      "Nickel",
      "Acrylonitrile Butadiene Styrene",
      "Copper Alloy",
      "Wool"
    ],
    "itemType": "bracelet"
  }];
  model: string = 'feed product type';
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.loadData();
  }
  
 
  loadData() {
    this.service.getDataFilter('bracelet').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
