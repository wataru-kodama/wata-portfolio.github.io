$(function() {
  'use strict';
  $('a[href^="#"]').click(function() {
    var
      $href = $(this).attr("href"),
      $target = $($href == "#" || $href == "" ? 'html' : $href),
      $position = $target.offset().top;

    $('html, body').animate({scrollTop:$position}, 500);
    return false;
  });

  $('#hamburger-menu').on('click', function() {
    var
      $target_btn = $(this),
      $header = $('.header-inner');

    if($target_btn.hasClass('close-btn')) {
      $header.not(':animated').fadeOut('slow', function() {
        $target_btn.removeClass('close-btn');
        $target_btn.css('position', 'relative');
      })
    }else {
      $header.not(':animated').fadeIn('slow', function() {
        $target_btn.addClass('close-btn');
        $target_btn.css('position', 'fixed');
      })
      var $header_link = $header.find('a');
      $header_link.on('click', function() {
        $header.not(':animated').fadeOut('slow', function() {
          $target_btn.removeClass('close-btn');
          $target_btn.css('position', 'relative');
        })
      })
    }
  })

  $(window).scroll(function() {
    var
      $skillarea = $('.skill-wrap').offset().top - 500,
      $window_height = $(this).scrollTop(),
      $hoby_height = $('.l-hoby').offset().top - 250,
      $window_width = $(window).width(),
      $slide_width = 1019;
    
    if($window_height > $skillarea) {
      skillSet();
    }

    $('.show-item').each(function(){
      var
        elemPos = $(this).offset().top,
        $window_height = $(window).scrollTop();

      if($window_height > elemPos - 600) {
        $(this).addClass('fadein')
      }
    });

    if($window_height > $hoby_height && $window_width > $slide_width) {
      $('.hoby-list_item').addClass('slide-down');
    }
  })

  var
    $window_width = $(window).width(),
    $slide_width = 1019;
  if($window_width < $slide_width) {
    $('.hoby-list').bxSlider({
      pager: false,
      controls: false,
      infiniteLoop: false
    })
  }

  var $skill_nav = $('.skill-nav_item');
  $skill_nav.on('click', function() {
    $('.target-skill').removeClass('target-skill');
    $(this).addClass('target-skill');

    var $skill_index = $skill_nav.index(this);
    $('.career-inner').removeClass('skill-show').eq($skill_index).addClass('skill-show');
  })

  scrollMenu();

  function skillSet() {
    $('.skill-bar').each(function() {
      var total = $(this).data("total");
      $(this).css("width", total + "%");
    })
  }

  function scrollMenu() {
    var array = {
      '#top': 0,
      '#profile': 0,
      '#skill': 0,
      '#hoby': 0,
      '#contact': 0
    };

    var $globalNave = new Array();

    for(var key in array) {
      if($(key).offset()) {
        array[key] = $(key).offset().top - 10;
        $globalNave[key] = $('#global-nav li a[href="'+ key +'"]');
      }
    }

    $(window).scroll(function() {
      for(var key in array) {
        if($(window).scrollTop() > array[key] - 500) {
          $('#global-nav li a').each(function() {
            $(this).removeClass('active');
          });
          $globalNave[key].addClass('active');
        }
      }
    })
  }
});