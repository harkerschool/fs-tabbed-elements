(function($){
	$.fn.hkrTabs = function(options) {
		
		var settings = $.extend( {
            'animationSpeed' : 500,
            'tabLabels' : ['Links', 'News', 'Events']
		}, options);
			
		var $elements = this.addClass('panel-element').wrapAll('<div class="hkr-panel"></div>'),
            $panel = $('.hkr-panel').before('<ul class="hkr-tabs">' + getTabs() + '</ul>'),
            $links = $('ul.hkr-tabs > li > a'),
            $activeTab = $links.first().parent().addClass('active'),
            $activeElements = $elements.filter('.hkr-panel-1' ),
            i = 1;

        // check if panel elements are selected
        while( ! $activeElements.length && i < settings.tabLabels.length ) {
            // if none are, search other panels
            $activeElements = $elements.filter('.hkr-panel-' + (i+1) );
            i++;
        }
        $activeElements.addClass('active');
			
		$elements.not('.active').hide();

		$links.click( function() {
			var $this = $(this),
				i = $this.attr('rel'); // index of panel that tab is linked to
		
			$activeTab.removeClass('active');
			$activeElements.fadeOut(settings.animationSpeed).removeClass('active');
			$panel.animate({ height: 'toggle' }, settings.animationSpeed, function() {
				$activeElements = $elements.filter('.hkr-panel-' + i).fadeIn(settings.animationSpeed).addClass('active');
				$(this).animate({ height: 'toggle' }, settings.animationSpeed);
			});
            $activeTab = $this.parent().addClass('active');

            $activeTab.trigger("hkrTabs.tabsactivate");
			
			return false;//, yo!
				
		});
		
		function getTabs() {
			var $html = '';

			for( var i = 0; i < settings.tabLabels.length; i++) {
				if( $('.hkr-panel-' + (i+1)).length ) {
					$html += '<li><a href="#" rel="' + (i+1) + '">' + settings.tabLabels[i] + '</a></li>';	
				}
			}
			return $html;
		}

    };
	
})(jQuery);