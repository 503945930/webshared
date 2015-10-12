/*

SMINT V1.0 by Robert McCracken

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/
(function(){
	$.fn.smint = function( options ) {
		// adding a class to users div
		$(this).addClass('smint')
			// get initial top offset for the menu 
			var stickyTop = $('.smint').offset().top;
			// check position and make sticky if needed
			var stickyMenu = function(){
				// current distance top
				var scrollTop = $(window).scrollTop(); 

				// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
				if (scrollTop > stickyTop) { 
					$('.smint').css({ 'position': 'fixed', 'top':0 }).addClass('fxd');

					} else {
						$('.smint').css({ 'position': 'absolute', 'top':stickyTop }).removeClass('fxd'); 
					}   
			};
			// run function every time you scroll
			$(window).scroll(function() {
				 stickyMenu();
			});
	};

})();
(function(){
	$.fn.smint1 = function( options ) {
		// adding a class to users div
		$(this).addClass('sm');
		// get initial top offset for the menu
		var stickyTop1 = 513-46;
		// check position and make sticky if needed
		var stickyMenu1 = function(){
			// current distance top
			var scrollTop1 = $(window).scrollTop();

			// if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
			if (scrollTop1 > stickyTop1) {
				$('.sm').css({ 'position': 'fixed', 'top':42,'z-index':"99999"}).addClass('fxd');

			} else {
				$('.sm').css({ 'position': 'absolute', 'top':513 }).removeClass('fxd');
			}
		};
		// run function every time you scroll
		$(window).scroll(function() {
			stickyMenu1();
		});
	}
})();

