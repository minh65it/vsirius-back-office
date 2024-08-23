import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FilterService } from 'primeng/api';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';
import { Router } from '@angular/router';
import { SearchParams, VsiriusFilter } from 'src/modules/_shared/_models/vsirius-filter';
import { NgxNotiflixService } from 'src/modules/_shared/_services/ngx-notiflix.service';
import { Product } from 'src/modules/_shared/_models/product';
import { ProductService } from 'src/modules/_shared/_services/products/product.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { VsiriusHomeProduct } from 'src/modules/_shared/_models/vsiriusHomeProduct';
import { ProductHomeService } from 'src/modules/_shared/_services/products/product-home.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  listProducts: Product[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];
  customFilter = 'product-custom';
  cols: any[];
  selectedColumnsInitial: any[] = [
    { field: 'main_image_url', header: 'main_image_url' },
    { field: 'feed_product_type', header: 'feed_product_type' },
    { field: 'brand_name', header: 'brand_name' },
    { field: 'item_type', header: 'item_type' },
    { field: 'metal_type', header: 'metal_type' }
  ];
  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  filterParam: VsiriusFilter[] = [];
  searchParams: SearchParams = <SearchParams>{};
  listChoosePagination = [
    {
      key: 10,
      value: '10 Page'
    },
    {
      key: 50,
      value: '50 Page'
    },
    {
      key: 100,
      value: '100 Page'
    },
    {
      key: 200,
      value: '200 Page'
    }
  ];
  numberPage = 10;
  listDataFilter: VsiriusFilter[] = [];
  listProductType: any[] = [];
  listVsiriusFilter: VsiriusFilter[] = [];
  listItemType: any[] = [];
  listMetalType: any[] = [];
  productType: string = 'Product Type';
  item_type: string = '';
  metal_type: string = '';
  item_typeList: string[] = [];
  metal_typeList: string[] = [];
  productTypeFilter: VsiriusFilter = <VsiriusFilter>{};
  itemTypeFilterParam: VsiriusFilter = <VsiriusFilter>{
  };
  metalTypeFilterParam: VsiriusFilter = <VsiriusFilter>{
  }
  isShowSelect: boolean = true;
  @ViewChild('modalAdd', { static: false }) modalAdd?: ModalDirective;
  productHomeModel: VsiriusHomeProduct = {
    isLatest: false,
    isPopular: false,
    item_sku: ''
  } as VsiriusHomeProduct;
  listProductsHome: VsiriusHomeProduct[] = [];
  subscription = Subscription.EMPTY;
  constructor(private filterService: FilterService,
    private service: ProductService,
    private productHomeService: ProductHomeService,
    private router: Router,
    private notiflix: NgxNotiflixService) {

  }
  ngOnInit() {
    this.getFilterSearch();
    this.generateTable();
    this.registerFilter();
    this.loadFilter();
    this.loadData();
    this.loadListProductInHome();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  registerFilter() {
    this.filterService.register(
      this.customFilter,
      (value: string, filter: string): boolean => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }
        return value.toString() === filter.toString();
      }
    );
  }

  generateTable() {
    type ProductFields = keyof Product;
    let product = <Product>{
      feed_product_type: '',
      item_sku: '',
      brand_name: '',
      external_product_id: '',
      external_product_id_type: '',
      item_name: '',
      item_length_numeric: '',
      item_length_numeric_unit_of_measure: '',
      main_image_url: '',
      target_gender: '',
      quantity: '',
      standard_price: '',
      item_type: '',
      metal_type: '',
      material_type1: '',
      material_type2: '',
      material_type3: '',
      material_type4: '',
      material_type5: '',
      department_name1: '',
      department_name2: '',
      department_name3: '',
      department_name4: '',
      department_name5: '',
      gem_type1: '',
      gem_type2: '',
      gem_type3: '',
      color_map: '',
      size_name: '',
      age_range_description: '',
      manufacturer: '',
      part_number: '',
      model: '',
      watch_movement_type: '',
      target_audience_keywords1: '',
      target_audience_keywords2: '',
      target_audience_keywords3: '',
      target_audience_keywords4: '',
      target_audience_keywords5: '',
      display_type: '',
      product_description: '',
      model_name: '',
      bullet_point1: '',
      bullet_point2: '',
      bullet_point3: '',
      bullet_point4: '',
      bullet_point5: '',
      bullet_point6: '',
      bullet_point7: '',
      bullet_point8: '',
      bullet_point9: '',
      bullet_point10: '',
      item_type_name: '',
      number_of_boxes: '',
      item_length_unit_of_measure: '',
      item_height: '',
      item_length: '',
      item_width: '',
      item_width_unit_of_measure: '',
      item_height_unit_of_measure: '',
      cpsia_cautionary_statement1: '',
      cpsia_cautionary_statement2: '',
      cpsia_cautionary_statement3: '',
      cpsia_cautionary_statement4: '',
      country_of_origin: '',
      warranty_description: '',
      condition_type: '',
      currency: '',
      number_of_items: '',
      is_expiration_dated_product: '',
      setting_type: '',
      color_name: '',
      ring_size: '',
      depth_front_to_back: '',
      depth_front_to_back_unit_of_measure: '',
      depth_width_side_to_side: '',
      depth_width_side_to_side_unit_of_measure: '',
      depth_height_floor_to_top: '',
      depth_height_floor_to_top_unit_of_measure: '',
      package_height: '',
      package_width: '',
      package_length: '',
      package_length_unit_of_measure: '',
      package_weight: '',
      package_weight_unit_of_measure: '',
      package_height_unit_of_measure: '',
      package_width_unit_of_measure: '',
      supplier_declared_dg_hz_regulation1: '',
      supplier_declared_dg_hz_regulation2: '',
      supplier_declared_dg_hz_regulation3: '',
      supplier_declared_dg_hz_regulation4: '',
      supplier_declared_dg_hz_regulation5: '',
      supplier_declared_material_regulation1: '',
      supplier_declared_material_regulation2: '',
      supplier_declared_material_regulation3: '',
      lifecycle_supply_type: '',
      map_price: '',
      style_name: '',
      unit_count: '',
      unit_count_type: '',
      closure_type: '',
      care_instructions: '',
      fabric_type1: '',
      fabric_type2: '',
      fabric_type3: '',
      fabric_type4: '',
      fabric_type5: '',
      fabric_type6: '',
      fabric_type7: '',
      fabric_type8: '',
      fabric_type9: '',
      fabric_type10: '',
      import_designation: '',
      generic_keywords: '',
      outer_material_type1: '',
      outer_material_type2: '',
      outer_material_type3: '',
      outer_material_type4: '',
      outer_material_type5: '',
      material_composition: '',
      size_map: '',
      other_image_url1: '',
      other_image_url2: '',
      other_image_url3: '',
      other_image_url4: '',
      other_image_url5: '',
      other_image_url6: '',
      other_image_url7: '',
      other_image_url8: '',
      swatch_image_url: '',
      pt8_image_url: '',
      pt7_image_url: '',
      pt5_image_url: '',
      pt4_image_url: '',
      pt3_image_url: '',
      pt2_image_url: '',
      pt6_image_url: '',
      pt1_image_url: '',
      relationship_type: '',
      variation_theme: '',
      package_level: '',
      parent_sku: '',
      package_contains_quantity: '',
      package_contains_identifier: '',
      parent_child: '',
      update_delete: '',
      certificate_number1: '',
      certificate_number2: '',
      certificate_number3: '',
      certificate_number4: '',
      certificate_number5: '',
      certificate_number6: '',
      certificate_number7: '',
      certificate_number8: '',
      certificate_number9: '',
      grade_rating: '',
      certificate_type1: '',
      certificate_type2: '',
      certificate_type3: '',
      certificate_type4: '',
      certificate_type5: '',
      certificate_type6: '',
      certificate_type7: '',
      certificate_type8: '',
      certificate_type9: '',
      model_year: '',
      inner_material_type: '',
      gtin_exemption_reason: '',
      production_method: '',
      stone_color1: '',
      stone_color2: '',
      stone_color3: '',
      metals_metal_weight_unit_of_measure: '',
      stones_color: '',
      occasion_type1: '',
      occasion_type2: '',
      occasion_type3: '',
      occasion_type4: '',
      occasion_type5: '',
      clasp_type: '',
      stones_id: '',
      stones_creation_method: '',
      athlete: '',
      team_name: '',
      stone_shape1: '',
      stone_shape2: '',
      stone_shape3: '',
      stone_clarity1: '',
      stone_clarity2: '',
      stone_clarity3: '',
      collection_name: '',
      metals_metal_weight: '',
      metals_metal_type: '',
      stones_type: '',
      stones_clarity: '',
      stones_number_of_stones: '',
      stones_treatment_method: '',
      fur_description: '',
      metals_id: '',
      initial_character: '',
      metals_metal_stamp: '',
      stones_shape: '',
      chain_length_unit: '',
      stones_cut: '',
      stone_cut1: '',
      stone_cut2: '',
      stone_cut3: '',
      league_name: '',
      thesaurus_subject_keywords1: '',
      thesaurus_subject_keywords2: '',
      thesaurus_subject_keywords3: '',
      thesaurus_subject_keywords4: '',
      thesaurus_subject_keywords5: '',
      chain_length_derived: '',
      chain_type: '',
      item_booking_date: '',
      drop_length_unit: '',
      back_finding: '',
      drop_length: '',
      is_autographed: '',
      sport_type1: '',
      sport_type2: '',
      sport_type3: '',
      seasons1: '',
      seasons2: '',
      seasons3: '',
      seasons4: '',
      lifestyle: '',
      fit_type1: '',
      fit_type2: '',
      fit_type3: '',
      fit_type4: '',
      fit_type5: '',
      weave_type: '',
      theme: '',
      special_size_type: '',
      thesaurus_attribute_keywords1: '',
      thesaurus_attribute_keywords2: '',
      thesaurus_attribute_keywords3: '',
      thesaurus_attribute_keywords4: '',
      thesaurus_attribute_keywords5: '',
      catalog_number: '',
      specific_uses_keywords1: '',
      specific_uses_keywords2: '',
      specific_uses_keywords3: '',
      specific_uses_keywords4: '',
      specific_uses_keywords5: '',
      band_material_type: '',
      case_thickness: '',
      band_color: '',
      case_material_type: '',
      water_resistance_depth: '',
      water_resistance_depth_unit_of_measure: '',
      platinum_keywords1: '',
      platinum_keywords2: '',
      platinum_keywords3: '',
      platinum_keywords4: '',
      platinum_keywords5: '',
      special_features1: '',
      special_features2: '',
      special_features3: '',
      special_features4: '',
      special_features5: '',
      band_length: '',
      operating_system: '',
      case_thickness_unit_of_measure: '',
      supported_application: '',
      target_audience_base1: '',
      target_audience_base2: '',
      target_audience_base3: '',
      target_audience_base4: '',
      target_audience_base5: '',
      band_length_unit: '',
      water_resistance_level: '',
      directions: '',
      paint_type: '',
      number_of_pieces: '',
      is_assembly_required: '',
      included_components1: '',
      included_components2: '',
      included_components3: '',
      included_components4: '',
      included_components5: '',
      is_resizable: '',
      stone_creation_method1: '',
      stone_creation_method2: '',
      stone_creation_method3: '',
      stone_treatment_method1: '',
      stone_treatment_method2: '',
      stone_treatment_method3: '',
      gauge_derived: '',
      lining_description: '',
      number_of_compartments: '',
      number_of_wheels: '',
      pattern_name: '',
      wheel_type: '',
      band_thickness: '',
      band_thickness_unit_of_measure: '',
      horsepower: '',
      horsepower_unit_of_measure: '',
      power_source_type: '',
      voltage_unit_of_measure: '',
      controller_type: '',
      maximum_operating_pressure: '',
      maximum_operating_pressure_unit_of_measure: '',
      handle_location: '',
      light_source_type: '',
      brightness_unit_of_measure: '',
      speed_unit_of_measure: '',
      item_torque: '',
      item_torque_unit_of_measure: '',
      insulation_resistance_unit_of_measure: '',
      mounting_type: '',
      number_of_teeth: '',
      oem_equivalent_part_number: '',
      recommended_uses_for_product: '',
      shank_type: '',
      number_of_drawers: '',
      belt_style: '',
      embellishment_feature1: '',
      embellishment_feature2: '',
      embellishment_feature3: '',
      embellishment_feature4: '',
      embellishment_feature5: '',
      style_keywords1: '',
      style_keywords2: '',
      style_keywords3: '',
      compatible_devices: '',
      front_style: '',
      country_as_labeled: '',
      neck_style: '',
      pattern_type: '',
      pocket_description: '',
      shaft_style_type: '',
      pearl_type: '',
      legal_compliance_certification_certifying_authority_name: '',
      pearl_uniformity: '',
      pearl_shape: '',
      pearl_surface_blemishes: '',
      pearl_lustre: '',
      legal_compliance_certification_geographic_jurisdiction: '',
      flash_point_unit_of_measure: '',
      pearl_stringing_method: '',
      pearl_minimum_color: '',
      inscription: '',
      number_of_pearls: '',
      number_of_stones: '',
      duration_unit_of_measure: '',
      subject_character: '',
      duration: '',
      sub_brand_name: '',
      sleeve_type: '',
      fabric_wash: '',
      designer: '',
      band_size: '',
      dial_color: '',
      bezel_material_type: '',
      bezel_function: '',
      dial_window_material_type: '',
      calendar_type: '',
      resale_type: '',
      authenticated_by: '',
      finish_type1: '',
      finish_type2: '',
      fc_shelf_life_unit_of_measure: '',
      ring_sizing_lower_range: '',
      ring_sizing_upper_range: '',
      golf_club_flex: '',
      connectivity_protocol: '',
      item_pitch_unit_of_measure: '',
      energy_guide_cost_disclosure: '',
      is_oem_authorized: '',
      energy_guide_annual_operating_cost: '',
      belt_width_unit_of_measure: '',
      belt_width_string: '',
      opacity_unit_of_measure: '',
      map_policy: '',
      belt_width_derived: '',
      index_suppressed: '',
      leg_style: '',
      opacity: '',
      strap_type: '',
      underwire_type: '',
      item_display_weight: '',
      total_diamond_weight: '',
      item_display_diameter: '',
      stone_weight1: '',
      stone_weight2: '',
      stone_weight3: '',
      stone_weight_unit_of_measure1: '',
      stone_weight_unit_of_measure2: '',
      stone_weight_unit_of_measure3: '',
      total_gem_weight: '',
      size_per_pearl: '',
      item_display_diameter_unit_of_measure: '',
      item_display_length: '',
      item_display_length_unit_of_measure: '',
      total_gem_weight_unit_of_measure: '',
      item_display_weight_unit_of_measure: '',
      total_diamond_weight_unit_of_measure: '',
      band_width: '',
      band_width_unit_of_measure: '',
      case_diameter: '',
      case_diameter_unit_of_measure: '',
      item_shape: '',
      website_shipping_weight: '',
      website_shipping_weight_unit_of_measure: '',
      maximum_size: '',
      maximum_size_unit_of_measure: '',
      line_size: '',
      line_size_unit_of_measure: '',
      paper_size: '',
      paper_size_unit_of_measure: '',
      item_display_height: '',
      item_display_width: '',
      stone_dimensions_unit_of_measure1: '',
      stone_dimensions_unit_of_measure2: '',
      stone_dimensions_unit_of_measure3: '',
      item_display_height_unit_of_measure: '',
      item_display_width_unit_of_measure: '',
      total_metal_weight: '',
      total_metal_weight_unit_of_measure: '',
      stone_width_unit_of_measure1: '',
      stone_width_unit_of_measure2: '',
      stone_width_unit_of_measure3: '',
      stone_width1: '',
      stone_width2: '',
      stone_width3: '',
      measurement_system: '',
      item_diameter_derived: '',
      item_diameter_unit_of_measure: '',
      maximum_weight_recommendation_unit_of_measure: '',
      maximum_weight_recommendation: '',
      stone_length1: '',
      stone_length2: '',
      stone_length3: '',
      stone_length_unit_of_measure1: '',
      stone_length_unit_of_measure2: '',
      stone_length_unit_of_measure3: '',
      stone_height1: '',
      stone_height2: '',
      stone_height3: '',
      item_thickness_unit_of_measure: '',
      item_thickness_derived: '',
      band_size_num: '',
      band_size_num_unit_of_measure: '',
      leg_diameter: '',
      leg_diameter_unit_of_measure: '',
      neck_size: '',
      neck_size_unit_of_measure: '',
      shoe_width: '',
      waist_size: '',
      waist_size_unit_of_measure: '',
      shoe_width_unit_of_measure: '',
      fulfillment_center_id: '',
      regulation_type1: '',
      regulation_type2: '',
      regulation_type3: '',
      regulation_type4: '',
      regulation_type5: '',
      regulatory_compliance_certification_value1: '',
      regulatory_compliance_certification_value2: '',
      regulatory_compliance_certification_value3: '',
      regulatory_compliance_certification_value4: '',
      regulatory_compliance_certification_value5: '',
      batteries_required: '',
      are_batteries_included: '',
      battery_cell_composition: '',
      battery_type1: '',
      battery_type2: '',
      battery_type3: '',
      number_of_batteries1: '',
      number_of_batteries2: '',
      number_of_batteries3: '',
      battery_weight: '',
      battery_weight_unit_of_measure: '',
      number_of_lithium_metal_cells: '',
      number_of_lithium_ion_cells: '',
      lithium_battery_packaging: '',
      lithium_battery_energy_content: '',
      lithium_battery_energy_content_unit_of_measure: '',
      lithium_battery_weight: '',
      lithium_battery_weight_unit_of_measure: '',
      hazmat_united_nations_regulatory_id: '',
      safety_data_sheet_url: '',
      item_weight: '',
      item_weight_unit_of_measure: '',
      item_volume: '',
      item_volume_unit_of_measure: '',
      warranty_type: '',
      legal_compliance_certification_expiration_date: '',
      legal_compliance_certification_regulatory_organization_name: '',
      legal_compliance_certification_status: '',
      flash_point: '',
      legal_compliance_certification_date_of_issue: '',
      legal_compliance_certification_metadata: '',
      legal_compliance_certification_value: '',
      metal_stamp: '',
      ghs_classification_class1: '',
      ghs_classification_class2: '',
      ghs_classification_class3: '',
      california_proposition_65_compliance_type: '',
      california_proposition_65_chemical_names1: '',
      california_proposition_65_chemical_names2: '',
      california_proposition_65_chemical_names3: '',
      california_proposition_65_chemical_names4: '',
      california_proposition_65_chemical_names5: '',
      pesticide_marking_type1: '',
      pesticide_marking_type2: '',
      pesticide_marking_type3: '',
      pesticide_marking_registration_status1: '',
      pesticide_marking_registration_status2: '',
      pesticide_marking_registration_status3: '',
      pesticide_marking_certification_number1: '',
      pesticide_marking_certification_number2: '',
      pesticide_marking_certification_number3: '',
      fcc_radio_frequency_emission_compliance_registration_status: '',
      fcc_radio_frequency_emission_compliance_point_of_contact_email: '',
      fcc_radio_frequency_emission_compliance_point_of_contact_phone_number: '',
      fcc_radio_frequency_emission_compliance_point_of_contact_name: '',
      fcc_radio_frequency_emission_compliance_identification_number: '',
      fcc_radio_frequency_emission_compliance_point_of_contact_address: '',
      cpsia_cautionary_description: '',
      specific_uses_for_product1: '',
      specific_uses_for_product2: '',
      merchant_release_date: '',
      list_price: '',
      restock_date: '',
      fulfillment_latency: '',
      offering_can_be_giftwrapped: '',
      item_package_quantity: '',
      offering_end_date: '',
      max_order_quantity: '',
      merchant_shipping_group_name: '',
      offering_start_date: '',
      product_tax_code: '',
      offering_can_be_gift_messaged: '',
      condition_note: '',
      sale_price: '',
      sale_from_date: '',
      sale_end_date: '',
      product_site_launch_date: '',
      max_aggregate_ship_quantity: '',
      is_discontinued_by_manufacturer: '',
      delivery_schedule_group_id: '',
      product_expiration_type: '',
      fc_shelf_life: '',
      business_price: '',
      quantity_price_type: '',
      quantity_lower_bound1: '',
      quantity_price1: '',
      quantity_lower_bound2: '',
      quantity_price2: '',
      quantity_lower_bound3: '',
      quantity_price3: '',
      quantity_lower_bound4: '',
      quantity_price4: '',
      quantity_lower_bound5: '',
      quantity_price5: '',
      progressive_discount_type: '',
      progressive_discount_lower_bound1: '',
      progressive_discount_value1: '',
      progressive_discount_lower_bound2: '',
      progressive_discount_value2: '',
      progressive_discount_lower_bound3: '',
      progressive_discount_value3: '',
      national_stock_number: '',
      unspsc_code: '',
      pricing_action: '',
      createdBy: '',
      createdDate: '',
      updatedBy: '',
      updatedDate: '',
      isDelete: true,
      isActive: true,
      status: 0
    };
    const productFieldsArray: string[] = Object.keys(product) as ProductFields[];
    this.cols = productFieldsArray.map(key => ({
      field: key,
      header: key.replace(/_/g, ' ')
    }));
    this._selectedColumns = this.cols.filter(x => this.selectedColumnsInitial.find(y => y.field == x.field));
  }

  loadListProductInHome() {
    //this.notiflix.showLoading();
    this.subscription = this.productHomeService.getData().subscribe({
      next: res => {
        this.listProductsHome = res;
        //this.notiflix.hideLoading();
      },
      error: () => {
        //this.notiflix.error('Error System');
        //this.notiflix.hideLoading();
      }
    })
  }

  loadFilter() {
    this.subscription = this.service.getDataFilter('').subscribe({
      next: res => {
        res.map(item => this.listProductType.push(item.value))
        this.listVsiriusFilter = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  loadData() {
    this.notiflix.showLoading();
    this.subscription = this.service.getProducts(this.filterParam, this.pagination, this.searchParams).subscribe({
      next: res => {
        this.listProducts = res.result;
        this.pagination = res.pagination;
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error('Error System');
        this.notiflix.hideLoading();
      }
    })
    
    
  }

  filterProductType(e: any) {
    this.notiflix.showLoading();
    if (e != null || e != '') {
      this.productType = e;
    }
    this.productTypeFilter = <VsiriusFilter>{
      fieldName: 'feed_product_type',
      productType: '',
      value: [e],
      labelName: '',
      groupName: ''
    }
    this.isShowSelect = false;
    this.subscription = this.service.getDataFilter(e).subscribe({
      next: res => {
        this.listItemType = res.filter(x => x.fieldName == 'item_type').map(x => x.value);
        this.listMetalType = res.filter(x => x.fieldName == 'metal_type').map(x => x.value);
        console.log(this.listMetalType);
        this.notiflix.hideLoading();

      },
      error: (err) => {
        this.notiflix.error(err);
        this.notiflix.hideLoading();
      }
    })
  }
  filterItemType(e: any) {
    this.item_typeList = e;
    this.itemTypeFilterParam = <VsiriusFilter>{
      fieldName: 'item_type',
      productType: '',
      labelName: '',
      value: e,
      groupName: ''
    }
  }
  filterMetalType(e: any) {
    this.metal_typeList = e;
    this.metalTypeFilterParam = <VsiriusFilter>{
      fieldName: 'metal_type',
      productType: '',
      labelName: '',
      value: e,
      groupName: ''
    }
  }

  filterPagination(e: any) {
    if (e == 0) {
      e = 1
    }
    this.pagination.pageSize = e;
    this.loadData();
  }
  // thay đổi phân trang 
  pageChanged(event: any) {
    this.pagination.pageNumber = event.page;
    this.loadData();
  }

  search() {
    this.filterParam = [];
    if (this.itemTypeFilterParam.value?.length > 0) {
      this.filterParam.push(this.itemTypeFilterParam);
    }
    if (this.metalTypeFilterParam.value?.length > 0) {
      this.filterParam.push(this.metalTypeFilterParam);
    }
    this.filterParam.push(this.productTypeFilter);
    this.filterParam.length != 0 ? this.filterParam : [];
    if (Object.keys(this.productTypeFilter).length === 0) {
      this.filterParam = [];
    }
    if (this.searchParams.maxPrice === null) {
      delete this.searchParams.maxPrice;
    }
    if (this.searchParams.minPrice === null) {
      delete this.searchParams.minPrice;
    } else if (this.searchParams.minPrice > this.searchParams.maxPrice) {
      return this.notiflix.warning('Min price can`t be greater than the Max price');
    }
    this.pagination.pageNumber == 1 ? this.loadData() : this.pagination.pageNumber = 1;
  }
  goToAdd() {
    this.router.navigate(['products/create']);
  }

  removeFilterSearch(cols: any) {
    // document.querySelector('.p-multiselect').classList.add('hidden');
  }
  onChangeFilterSearch(event: any) {
    localStorage.setItem('FilterSearch', JSON.stringify(event.value));
  }
  getFilterSearch() {
    let tmp = localStorage.getItem('FilterSearch');
    if (tmp) {
      this.selectedColumnsInitial = JSON.parse(tmp);
    }
  }
  clean() {
    this.selectedColumnsInitial = [
      { field: 'main_image_url', header: 'main_image_url' },
      { field: 'feed_product_type', header: 'feed_product_type' },
      { field: 'brand_name', header: 'brand_name' },
      { field: 'item_type', header: 'item_type' },
      { field: 'metal_type', header: 'metal_type' }
    ];
    localStorage.removeItem('FilterSearch');
    this.searchParams = <SearchParams>{};
    this.generateTable();
    this.search();
  }

  onFileSelected(event: any) {
    const files: File = event.target.files[0] as File;
    this.notiflix.showLoading();
    this.subscription = this.service.importData(files).subscribe({
      next: res => {
        res.success ?
          this.notiflix.success(res.message)
          : this.notiflix.error(res.message);
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error(err);
        this.notiflix.hideLoading();
      }
    })
  }

  update(product: Product) {
    localStorage.removeItem(this.service.itemVSiriusProduct);
    localStorage.setItem(this.service.itemVSiriusProduct, JSON.stringify(product));
    this.router.navigate([]).then(result => { window.open('/#/products/update', '_blank'); });
  }

  delete(product: Product) {
    this.notiflix.confirm('Message', 'Do you want delete product?', () => {
      this.notiflix.showLoading();
      this.subscription = this.service.delete(product.item_sku).subscribe({
        next: res => {
          res.success ? this.notiflix.success(res.message) :
            this.notiflix.error(res.message);
          this.loadData();
          this.notiflix.hideLoading();
        },
        error: err => {
          this.notiflix.error(err);
          this.notiflix.hideLoading();
        }
      })
    })
  }
  chooseProductShowHome(item: Product) {
    const index = this.listProductsHome.findIndex(x => x.item_sku == item.item_sku);
    if (index < 0) {
      this.productHomeModel = {
        item_sku: item.item_sku,
        item_name: item.item_name,
        isLatest: false,
        isPopular: false,
        isActive: true
      } as VsiriusHomeProduct;
    }
    else {
      this.productHomeModel = {
        item_sku: item.item_sku,
        item_name: item.item_name,
        isLatest: this.listProductsHome[index].isLatest,
        isPopular: this.listProductsHome[index].isPopular,
        isActive: true
      } as VsiriusHomeProduct;
    }
    this.modalAdd?.show();
  }
  send() {
    this.notiflix.showLoading();
    this.subscription = this.productHomeService.createOrUpdate(this.productHomeModel).subscribe({
      next: res => {
        res.success ? this.notiflix.success(res.message) :
          this.notiflix.error(res.message);
        this.modalAdd?.hide();
        this.notiflix.hideLoading();
      },
      error: err => {
        this.notiflix.error(err);
        this.notiflix.hideLoading();
      }
    })
  }

  goToProductHome() {
    this.router.navigate(['products/product-home']);
  }
  goToFilter() {
    this.router.navigate(['products/filter']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

