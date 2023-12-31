class TemplateManager {
    constructor() {
        this.slideIndex = 1;
        this.galleryIndex = 1;
        this.PRODUCT_PRICE = 125;
        // Definir constantes en mayúsculas para las cadenas de selección de elementos
        this.MY_SLIDES_SELECTOR = '.mySlides';
        this.THUMBNAIL_SELECTOR = '.thumbnail';
        this.SLIDESHOW_GALLERY_SELECTOR = '.slideshow-gallery';
        this.MODAL_IMAGE_SELECTOR = '.modal-image';
        this.MODAL_THUMBNAIL_SELECTOR = '.modal-thumbnail';
        this.MINUS_PLUS_INPUT_SELECTOR = '#minus-plus-input';
        this.HEADER_USER_CART_ICON_DIV_SELECTOR = '#header-user-cart-icon-div';
        this.HEADER_USER_CART_PRODUCTS_DESCRIPTION_CONTAINER_SELECTOR = '#header-user-cart-products-description-container';
        this.ADD_TO_CART_BTN_SELECTOR = '#add-to-cart-btn';

        // Elementos DOM para su reutilización
        this.elements = {
            mySlides: $(this.MY_SLIDES_SELECTOR),
            thumbnail: $(this.THUMBNAIL_SELECTOR),
            slideshowGallery: $(this.SLIDESHOW_GALLERY_SELECTOR),
            modalImage: $(this.MODAL_IMAGE_SELECTOR),
            modalThumbnail: $(this.MODAL_THUMBNAIL_SELECTOR),
            minusPlusInput: $(this.MINUS_PLUS_INPUT_SELECTOR),
            headerUserCartIconDiv: $(this.HEADER_USER_CART_ICON_DIV_SELECTOR),
            headerUserCartProductsDescriptionContainer: $(this.HEADER_USER_CART_PRODUCTS_DESCRIPTION_CONTAINER_SELECTOR),
            addToCartBtn: $(this.ADD_TO_CART_BTN_SELECTOR),
        };
    }

    init() {
        this.loadEventListeners();
    }

    loadEventListeners() {
        $(document).ready(() => {
            this.addSlideShowEvents();
            this.addThumbnailEvents();
            this.addModalEvents();
            this.addInputEvents();
            this.addCartIconEvent();
            this.addProductBtnEvent();
            this.addIcontTrashEvent();
            this.addIconCloseEvent();
            //Necesario para que al inicializar la página el slide para versión móvil y la de PC sean visible, ya que al principio todos los slides estan ocultos
            this.showSlides(this.MY_SLIDES_SELECTOR, 'slideIndex', false, this.slideIndex -= 1);
            this.showContainerPhoto(this.SLIDESHOW_GALLERY_SELECTOR, 0);
            //Necesario para inicializar la lista de elementos del carrito de la compra
            this.toggleHtmlUserCart(true);
        });
    }

    addSlideShowEvents() {
        $('#prevSlideShow').click(() => this.handlePrevSlideShowClick());
        $('#nextSlideShow').click(() => this.handleNextSlideShowClick());
    }

    addThumbnailEvents() {
        this.elements.thumbnail.on('click', (event) => this.handleThumbnailClick(event));
    }

    addModalEvents() {
        $('#close-modal-contact').on('click', (event) => this.handleCloseModalContactClick(event));
        this.elements.slideshowGallery.on('click', (event) => this.handleSlideshowGalleryClick(event));
        this.elements.modalThumbnail.on('click', (event) => this.handleModalThumbnailClick(event));
        $('#prevModalShow').click(() => this.handlePrevModalShowClick());
        $('#nextModalShow').click(() => this.handleNextModalShowClick());
    }
    addInputEvents() {
        $('#minus-icon').click(() => this.handleDecrementInputValueClick());
        $('#plus-icon').click(() => this.handleIncrementInputValueClick());
    }
    addCartIconEvent() {
        this.elements.headerUserCartIconDiv.click(() => this.handleProductsDivShowClick());
    }
    addProductBtnEvent(){
        this.elements.addToCartBtn.click(() => this.handleUserProductCartShowClick(false));
    }
    addIcontTrashEvent(){
        $('#header-user-cart-products-description-clear-icon').click(() => this.handleUserProductCartShowClick(true));
    }
    addIconCloseEvent(){
        $('#header-user-cart-products-div-close').click(() => this.handleProductsDivShowClick());
    }
    // Métodos de manejo de eventos

    handlePrevSlideShowClick() {
        // Lógica para manejar el evento prevSlideShow
        
        this.showSlides(this.MY_SLIDES_SELECTOR,'slideIndex',false,this.slideIndex -= 1);
    }

    handleNextSlideShowClick() {
        // Lógica para manejar el evento nextSlideShow
        this.showSlides(this.MY_SLIDES_SELECTOR,'slideIndex',false,this.slideIndex += 1);
    }

    handleThumbnailClick(event) {
        // Lógica para manejar el clic en una miniatura
        const index = this.elements.thumbnail.index(event.currentTarget);
        this.showContainerPhoto(this.SLIDESHOW_GALLERY_SELECTOR, index);
    }

    handleCloseModalContactClick(event) {
        // Lógica para manejar el clic en el botón close-modal-contact
        $("#myModal").removeClass('show');
        this.showContainerPhoto(this.MODAL_IMAGE_SELECTOR,this.galleryIndex);
    }

    handleSlideshowGalleryClick(event) {
        // Lógica para manejar el clic en un elemento de la galería
        const index = this.elements.slideshowGallery.index(event.currentTarget);
        $("#myModal").addClass('show');
        this.showContainerPhoto(this.MODAL_IMAGE_SELECTOR,index);
    }

    handleModalThumbnailClick(event) {
        // Lógica para manejar el clic en una miniatura modal
        const index = this.elements.modalThumbnail.index(event.currentTarget);
        this.showContainerPhoto(this.MODAL_IMAGE_SELECTOR,index);
    }

    handlePrevModalShowClick() {
        // Lógica para manejar el evento prevModalShow
        this.showSlides(this.MODAL_IMAGE_SELECTOR,'galleryIndex',true,this.galleryIndex -= 1);
    }

    handleNextModalShowClick() {
        // Lógica para manejar el evento nextModalShow
        this.showSlides(this.MODAL_IMAGE_SELECTOR,'galleryIndex',true,this.galleryIndex += 1);
    }
    handleIncrementInputValueClick(){
        this.changeInputValue('increment');
    }
    handleDecrementInputValueClick(){
        this.changeInputValue('decrement');
    }
    handleProductsDivShowClick(){
        const productDiv = $('.header-user-cart-products-div');
        productDiv.slideToggle(200);
        productDiv.toggleClass('hidden');
    }
    handleUserProductCartShowClick(isDefaultMessage){
        this.showNumberOfItemsSelected(isDefaultMessage);
        this.toggleHtmlUserCart(isDefaultMessage);
        this.changeInputValue('reset');
    }
    // Métodos de ayuda
    showSlides(imgContainer,index,isModal,n){
        let imgContainers = $(imgContainer);
        if (n > imgContainers.length-1) { this[index] = 0; }
        if (n < 0) { this[index] = imgContainers.length-1; }
        if (isModal) {
            this.showContainerPhoto(imgContainer,this[index]);
        } else {
            this.showContainerPhoto(imgContainer,this[index] - 1)
        }
    }
    showContainerPhoto(imgContainer,n){
        let containerPhotos = $(imgContainer);
        containerPhotos.addClass('hidden');
        containerPhotos.eq(n).removeClass('hidden');
        if (imgContainer == this.SLIDESHOW_GALLERY_SELECTOR) {
            this.galleryIndex = n;
            this.toggleThumbnailSelection(this.THUMBNAIL_SELECTOR,n);
        } else if(imgContainer == this.MODAL_IMAGE_SELECTOR) {
            this.showContainerPhoto(this.SLIDESHOW_GALLERY_SELECTOR, n);
            this.toggleThumbnailSelection(this.MODAL_THUMBNAIL_SELECTOR,n);
            this.toggleThumbnailSelection(this.THUMBNAIL_SELECTOR,n);
        }
    }

    toggleThumbnailSelection(thumbnailContainer,n) {
        // Lógica para cambiar la selección de miniaturas
        let thumbnail = $(thumbnailContainer);
        thumbnail.removeClass('selected');
        thumbnail.eq(n).addClass('selected');
    }
    changeInputValue(event){
        const minusPlusInput= this.elements.minusPlusInput;
        let minusPlusInputValue = Number(minusPlusInput.val()); // No es necesario parseInt si ya es un número
        if (event == 'increment') {
            minusPlusInputValue++;
            this.handlerDisableAddToCartBtn(false);
        }else if(event == 'decrement' && minusPlusInputValue > 0){
            minusPlusInputValue--;
        }else{
            minusPlusInputValue = 0;
            this.handlerDisableAddToCartBtn(true);
        }
        minusPlusInput.val(minusPlusInputValue);
    }
    showNumberOfItemsSelected(isDefaultMessage){
        const iconCart = this.elements.headerUserCartIconDiv;
        const minusPlusInputValue= Number(this.elements.minusPlusInput.val());
        if (minusPlusInputValue > 0 && !isDefaultMessage) {
            iconCart.addClass('active');
            iconCart.attr('data-count', minusPlusInputValue);
        }else if (isDefaultMessage) {
            iconCart.removeClass('active');
        }
    }
    toggleHtmlUserCart(isDefaultMessage){
        if (isDefaultMessage) {
            var message = `
            <p class="header-user-cart-products-description-default">Your car is empty</p>
            `;
        }else{
            const minusPlusInputValue= Number(this.elements.minusPlusInput.val());
            const totalPrice = minusPlusInputValue * this.PRODUCT_PRICE;
            var message = `
            <div class="header-user-cart-products-description-grid">
                <img src="assets/images/image-product-1-thumbnail.jpg" alt="" width="47" height="47">
                <div class="header-user-cart-products-description-price-quantity">
                    <p class="header-user-cart-products-description-name">Fall Limited Edition Sneakers</p>
                    <p class="header-user-cart-products-description-price">$${this.PRODUCT_PRICE} x <span class="header-user-cart-products-description-quantity">${minusPlusInputValue} </span><strong>$</strong><span class="header-user-cart-products-description-total">${totalPrice}</span></p>
                </div>
                <svg id="header-user-cart-products-description-clear-icon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use  fill-rule="nonzero" xlink:href="#a"/>
                </svg>
            </div>
            <button class="header-user-cart-products-btn">Checkout</button>
            `;
        }
        this.elements.headerUserCartProductsDescriptionContainer.empty();
        this.elements.headerUserCartProductsDescriptionContainer.append(message);
        if (!isDefaultMessage) {
            this.addIcontTrashEvent();
        }
    }
    handlerDisableAddToCartBtn(disabled) {
        const addToCartBtn = this.elements.addToCartBtn;
        addToCartBtn.prop('disabled', disabled);
        addToCartBtn.toggleClass('disabled', disabled); //quita o añade la clase en funcion del parametro de entrada
    }
   
}
const templateManager = new TemplateManager();
templateManager.init();