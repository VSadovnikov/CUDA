(function() {

  // Definition of caller element
  var getTriggerElement = function(el) {
    var isCollapse = el.getAttribute('data-collapse');
    if (isCollapse !== null) {
      return el;
    } else {
      var isParentCollapse = el.parentNode.getAttribute('data-collapse');
      return (isParentCollapse !== null) ? el.parentNode : undefined;
    }
  };

  // A handler for click on toggle button
  var collapseClickHandler = function(event) {
    var triggerEl = getTriggerElement(event.target);
    // If trigger element does not exist
    if (triggerEl === undefined) {
      event.preventDefault();
      return false;
    }

    // If the target element exists
    var targetEl = document.querySelector(triggerEl.getAttribute('data-target'));
    if (targetEl) {
      triggerEl.classList.toggle('-active');
      targetEl.classList.toggle('-on');
    }
  };

  // Delegated event
  document.addEventListener('click', collapseClickHandler, false);

})(document, window);

$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;
  
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    advance();
    
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    $slides.eq(newIndex).css({
      display: 'flex',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(1);
      }
    }, 5000);
  }
  
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(1);
    }
  });
  
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(1);
    }
  });
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });
  
  advance();
});


(function() {
  $(document).ready(function() {
    $('.skill-box').find('b').each(function(i) {
      return $(this).prop('Counter', 0).animate({
        Counter: $(this).parent().data('percent')
      }, {
        duration: 3000,
        easing: 'swing',
        step: function(now) {
          return $(this).text(Math.ceil(now) + '%');
        }
      });
    });
    return $('.skill-box .skills-circle li').each(function(i) {
      var _left, _percent, _right, deg, full_deg, run_duration;
      _right = $(this).find('.bar-circle-right');
      _left = $(this).find('.bar-circle-left');
      _percent = $(this).attr('data-percent');
      deg = 3.6 * _percent;
      if (_percent <= 50) {
        return _right.animate({
          circle_rotate: deg
        }, {
          step: function(deg) {
            $(this).css('transform', 'rotate(' + deg + 'deg)');
          },
          duration: 1000
        });
      } else {
        full_deg = 180;
        deg -= full_deg;
        run_duration = 1000 * (50 / _percent);
        return _right.animate({
          circle_rotate: full_deg
        }, {
          step: function(full_deg) {
            $(this).css('transform', 'rotate(' + full_deg + 'deg)');
          },
          duration: run_duration,
          easing: 'linear',
          complete: function() {
            run_duration -= 1000;
            _left.css({
              'clip': 'rect(0, 150px, 150px, 75px)',
              'background': '#B0DAB9'
            });
            return _left.animate({
              circle_rotate: deg
            }, {
              step: function(deg) {
                $(this).css('transform', 'rotate(' + deg + 'deg)');
              },
              duration: Math.abs(run_duration),
              easing: 'linear'
            });
          }
        });
      }
    });
  });

}).call(this);