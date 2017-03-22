import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Agency} from "../model/agency";
import {AgenciesService} from "../services/agenciesService";
import {Configuration} from "../app.constants";
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../services/categoriesService";
import {AttributesService} from "../services/attributesService";
import {Category} from "../model/category";
import {Attribute} from "../model/attribute";
import {Package} from "../model/package";
import {ImagesService} from "../services/imagesService";
import {Image} from "../model/image";
import {Email} from "../model/email";
import {EmailService} from "../services/emailService";
declare var $:any;
declare var initMasonry:any;

@Component({
    selector: 'agencyDetails',
    providers: [AgenciesService, CategoriesService, AttributesService, ImagesService, EmailService, Configuration],
    templateUrl: '../html/agencyDetails.html'
})
export class AgencyDetailsComponent implements OnInit {
    public agency : Agency;
    public categories : Category[];
    public attributes : Attribute[];
    public images : Image[] = [];
    public firstImage : Image;
    public activePackage: string;
    public email: Email = new Email();
    public emailSendStatus: string = '';

    constructor(private agenciesService: AgenciesService,
                private categoriesService: CategoriesService,
                private attributesService: AttributesService,
                private emailService: EmailService,
                private imagesService: ImagesService,
                private changeDetector: ChangeDetectorRef,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.categoriesService.getAll()
            .subscribe(categories => this.categories = categories);
        this.attributesService.getAll()
            .subscribe(attributes => this.attributes = attributes);
        this.activePackage = this.route.snapshot.queryParams['package'];
        this.agenciesService.getBySeolink(this.route.snapshot.params['seolink'])
            .subscribe(agency => {
                this.agency = agency;
                if (this.activePackage) {
                    this.changeDetector.detectChanges();
                    initMasonryForCurrentPackage(this.activePackage);
                }
                this.imagesService.getThumbnails(this.agency.id)
                    .subscribe(images => {
                        this.images = images;
                        this.firstImage = this.images.length > 0 ? this.images[0] : new Image();
                        this.changeDetector.detectChanges();
                        initGallery(this.images.length);
                    });
            });
    }

    public getSpreadImage(): string {
        if (this.agency) {
            return `url('/api/agency/${this.agency.id}/spread')`;
        }
        return '';
    }

    private hasAttributesForCategory(weddingPackage : Package, category : Category): boolean {
        for (var i = 0; i < weddingPackage.attributes.length; i++) {
            if (weddingPackage.attributes[i].category.id == category.id) {
                return true;
            }
        }
        return false;
    }

    private sendEmail(): void {
        this.emailSendStatus = 'sending'
        this.emailService.send(this.email).subscribe(() => this.emailSendStatus = 'sent');
    }
}

function initGallery(size) {
    /**
     * Detail gallery
     */
    if ($('.detail-gallery-index').length != 0) {
        $('.detail-gallery-index').owlCarousel({
            items: size,
            nav: true,
            dots: true,
            navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
        });
    }

    $('.detail-gallery-list-item a').on('click', function(e) {
        e.preventDefault();
        var link = $(this).data('target');
        $('.detail-gallery-preview img').attr('src', link);
        $('.detail-gallery-preview a').attr('href', link);
    });

    $('.detail-gallery-preview a').colorbox({photo: true, maxWidth:'95%', maxHeight:'95%'});
}

function initMasonryForCurrentPackage(packageId) {
    initMasonry($('#packageRow' + packageId).find('.categories'));
}
