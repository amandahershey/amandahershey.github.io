jQuery(document).ready(function () {

    var ua = navigator.userAgent.toLowerCase();
    if ((ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1) || is_touch_device())
    {
        jQuery("html").css('overflow', 'auto');

        jQuery('.post-num-comments a').click(function (e) {
            e.preventDefault();
            jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top}, 2000);
            return false;
        });
    } else
    {
        jQuery("html, .menu-wraper").niceScroll({cursorcolor: "#93BEDF", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});

        //Smooth scroll on single post (comments)
        jQuery('.post-num-comments a').click(function (e) {
            e.preventDefault();
            jQuery("html").getNiceScroll(0).doScrollTop(jQuery(this.hash).offset().top);
        });

        jQuery(".big-menu").mouseover(function () {
            jQuery(".menu-wraper").getNiceScroll().resize();
        });
    }

    jQuery(".site-content").fitVids();


    //Add before and after "blockquote" custom class
    jQuery('blockquote.inline-blockquote').prev('p').addClass('wrap-blockquote');
    jQuery('blockquote.inline-blockquote').next('p').addClass('wrap-blockquote');
    jQuery('blockquote.inline-blockquote').css('display', 'table');

    //Placeholder show/hide
    jQuery('input, textarea').focus(function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').blur(function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });

    //Portfolio

    var grid = jQuery('.grid').imagesLoaded(function () {
        grid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });


        //Fix for portfolio item text
        jQuery('.portfolio-text-holder').each(function () {
            jQuery(this).find('p.portfolio-text').css('margin-top', jQuery(this).height() / 2 - 20);
        });

        //Fix for portfolio hover text fade in/out
        jQuery('.grid-item a').hover(function () {
            jQuery(this).find('.portfolio-text-holder').fadeIn('fast');
        }, function () {
            jQuery(this).find('.portfolio-text-holder').fadeOut('fast');
        });
    });

    //Fix for default menu
    jQuery('.default-menu ul').addClass('main-menu sm sm-clean');

});



jQuery(window).load(function () {

//Fix for retina menu logo
    jQuery(".menu-wraper img").width(jQuery('.header-logo img').width()).height(jQuery('.header-logo img').height());

//Set menu
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentItem: true
    });

    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });





//Show-Hide header sidebar
    jQuery('#toggle, .menu-wraper').on('click', multiClickFunctionStop);
    jQuery('.main-menu, .search-field').click(function (e) {
        e.stopPropagation();
    });

//Set each image slider
    jQuery(".image-slider").each(function () {
        var id = jQuery(this).attr('id');
        if (window[id + '_pagination'] == 'true')
        {
            var pagination_value = '.' + id + '_pagination';
        } else
        {
            var pagination_value = false;
        }

        var auto_value = window[id + '_auto'];
        if (auto_value == 'false')
        {
            auto_value = false;
        } else {
            auto_value = true;
        }

        var hover_pause = window[id + '_hover'];
        if (hover_pause == 'true')
        {
            hover_pause = 'resume';
        } else {
            hover_pause = false;
        }

        var speed_value = window[id + '_speed'];

        jQuery('#' + id).carouFredSel({
            responsive: true,
            width: 'variable',
            auto: {
                play: auto_value,
                pauseOnHover: hover_pause
            },
            pagination: pagination_value,
            scroll: {
                fx: 'crossfade',
                duration: parseFloat(speed_value)
            },
            swipe: {
                onMouse: true,
                onTouch: true
            },
            items: {
                height: 'variable'
            }
        });
    });

    jQuery('.image-slider-wrapper').each(function () {
        var slider_width = jQuery(this).width();
        var pagination_width = jQuery(this).find('.carousel_pagination').width();
        jQuery(this).find('.carousel_pagination').css("margin-left", (slider_width - pagination_width) / 2);
    });


    //PrettyPhoto initial
    jQuery('a[data-rel]').each(function () {
        jQuery(this).attr('rel', jQuery(this).data('rel'));
    });

    contactFormWidthFix();

    //Fix for post opacity
    jQuery(".blog-item-holder").css({opacity: 1});

    jQuery('.doc-loader').fadeOut('fast');

});


jQuery(window).resize(function () {

    jQuery('.image-slider-wrapper').each(function () {
        var slider_width = jQuery(this).width();
        var pagination_width = jQuery(this).find('.carousel_pagination').width();
        jQuery(this).find('.carousel_pagination').css("margin-left", (slider_width - pagination_width) / 2);
    });

    contactFormWidthFix();

    //Fix for portfolio item text
    jQuery('.portfolio-text-holder').each(function () {
        jQuery(this).find('p.portfolio-text').css('margin-top', jQuery(this).height() / 2 - 20);
    });

});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var contactFormWidthFix = function () {

    jQuery('.contact-form').find('.custom-text-class').each(function () {
        var textWidth = jQuery(this).innerWidth() + 1;
        jQuery(this).next('.custom-field-class').width(jQuery('.contact-form').innerWidth() - textWidth - 5);
        jQuery(this).next('.custom-field-class').find('input').outerWidth(jQuery('.contact-form').innerWidth() - textWidth - 5);
        jQuery(this).next('.custom-field-class').find('textarea').outerWidth(jQuery('.contact-form').innerWidth() - textWidth - 5);
    });

};

var multiClickFunctionStop = function (e) {
    if (jQuery(e.target).is('.menu-wraper') || jQuery(e.target).is('#toggle') || jQuery(e.target).is('#toggle div'))
    {
        jQuery('#toggle, .menu-wraper').off("click");
        jQuery('#toggle').toggleClass("on");
        if (jQuery('#toggle').hasClass("on"))
        {
            jQuery('.menu-wraper').fadeIn(function () {
                if (!is_touch_device()) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                    {
                        jQuery("html").getNiceScroll().remove();
                        jQuery("html").css("cssText", "overflow: hidden !important");
                    }
                } else
                {
                    jQuery("html").css("cssText", "overflow: hidden !important");
                }
                jQuery('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
            });
        } else
        {
            jQuery('.menu-wraper').fadeOut(function () {
                jQuery('#toggle, .menu-wraper').on("click", multiClickFunctionStop);
                if (!is_touch_device()) {
                    var ua = navigator.userAgent.toLowerCase();
                    if (!(ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1 && ua.indexOf("chrom") === -1))
                    {
                        jQuery("html").niceScroll({cursorcolor: "#93BEDF", scrollspeed: 100, mousescrollstep: 80, cursorwidth: "12px", cursorborder: "none", cursorborderradius: "0px"});
                    }
                } else
                {
                    jQuery("html").css("cssText", "overflow: auto !important");
                }
            });
        }
    }
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}
