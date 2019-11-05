var rowCellCount,cellColor,$lastActiveMarker,mobile=Modernizr.touch&&!$("html.desktop").length;function createGrid(){for($("body").append('<section class="grid"></section>'),i=0;i<rowCellCount;i++){$(".grid").append('<div class="row"></div>');var e=$(".row:last");for(j=0;j<=rowCellCount;j++)mobile||0!=i||0!=j?e.append('<div class="cell"></div>'):e.append('<div class="cell active marker"></div>')}bindEvents()}function bindEvents(){mobile&&setUpMobileFunctionality(),mobile||setUpDesktopFunctionality()}function setUpMobileFunctionality(){$(".cell").on("click",function(){$(this).hasClass("active")?$(this).hasClass("active")&&$(this).attr("data-color")!=cellColor&&$(this).attr("data-color",cellColor):$(this).addClass("active").attr("data-color",cellColor)})}function setUpDesktopFunctionality(){$("body").on("keydown",function(e){var a=$(".marker"),o=a.index();switch(e.keyCode){case 16:"shift";break;case 37:0!=o&&(a.prev().addClass("active").addClass("marker").attr("data-color",cellColor),a.removeClass("marker"));break;case 38:a.closest(".row").prev().length&&(a.closest(".row").prev().find(".cell").eq(o).addClass("active").addClass("marker").attr("data-color",cellColor),a.removeClass("marker"));break;case 39:o!=rowCellCount&&(a.next().addClass("active").addClass("marker").attr("data-color",cellColor),a.removeClass("marker"));break;case 40:a.closest(".row").next().length&&(a.closest(".row").next().find(".cell").eq(o).addClass("active").addClass("marker").attr("data-color",cellColor),a.removeClass("marker"));break;case 49:case 97:selectColorFromTray(0);break;case 50:case 98:selectColorFromTray(1);break;case 51:case 99:selectColorFromTray(2);break;case 52:case 100:selectColorFromTray(3);break;case 53:case 101:selectColorFromTray(4);break;case 54:case 102:selectColorFromTray(5);break;case 55:case 103:selectColorFromTray(6);break;case 56:case 104:selectColorFromTray(7);break;case 57:case 105:selectColorFromTray(8)}})}function selectColorFromTray(e){var a=$(".color").eq(e);a.addClass("selected").siblings().removeClass("selected"),cellColor=a.attr("data-color"),$(".marker").length&&$(".marker").attr("data-color",cellColor)}$(".modal a").on("click",function(){var e=$(this);rowCellCount=e.attr("data-count"),createGrid(),$(".modal").fadeOut(800)}),$(".modal button").on("click",function(){rowCellCount?(createGrid(),$(".modal").fadeOut(800)):$(".error").fadeIn(500)}),$(".color").on("click",function(){selectColorFromTray($(this).index())});