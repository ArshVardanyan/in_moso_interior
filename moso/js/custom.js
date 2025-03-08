
(function ($) {

  "use strict";

  // HERO SLIDE
  $('.hero-slide').backstretch([
    "images/slideshow/white-wall-living-room-have-sofa-decoration-3d-rendering.jpg",
    "images/slideshow/interior-wall-mockup-with-sofa-cabinet-living-room-with-empty-white-wall-background-3d-rendering.jpg",
    "images/slideshow/wood-sideboard-living-room-interior-with-copy-space.jpg"
  ], { duration: 2000, fade: 750 });

  // REVIEWS CAROUSEL
  $('.reviews-carousel').owlCarousel({
    items: 3,
    loop: true,
    dots: false,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  })

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);





async function getMaterial(arg) {
  let res = await fetch(arg);
  let data = await res.json();
  // console.log(data)
  drawMaterials(data);
  drawPagination(data);
}







function drawPagination(arg) {
  const pagi = document.getElementById("paginate");
  let htmlX = "";
  let currentPage = window.location.search.substring(6) || "1";
  if (currentPage == 1) {
    for (let itm in arg) {
      let page = itm.substring(5);
      htmlX += `
          <li class="page-item ${page == currentPage ? "active" : ""}" aria-current="page">
              <a class="page-link" href="?${itm}">${page}</a>
          </li>
        `;
    }
    htmlX += `
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `
  }else if(currentPage == Object.keys(arg)[Object.keys(arg).length-1].substring(5)){
    htmlX += `
      <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
          </a>
      </li>
    `
    for (let itm in arg) {
      let page = itm.substring(5);
      htmlX += `
          <li class="page-item ${page == currentPage ? "active" : ""}" aria-current="page">
              <a class="page-link" href="?${itm}">${page}</a>
          </li>
        `;
    }
   
  }else {
      htmlX += `
      <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
          </a>
      </li>
    `
    for (let itm in arg) {
      let page = itm.substring(5);
      htmlX += `
          <li class="page-item ${page == currentPage ? "active" : ""}" aria-current="page">
              <a class="page-link" href="?${itm}">${page}</a>
          </li>
        `;
    }
    htmlX += `
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `
  }
  pagi.innerHTML += htmlX;
}


function drawMaterials(arg){
  const drawingPage = window.location.search.substring(1);
  const drawArea = document.getElementById("area");
  let htmlX= "";
  arg[drawingPage].forEach(thing => {
    htmlX += `
      <div class="col-lg-6 col-12">
          <div class="shop-thumb">
              <div class="shop-image-wrap">
                  <a href="shop-detail.html">
                      <img src="images/shop/${thing.image}" class="shop-image img-fluid" alt="">
                  </a>

                  <div class="shop-icons-wrap">
                      <div class="shop-icons d-flex flex-column align-items-center">
                          <a href="#" class="shop-icon bi-heart"></a>

                          <a href="#" class="shop-icon bi-bookmark"></a>
                      </div>

                      <p class="shop-pricing mb-0 mt-3">
                          <span class="badge custom-badge">$${thing.price}</span>
                      </p>
                  </div>

                  <div class="shop-btn-wrap">
                      <a href="shop-detail.html" class="shop-btn custom-btn btn d-flex align-items-center align-items-center">Learn more</a>
                  </div>
              </div>

              <div class="shop-body">
                  <h4>${thing.keyName}</h4>
              </div>
          </div>
      </div>
    `
  });
  drawArea.innerHTML += htmlX;
}

console.log(window.location)

if(window.location.pathname.match("shop-listing.html")){

  getMaterial("data/data.json");
}
