import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-banner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnChanges {
    private sanitiser = inject(DomSanitizer);

    @Input({required: true}) title = '';
    @Input() overview = '';
    @Input() key = 'lyFFerAxpF0';

    videoUrl = this.sanitiser.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);

    ngOnChanges ( changes: SimpleChanges ): void {
        if (changes['key']) {
            this.videoUrl = this.sanitiser.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
        }
    }
}
