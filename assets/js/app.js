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

             
    });
}
    showSlides(n) {
        let slides = $('.mySlides'); // Usar jQuery para seleccionar elementos
        if (n > slides.length) { this.slideIndex = 1; }
        if (n < 1) { this.slideIndex = slides.length; }
        slides.addClass('hidden'); // Agregar la clase hidden a todos los slides
        slides.eq(this.slideIndex - 1).removeClass('hidden'); // Quitar la clase hidden al slide actual
    }

    mostrarContenidoFAQ(btn) {
       const divToShow=btn.closest('.question').find('.question-paragraph');
       divToShow.removeClass('hide-question-paragraph');
       divToShow.toggleClass(' showAnimation closeAnimation');
       this.voltearBotonSeleccionado(btn);
       this.sombrearTituloPregunta(btn);
    }
    voltearBotonSeleccionado(btn){
        btn.toggleClass('rotated');
    }
    sombrearTituloPregunta(btn){
        btn.closest('.question-title').find('p').toggleClass('question-title-bolder');
    }
    cerrarAllQuestionsparagraph(btn){
        const currentQuestionDiv=btn.closest('.question').find('.question-paragraph');
        const questionParagraphDivs=$(".question-paragraph");
        const self = this; // Almacenar una referencia a la instancia de TemplateManager
        this.mostrarContenidoFAQ(btn);
        questionParagraphDivs.each(function(){
            const questionParagraphDiv = $(this);
            if (questionParagraphDiv.is(currentQuestionDiv)) {
                return;
            }
            if (questionParagraphDiv.hasClass('showAnimation')) {
            const btnQuestionParagraphDiv=questionParagraphDiv.siblings('.question-title').first().find('.btn-questions');
            self.mostrarContenidoFAQ(btnQuestionParagraphDiv);
            }
        });
    }
    init() {
        this.loadEventListeners();
    }
}


const templateManager = new TemplateManager();
templateManager.init();