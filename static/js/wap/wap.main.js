// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7();
var mySwiper = myApp.swiper(".swiper-container",{
   speed:400,
    spaceBetween:100,
    loop:true,
    pagination:".swiper-pagination",
    paginationType:"bullets",
    paginationClickable:true
});