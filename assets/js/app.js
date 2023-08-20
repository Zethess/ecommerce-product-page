class TemplateManager {
    constructor() {
        this.slideIndex = 1; // Inicializar slideIndex en 1
    }
    loadEventListeners() {
        $(document).ready(() => {
            $('#prevSlideShow').click(() => {
                this.showSlides(this.slideIndex -= 1);
            });
            $('#nextSlideShow').click(() => {
                this.showSlides(this.slideIndex += 1);
            });
            this.showSlides(this.slideIndex);
            this.showGalleryPhoto(0);
            $('.thumbnail').on('click', (event) => {
                const index = $('.thumbnail').index(event.currentTarget);
                this.showGalleryPhoto(index);
                this.toggleThumbnailSelection($(event.currentTarget));
            });
    });
}
    showSlides(n) {
        let slides = $('.mySlides'); // Usar jQuery para seleccionar elementos
        if (n > slides.length) { this.slideIndex = 1; }
        if (n < 1) { this.slideIndex = slides.length; }
        slides.addClass('hidden'); // Agregar la clase hidden a todos los slides
        slides.eq(this.slideIndex - 1).removeClass('hidden'); // Quitar la clase hidden al slide actual
    }
    showGalleryPhoto(n) {
        let galleryPhotos = $('.slideshow-gallery'); // Usar jQuery para seleccionar elementos
        galleryPhotos.addClass('hidden'); // Agregar la clase hidden a todos los slides
        galleryPhotos.eq(n).removeClass('hidden'); // Quitar la clase hidden al slide actual
    }
    toggleThumbnailSelection(thumbnail){
        $('.thumbnail').removeClass('selected');
        thumbnail.addClass('selected');
    }
    init() {
        this.loadEventListeners();
    }
}


const templateManager = new TemplateManager();
templateManager.init();