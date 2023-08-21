class TemplateManager {
    constructor() {
        this.slideIndex = 1;
        this.galleryIndex = 1;
    }

    init() {
        this.loadEventListeners();
    }

    loadEventListeners() {
        $(document).ready(() => {
            this.addSlideShowEvents();
            this.addThumbnailEvents();
            this.addModalEvents();

            this.showSlides(this.slideIndex);
            this.showGalleryPhoto(0);
        });
    }

    addSlideShowEvents() {
        $('#prevSlideShow').click(() => this.handlePrevSlideShowClick());
        $('#nextSlideShow').click(() => this.handleNextSlideShowClick());
    }

    addThumbnailEvents() {
        $('.thumbnail').on('click', (event) => this.handleThumbnailClick(event));
    }

    addModalEvents() {
        $('#close-modal-contact').on('click', (event) => this.handleCloseModalContactClick(event));
        $('.slideshow-gallery').on('click', (event) => this.handleSlideshowGalleryClick(event));
        $('.modal-thumbnail').on('click', (event) => this.handleModalThumbnailClick(event));
        $('#prevModalShow').click(() => this.handlePrevModalShowClick());
        $('#nextModalShow').click(() => this.handleNextModalShowClick());
    }


    // Métodos de manejo de eventos

    handlePrevSlideShowClick() {
        // Lógica para manejar el evento prevSlideShow
        this.showSlides(this.slideIndex -= 1);
    }

    handleNextSlideShowClick() {
        // Lógica para manejar el evento nextSlideShow
        this.showSlides(this.slideIndex += 1);
    }

    handleThumbnailClick(event) {
        // Lógica para manejar el clic en una miniatura
        const index = $('.thumbnail').index(event.currentTarget);
        this.showGalleryPhoto(index);
    }

    handleCloseModalContactClick(event) {
        // Lógica para manejar el clic en el botón close-modal-contact
        $("#myModal").removeClass('show');
        this.showModalPhoto(this.galleryIndex);
    }

    handleSlideshowGalleryClick(event) {
        // Lógica para manejar el clic en un elemento de la galería
        const index = $('.slideshow-gallery').index(event.currentTarget);
        $("#myModal").addClass('show');
        this.showModalPhoto(index);
    }

    handleModalThumbnailClick(event) {
        // Lógica para manejar el clic en una miniatura modal
        const index = $('.modal-thumbnail').index(event.currentTarget);
        this.showModalPhoto(index);
    }

    handlePrevModalShowClick() {
        // Lógica para manejar el evento prevModalShow
        this.buttonsSlideShow(this.galleryIndex -= 1);
    }

    handleNextModalShowClick() {
        // Lógica para manejar el evento nextModalShow
        this.buttonsSlideShow(this.galleryIndex += 1);
    }

    // Métodos de ayuda

    showSlides(n) {
        // Lógica para mostrar diapositivas
        let slides = $('.mySlides');
        if (n > slides.length) { this.slideIndex = 1; }
        if (n < 1) { this.slideIndex = slides.length; }
        slides.addClass('hidden');
        slides.eq(this.slideIndex - 1).removeClass('hidden');
    }

    showGalleryPhoto(n) {
        // Lógica para mostrar una foto de la galería
        let galleryPhotos = $('.slideshow-gallery');
        galleryPhotos.addClass('hidden');
        galleryPhotos.eq(n).removeClass('hidden');
        this.galleryIndex = n;
        this.toggleThumbnailSelection(n);
    }

    showModalPhoto(n) {
        // Lógica para mostrar una foto modal
        let modalImage = $('.modal-image');
        modalImage.addClass('hidden');
        modalImage.eq(n).removeClass('hidden');
        this.showGalleryPhoto(n);
        this.toggleModalThumbnailSelection(n);
        this.toggleThumbnailSelection(n);
    }

    toggleThumbnailSelection(n) {
        // Lógica para cambiar la selección de miniaturas
        let thumbnail = $('.thumbnail');
        thumbnail.removeClass('selected');
        thumbnail.eq(n).addClass('selected');
    }

    toggleModalThumbnailSelection(n) {
        // Lógica para cambiar la selección de miniaturas modales
        let modalThumbnail = $('.modal-thumbnail');
        modalThumbnail.removeClass('selected');
        modalThumbnail.eq(n).addClass('selected');
    }

    buttonsSlideShow(n,isModal) {
        // Lógica para manejar los botones de miniaturas modales
        let modalThumbnail = $('.modal-image');
        if (n > modalThumbnail.length - 1) { this.galleryIndex = 0; }
        if (n < 0) { this.galleryIndex = modalThumbnail.length - 1; }
        this.showModalPhoto(this.galleryIndex);
    }

    init() {
        this.loadEventListeners();
    }
}


const templateManager = new TemplateManager();
templateManager.init();