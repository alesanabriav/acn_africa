export default function Slider() {
 var slider = $('.slider');
 var viewport = slider.find('.slider__viewport');
 var slides = slider.find('.slider__slide');
 var sliderWidth = (100 * slides.length) + '%';
 var slidesWidth = (100 / slides.length) + '%';
 var sliderGallery = $('.slider-gallery');
 var sliderTitles = $('.slider-titles');
    
 viewport.css({width: sliderWidth});
 slides.css({width: slidesWidth});
    
 $('.nav__link').on('click', function(){
 	var next = $(this).data('slide');
	viewport.css({left: '-' + (next * 100) + '%'});
   sliderGallery.css({left: '-' + (next * 100) + '%'});
   sliderTitles.css({left: '-' + (next * 100) + '%'});
   activeDot(next);
   activeLink(next);
 }); 
 
 $('.slider__dots').on('click', '.slider__dots__dot', function(e) {   
	var next = $(this).data('slide');
	viewport.css({left: '-' + (next * 100) + '%'});
   sliderGallery.css({left: '-' + (next * 100) + '%'});
   sliderTitles.css({left: '-' + (next * 100) + '%'});
   activeDot(next);
   activeLink(next)
 });
    
 
 var next = 0;
 var max = 100 * slides.length;

 let autoSlide = setInterval(function autoNextSlide(){
    nextSlide();
 }, 2000);
  
 function nextSlide(clear, e) {
   if(clear == true) clearInterval(autoSlide);
 	var total = slides.length - 1;
   next = next < total ? next + 1 : 0;
   viewport.css({left: '-' + (next * 100) + '%'});
   sliderGallery.css({left: '-' + (next * 100) + '%'});
   sliderTitles.css({left: '-' + (next * 100) + '%'});
   activeDot(next);
   activeLink(next);
 }
  
 function prevSlide() {
   clearInterval(autoSlide);
  var total = slides.length - 1;
   next = next > 0 ? next - 1 : 0;
   viewport.css({left: '-' + (next * 100) + '%'});
   sliderGallery.css({left: '-' + (next * 100) + '%'});
   sliderTitles.css({left: '-' + (next * 100) + '%'});
    activeLink(next);
   activeDot(next);
   
 }
    
  function activeDot(next) {
    $('.slider__dots__dot').removeClass('slider__dots__dot--active');
	  $('.slider__dots__dot[data-slide="'+ next +'"]').addClass('slider__dots__dot--active');    
   }
    
    
  function activeLink(next) {
    $('.nav__link').removeClass('nav__link--active');
	  $('.nav__link[data-slide="'+ next +'"]').addClass('nav__link--active');    
   }
    
    
  
  $('.slider__btns__prev').click(prevSlide);
  $('.slider__btns__next').click(nextSlide.bind(this, true));
    
 for(var i = 0; i < slides.length; i++) {
   clearInterval(autoSlide);
   var active = i == 0 ? "slider__dots__dot--active" : "";
 	$('.slider__dots').append('<button class="slider__dots__dot '+ active +'" data-slide="'+ i +'"></button>');
 }
    
}
