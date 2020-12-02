$(function() {
  'use strict';
  $('.page-wrap').addClass('page-wrap_hide');

  // グローバルナビの挙動
  $('a[href^="#"]').click(function() {
    let
      $href = $(this).attr("href"),
      $target = $($href == "#" || $href == "" ? 'html' : $href),
      $position = $target.offset().top;

    $('html, body').animate({scrollTop:$position}, 500);
    return false;
  });

  // ハンバーガーメニュー
  $('#hamburger-menu').on('click', function() {
    const
      $targetBtn = $(this),
      $header = $('.header-inner');

    if($targetBtn.hasClass('close-btn')) {
      $header.not(':animated').fadeOut('slow', function() {
        $targetBtn.removeClass('close-btn');
        $targetBtn.css('position', 'relative');
      })
    }else {
      $header.not(':animated').fadeIn('slow', function() {
        $targetBtn.addClass('close-btn');
        $targetBtn.css('position', 'fixed');
      })

      let $headerLink = $header.find('a');

      $headerLink.on('click', function() {
        $header.not(':animated').fadeOut('slow', function() {
          $targetBtn.removeClass('close-btn');
          $targetBtn.css('position', 'relative');
        })
      })
    }
  })

  $(window).scroll(function() {
    const
      $slide_width = 1019,
      $target_top = 300,
      $top_btn = $('#page-top');

    let
      $skillarea = $('.skill-wrap').offset().top - 500,
      $hoby_height = $('.l-hoby').offset().top - 250,
      $window_width = $(window).width(),
      $window_height = $(this).scrollTop();
    
    if($window_height > $skillarea) {
      skillSet();
    }

    if($window_height > $target_top) {
      $top_btn.fadeIn();
    }else {
      $top_btn.fadeOut();
    }

    $('.show-item').each(function(){
      let
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

  // ページトップ
  $('#page-top').on('click', function() {
    $('html, body').animate({scrollTop: 0}, 500);
    return false;
  })

  let
    $window_width = $(window).width(),
    $slide_width = 1019;

  if($window_width < $slide_width) {
    $('.hoby-list').bxSlider({
      pager: false,
      controls: false,
      infiniteLoop: false
    })
  }

  // スキルの挙動
  const $skillNav = $('.skill-nav_item');
  $skillNav.on('click', function() {
    $('.target-skill').removeClass('target-skill');
    $(this).addClass('target-skill');

    let $skillIndex = $skillNav.index(this);
    $('.career-inner').removeClass('skill-show').eq($skillIndex).addClass('skill-show');
  })

  scrollMenu();

  function skillSet() {
    $('.skill-bar').each(function() {
      let total = $(this).data("total");
      $(this).css("width", total + "%");
    })
  }

  // スクロールに応じてグローバルメニューの挙動
  function scrollMenu() {
    let array = {
      '#top': 0,
      '#profile': 0,
      '#skill': 0,
      '#hoby': 0,
      '#contact': 0
    };

    let $globalNave = new Array();

    for(let key in array) {
      if($(key).offset()) {
        array[key] = $(key).offset().top - 10;
        $globalNave[key] = $('#global-nav li a[href="'+ key +'"]');
      }
    }

    $(window).scroll(function() {
      for(let key in array) {
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