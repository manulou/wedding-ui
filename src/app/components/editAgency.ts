import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Agency} from "../model/agency";
import {AgenciesService} from "../services/agenciesService";
import {Configuration} from "../app.constants";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../services/categoriesService";
import {AttributesService} from "../services/attributesService";
import {Category} from "../model/category";
import {Attribute} from "../model/attribute";
import {Package} from "../model/package";
import {ImagesService} from "../services/imagesService";
import {Image} from "../model/image";
import {CountriesService} from "../services/countriesService";
import {NgForm} from "@angular/forms";
import {Country} from "../model/country";
import {PackageAttribute} from "../model/packageAttribute";
import {PackagesService} from "../services/packagesService";
import {NotificationComponent} from "../services/notificationService";
declare var $:any;

@Component({
    selector: 'editAgency',
    providers: [AgenciesService, CategoriesService, AttributesService, ImagesService, CountriesService, PackagesService, NotificationComponent, Configuration],
    templateUrl: '../html/editAgency.html'
})
export class EditAgencyComponent implements OnInit {

    @ViewChild('agencyForm') public agencyForm: NgForm;

    public newAgency : boolean;
    public id : number;

    public agency : Agency;
    public countries : Country[];
    public categories : Category[];
    public attributes : Attribute[];
    public images : Image[];

    public newPackage : Package;
    public newCategory : Category;
    public newAttribute : PackageAttribute;

    constructor(private router: Router,
                private agenciesService: AgenciesService,
                private categoriesService: CategoriesService,
                private attributesService: AttributesService,
                private imagesService: ImagesService,
                private countriesService: CountriesService,
                private packagesService: PackagesService,
                private notifier: NotificationComponent,
                private changeDetector: ChangeDetectorRef,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.agency = new Agency();
        this.agency.country = new Country();

        var id = this.route.snapshot.params['id'];

        this.newAgency = (id === 'new');

        this.newPackage = new Package();
        this.newPackage.price = 0;
        this.newCategory = new Category();
        this.newAttribute = new PackageAttribute();
        this.newAttribute.attribute = new Attribute();

        if (!this.newAgency) {
            this.id = this.route.snapshot.params['id'];
            this.imagesService.getThumbnails(id)
                .subscribe(images => this.images = images);
            this.agenciesService.get(id)
                .subscribe(agency => {
                    this.agency = agency;
                    this.changeDetector.detectChanges();
                    this.initDragAndDrop();
                });
        } else {
            this.images = [];
        }
        this.categoriesService.getAll()
            .subscribe(categories => this.categories = categories);
        this.attributesService.getAll()
            .subscribe(attributes => this.attributes = attributes);
        this.countriesService.getAll()
            .subscribe(countries => this.countries = countries);
    }

    public isNewAgency(): boolean {
        return this.newAgency;
    }

    public save(agency : Agency): void {
        if(this.agencyForm.valid) {
            var newAgency = true;
            this.agenciesService.save(this.agency)
                .subscribe(agency => {
                    this.notifier.showInfo('Agency was saved successfully!')
                    this.agency = agency;
                    if (this.isNewAgency()) {
                        this.router.navigate(['/secure/agency', agency.id]);
                    }
                });
        }
    };

    public deleteImage(imageToDelete : Image): void {
        this.imagesService.delete(imageToDelete.id).subscribe(() => {
            for (var i = this.images.length - 1; i >= 0; i--) {
                var image = this.images[i];
                if(image.id === imageToDelete.id) {
                    this.images.splice(i, 1);
                }
            }
        });
    };

    public addPackage (newPackage : Package): void {
        if(newPackage.name != '') {
            this.agency.packages.push(newPackage);
            this.newPackage = new Package();
            this.newPackage.price = 0;
        }
    };

    public deletePackage(pkg: Package): void {
        if (confirm('Are you sure you want to delete package "' + pkg.name + '"?')) {
            if (pkg.id) {
                this.packagesService.delete(pkg.id).subscribe(() => {
                    for (var i = this.agency.packages.length - 1; i >= 0; i--) {
                        if (this.agency.packages[i].id === pkg.id) {
                            this.agency.packages.splice(i, 1);
                        }
                    }
                });
            } else {
                this.agency.packages.splice(this.agency.packages.length - 1, 1);
            }
        }
    };

    public addCategory(newCategory: Category): void {
        if(newCategory.name != '') {
            for (let cat of this.categories) {
                if (cat.name == newCategory.name) {
                    this.notifier.showError('Category already exists');
                    return;
                }
            }
            this.categoriesService.save(newCategory).subscribe(category => {
                this.categories.push(category);
                this.newCategory = new Category();
            });
        }
    };

    public addAttribute(newAttribute: PackageAttribute, pkg: Package, category: Category) {
        if(newAttribute.attribute.name != '') {
            if (typeof pkg.attributes === "undefined") {
                pkg.attributes = [];
            }
            newAttribute.category = new Category;
            newAttribute.category.id = category.id;
            newAttribute.attribute.categoryId = category.id;
            for (let attr of this.attributes) {
                if (attr.name == newAttribute.attribute.name) {
                    newAttribute.attribute.id = attr.id;
                    break;
                }
            }
            if (typeof newAttribute.attribute.id === "undefined") {
                this.attributesService.save(this.newAttribute.attribute).subscribe(attribute => {
                    this.attributes.push(attribute);
                    newAttribute.attribute.id = attribute.id;
                });
            }
            pkg.attributes.push(newAttribute);
            this.newAttribute = new PackageAttribute();
            this.newAttribute.attribute = new Attribute();
        }
    };

    public packageHasAttribute(pkg: Package, attribute: Attribute) : boolean {
        if (typeof pkg.attributes === "undefined") {
            pkg.attributes = [];
        }
        for (var i = 0; i < pkg.attributes.length; i++) {
            if (pkg.attributes[i].attribute.id == attribute.id) {
                return true;
            }
        }
        return false;
    };

    public toggleAttributeInPackage(attribute: Attribute, pkg: Package, category: Category): void {
        if (typeof pkg.attributes === "undefined") {
            pkg.attributes = [];
        }
        var found = false;
        for (var i = 0; i < pkg.attributes.length; i++) {
            if (pkg.attributes[i].attribute.id == attribute.id) {
                pkg.attributes.splice(i, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            var newAttribute = new PackageAttribute();
            newAttribute.category = category;
            newAttribute.attribute = attribute;
            pkg.attributes.push(newAttribute);
        }
    };

    public upload(file: File) :void {
        var formData = new FormData();
        formData.append('file', file);
        $('#drop-zone').html('Uploading, please wait...');
        this.imagesService.upload(this.agency.id, formData).subscribe(image => {
            this.images.push(image);
            $('.progress').hide();
            $('#drop-zone').html('Just drag and drop images here');
            this.notifier.showInfo('Image was uploaded successfully!');
        });
    };

    private initDragAndDrop(): void {
        var component = this;
        var dropZone = $('#drop-zone')[0];

        dropZone.ondrop = function(e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';

            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                var file = e.dataTransfer.files[i];
                component.upload(file);
            }
        }

        dropZone.ondragover = function() {
            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function() {
            this.className = 'upload-drop-zone';
            return false;
        }

        dropZone.ondrop.bind(this);
    }
}