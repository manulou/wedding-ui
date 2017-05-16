declare var $:any;

export class NotificationComponent {

    public showError(message: String): void {
        this.hideErrors();
        const html: string = '<div class="alert alert-danger" role="alert">' +
            '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true">&nbsp;</span>' +
            '<span id="errorMessage">' + message + '</span>' +
            '</div>';
        this.show(html);
    }

    public showInfo(message: String): void {
        this.hideErrors();
        const html: string = '<div class="alert alert-success fade in" role="alert">' +
            '<a href="#" class="close" data-dismiss="alert">&times;</a>' +
            '<strong>Success!</strong> <span id="infoMessage">' + message + '</span>' +
            '</div>';
        this.show(html);
    }

    private show(html: string): void {
        $(html).insertBefore($('.main').first());
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        $('div.alert').delay(3000).fadeOut();
    }

    public hideErrors(): void {
        $('.alert').remove();
    }
}
