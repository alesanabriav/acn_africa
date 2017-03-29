export default function VideoModal() {
		var modal = $('.modal'); 
		
	$('.videos__open-modal').on('click', function(e) {
		e.preventDefault();
		var src = $(this).attr('href') + '?autoplay=1';
		modal.find('iframe').attr('src', src);
		var h = $(window).height();
		modal.find('.iframe-container').css({'height': h});
		modal.addClass('modal--show');
		$(document.body).addClass('modal-open');
	});
		
	$('.modal__close').on('click', function(e) {
		e.preventDefault();
		modal.find('iframe').attr('src', '');
		modal.find('.iframe-container').css({'height': '0'});
		modal.removeClass('modal--show');
		$(document.body).removeClass('modal-open');
	});
		
		
	$(document).on('keyup', function(e) {
		modal.find('iframe').attr('src', '');
		if(e.keyCode === 27) {
		modal.find('iframe').attr('src', '');
			modal.find('.iframe-container').css({'height': '0'});
		modal.removeClass('modal--show');
			$(document.body).removeClass('modal-open');
		}
	});
  
}
