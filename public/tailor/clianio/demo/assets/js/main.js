!function(e){"use strict";e(window).on("load",(function(){e(".preloader").fadeOut("slow")})),e(".preloader").length>0&&e(".preloaderCls").each((function(){e(this).on("click",(function(t){t.preventDefault(),e(".preloader").css("display","none")}))})),e(".mobile-menu-active").vsmobilemenu({menuContainer:".vs-mobile-menu",expandScreenWidth:992,menuToggleBtn:".vs-menu-toggle"});var t="";var i,n,o,a,s=".scrollToTop";if(e(window).on("scroll",(function(){var i,n,o;i=e(".sticky-header"),n="active",o=e(window).scrollTop(),e(window).scrollTop()>600?o>t?i.removeClass(n):i.addClass(n):i.removeClass(n),t=o,e(this).scrollTop()>400?e(s).addClass("show"):e(s).removeClass("show")})),e(s).on("click",(function(t){return t.preventDefault(),e("html, body").animate({scrollTop:0},3e3),!1})),e(".background-image").length>0&&e(".background-image").each((function(){var t=e(this).attr("data-vs-img");e(this).css({"background-image":"url("+t+")"})})),i=".sidemenu-wrapper",n=".sideMenuCls",o="show",e(".sideMenuToggler").on("click",(function(t){t.preventDefault(),e(i).addClass(o)})),e(i).on("click",(function(t){t.stopPropagation(),e(i).removeClass(o)})),e(i+" > div").on("click",(function(t){t.stopPropagation(),e(i).addClass(o)})),e(n).on("click",(function(t){t.preventDefault(),t.stopPropagation(),e(i).removeClass(o)})),function(t,i,n,o){e(i).on("click",(function(i){i.preventDefault(),e(t).addClass(o)})),e(t).on("click",(function(i){i.stopPropagation(),e(t).removeClass(o)})),e(t).find("form").on("click",(function(i){i.stopPropagation(),e(t).addClass(o)})),e(n).on("click",(function(i){i.preventDefault(),i.stopPropagation(),e(t).removeClass(o)}))}(".popup-search-box",".searchBoxTggler",".searchClose","show"),e(".counter").counterUp({delay:10,time:1e3}),e(".vs-hero-carousel").each((function(){var t=e(this);function i(e){return t.data(e)}t.layerSlider({allowRestartOnResize:!0,maxRatio:i("maxratio")?i("maxratio"):1,type:i("slidertype")?i("slidertype"):"fullwidth",pauseOnHover:!!i("pauseonhover"),navPrevNext:!!i("navprevnext"),hoverPrevNext:!!i("hoverprevnext"),hoverBottomNav:!!i("hoverbottomnav"),navStartStop:!!i("navstartstop"),navButtons:!!i("navbuttons"),loop:0!=i("loop"),autostart:!!i("autostart"),height:e(window).width()<767?i("sm-height")?i("sm-height"):i("height"):i("height")?i("height"):1080,responsiveUnder:i("responsiveunder")?i("responsiveunder"):1220,layersContainer:e(window).width()>1920?i("bigwidth")?i("bigwidth"):i("container"):i("container")?i("container"):1220,showCircleTimer:!!i("showcircletimer"),skinsPath:"layerslider/skins/",thumbnailNavigation:0!=i("thumbnailnavigation")}),t.find("[data-ls-go]").each((function(){e(this).on("click",(function(i){i.preventDefault();var n=e(this).data("ls-go");t.layerSlider(n)}))}))})),e("select").length>0&&e("select").niceSelect(),e(".dateTime-pick").datetimepicker({timepicker:!0,datepicker:!0,format:"y-m-d H:i",hours12:!1,step:30}),e(".date-pick").datetimepicker({timepicker:!1,datepicker:!0,format:"m-d-y",step:10}),e(".time-pick").datetimepicker({datepicker:!1,timepicker:!0,format:"H:i",hours12:!1,step:10}),e(".popup-image").magnificPopup({type:"image",gallery:{enabled:!0}}),e(".popup-video").magnificPopup({type:"iframe"}),e(".vs-btn").length>0&&function(t){e(t).each((function(){var t=e(this).html();e(this).html(""),e(this).prepend('<span class="btn-text">'+t+'</span><span class="btn-bg"></span>')}));var i="span.btn-bg";e(t).length>0&&(e(t).on("mouseenter",(function(t){var n=e(this).offset(),o=t.pageX-n.left,a=t.pageY-n.top;e(this).find(i)&&e(this).find(i).css({top:a,left:o})})),e(t).on("mouseout",(function(t){var n=e(this).offset(),o=t.pageX-n.left,a=t.pageY-n.top;e(this).find(i)&&e(this).find(i).css({top:a,left:o})})))}(".vs-btn"),e(".filter-active").imagesLoaded((function(){var t=e(".filter-active").isotope({itemSelector:".filter-item",percentPosition:!0,masonry:{columnWidth:".filter-item"}});e(".filter-nav li").on("click","button",(function(){var i=e(this).attr("data-filter");t.isotope({filter:i})}))})),e(".filter-nav").length>0){if(e(".filter-nav").append('<li class="indicator"></li>'),e(".filter-nav li button").hasClass("active")){let t=e(".filter-nav li button.active").position().left+"px",i=e(".filter-nav li button.active").css("width");e(".indicator").css({left:t,width:i})}e(".filter-nav li button").on("click",(function(){e(".filter-nav li button").removeClass("active"),e(this).addClass("active");let t=e(".filter-nav li button.active").position().left+"px",i=e(".filter-nav li button.active").css("width");e(".indicator").css({left:t,width:i})}))}e(".faq-question").each((function(){e(this).on("click",(function(){var t=e(this).parent().parent();t.hasClass("open")?t.removeClass("open"):(e(".faq-card.open").removeClass("open"),t.addClass("open"))}))})),e(".officer-info-toggler").each((function(){e(this).on("click",(function(t){t.preventDefault(),e(this).next(".officer-info-box").toggleClass("show")}))})),e(".quantity-plus").each((function(){e(this).on("click",(function(){var t=e(this).siblings(".qty-input"),i=parseInt(t.val());isNaN(i)||t.val(i+1)}))})),e(".quantity-minus").each((function(){e(this).on("click",(function(){var t=e(this).siblings(".qty-input"),i=parseInt(t.val());!isNaN(i)&&i>1&&t.val(i-1)}))})),e(a=".onepage-nav").length>0&&e(a).each((function(){e(this).find("a").each((function(){e(this).on("click",(function(){var t=e(this.getAttribute("href"));t.length&&(event.preventDefault(),e("html, body").stop().animate({scrollTop:t.offset().top-10},1e3))}))}))})),e(".vs-rating-input").length>0&&e(".vs-rating-input").each((function(){e(this).find("span").on("click",(function(){e(".vs-rating-input span").addClass("active"),e(this).nextAll("span").removeClass("active")}))})),e("#buyerShipAnother").on("click",(function(t){t.preventDefault(),e(".vs-billing-differentAddress").toggle()})),0!=e("#google-map").length&&google.maps.event.addDomListener(window,"load",(function(){var e={zoom:11,scrollwheel:!1,center:new google.maps.LatLng(40.67,-73.94),styles:[{featureType:"water",elementType:"geometry",stylers:[{color:"#e9e9e9"},{lightness:17}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#f5f5f5"},{lightness:20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#ffffff"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#ffffff"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#ffffff"},{lightness:16}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#f5f5f5"},{lightness:21}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#dedede"},{lightness:21}]},{elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#ffffff"},{lightness:16}]},{elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#333333"},{lightness:40}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#f2f2f2"},{lightness:19}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#fefefe"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#fefefe"},{lightness:17},{weight:1.2}]}]},t=document.getElementById("google-map"),i=new google.maps.Map(t,e);new google.maps.Marker({position:new google.maps.LatLng(40.67,-73.94),map:i,title:"Cryptox"})}))}(jQuery);