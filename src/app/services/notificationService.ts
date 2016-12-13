declare var $:any;

export class NotificationComponent {

    public showError(message: String): void {
        this.hideErrors();
        var html = '<div class="alert alert-danger" role="alert">' +
            '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true">&nbsp;</span>' +
            '<span id="errorMessage">' + message + '</span>' +
            '</div>';
        $(html).insertBefore($('.main').first());
    }

    public showInfo(message: String): void {
        this.hideErrors();
        var html = '<div class="alert alert-success fade in" role="alert">' +
            '<a href="#" class="close" data-dismiss="alert">&times;</a>' +
            '<strong>Success!</strong> <span id="infoMessage">' + message + '</span>' +
            '</div>';
        $(html).insertBefore($('.main').first());
    }

    public hideErrors(): void {
        $('.alert').remove();
    }
}
