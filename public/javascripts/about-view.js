$(document).ready(function() {
  /* Push the body and the nav over by 285px over */
  $('.icon-menu i').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  
  $('.menu').mouseleave(function() {
    $('.menu').animate({


      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });

});


