window.onload = function () {
  
    $("div").on("mouseenter", function() {
  
  $(this).addClass("active").siblings().removeClass("active");
  
    })

}