export default function SliderVideos() {
  var $main = $('.videos__main');
  var $carousel = $('.videos__carousel__container'); 
  var $items = $carousel.find('.videos__carousel__item');
  var $item = $items.first();
  var next = 0;
  var marginTop = 0;
  var total = $items.length;
  
  function changeArrowUpStyle() {
  	if(next > 0) {
    	$('.videos__carousel__up').css({opacity: '1'});
    } else {
    	$('.videos__carousel__up').css({opacity: '.5'});
    }
  }
  
 $('.videos__carousel__down').on('click', function(e) {
    var itemHeight = $item.height();
   	var totalNext = total * itemHeight;
	
    next = next < total - 1 ? next + 1 : 0;
    marginTop = next * itemHeight;
   	$carousel.css({'margin-top': '-'+ marginTop  +'px'});

	changeArrowUpStyle();
   
 });
  
   $('.videos__carousel__up').on('click', function(e) {
 	var itemHeight = $item.height();
   	var totalNext = total * itemHeight;
 	
     
   if(next > 0) {
     next = next - 1;
    marginTop = marginTop - itemHeight;

   	$carousel.css({'margin-top': '-'+ marginTop  +'px'});
   }
     changeArrowUpStyle();
 });

}
