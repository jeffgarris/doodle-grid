var mobile = Modernizr.touch && !$('html.desktop').length;
// var mobile = Modernizr.touch;
var rowCellCount;
var cellColor;
var $lastActiveMarker;

$('.modal a').on('click', function() {
  var $this = $(this);
  
  rowCellCount = $this.attr('data-count');
  createGrid();
  $('.modal').fadeOut(800);
  // $this.addClass('active').siblings().removeClass('active');
  // $('.error').fadeOut(100);
});

// Save Button: Not currently being used
$('.modal button').on('click', function() {
  if (rowCellCount) {
    createGrid();
    $('.modal').fadeOut(800);
  } else {
    $('.error').fadeIn(500);
  }
});

function createGrid() {
  $('body').append('<section class="grid"></section>');

  for (i=0; i<rowCellCount; i++) {
    $('.grid').append('<div class="row"></div>');
    var $row = $('.row:last');

    for (j=0; j<=rowCellCount; j++) {
      if (!mobile && i == 0 && j == 0) {
        $row.append('<div class="cell active marker"></div>');
      } else {
        $row.append('<div class="cell"></div>');
      }
    }
  }
  
  bindEvents();
}

function bindEvents() {
  if (mobile) {
    setUpMobileFunctionality();
  }
  
  if (!mobile) {
    setUpDesktopFunctionality();
  }
}

/* -------------------------------- */
/* ----- Mobile Functionality ----- */
/* -------------------------------- */

function setUpMobileFunctionality() {  
  $('.cell').on('click', function() {
    // If cell is empty, fill it with the selected color
    if (!$(this).hasClass('active')) {
      $(this).addClass('active').attr('data-color', cellColor);
      // If it's active, but has a different color than the selected color, change the color
    } else if ($(this).hasClass('active') && $(this).attr('data-color') != cellColor) {
      $(this).attr('data-color', cellColor)
    }
  });
}

/* --------------------------------- */
/* ----- Desktop Functionality ----- */
/* --------------------------------- */

function setUpDesktopFunctionality() {
  $('body').on('keydown', function(e) {
    var $marker = $('.marker');
    var $markerIndex = $marker.index();
    var $newMarker;
    var keyCode = e.keyCode;
    var key;
    
    // If not mobile, use shift and arrow keys
    switch (keyCode) {
      case 16: key = 'shift';
        break;
      case 37: // Left
        if ($markerIndex != 0) {
          $newMarker = $marker.prev().addClass('active').addClass('marker').attr('data-color', cellColor);
          $marker.removeClass('marker');
        }
        break;
      case 38: // Up
        if ($marker.closest('.row').prev().length) {
          $newMarker = $marker.closest('.row').prev().find('.cell').eq($markerIndex).addClass('active').addClass('marker').attr('data-color', cellColor);
          $marker.removeClass('marker');
        }
        break;
      case 39: // Right
        if ($markerIndex != rowCellCount) {
          $newMarker = $marker.next().addClass('active').addClass('marker').attr('data-color', cellColor);
          $marker.removeClass('marker');
        }
        break;
      case 40: // Down
        if ($marker.closest('.row').next().length) {
          $newMarker = $marker.closest('.row').next().find('.cell').eq($markerIndex).addClass('active').addClass('marker').attr('data-color', cellColor);
          $marker.removeClass('marker');
        }
        break;
      case 49:
      case 97:
        selectColorFromTray(0);
        break;
      case 50:
      case 98:
        selectColorFromTray(1);
        break;
      case 51:
      case 99:
        selectColorFromTray(2);
        break;
      case 52:
      case 100:
        selectColorFromTray(3);
        break;
      case 53:
      case 101:
        selectColorFromTray(4);
        break;
      case 54:
      case 102:
        selectColorFromTray(5);
        break;
      case 55:
      case 103:
        selectColorFromTray(6);
        break;
      case 56:
      case 104:
        selectColorFromTray(7);
        break;
      case 57:
      case 105:
        selectColorFromTray(8);
        break;
      // case 48:
      // case 96:
      //   selectColorFromTray(9);
      //   break;
      default:
        break;
    }
  });
}

function selectColorFromTray(index) {
  var $this = $('.color').eq(index);
  
  $this.addClass('selected').siblings().removeClass('selected');
  cellColor = $this.attr('data-color');
  
  // Marker is only used with arrow key functionality on desktop
  if ($('.marker').length) {
    $('.marker').attr('data-color', cellColor);
  }
}

// Color Tray
$('.color').on('click', function() {
  var index = $(this).index();
  
  selectColorFromTray(index);
});