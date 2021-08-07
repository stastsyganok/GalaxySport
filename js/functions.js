function main() {
  var menuIconOpen = document.getElementsByClassName("open")[0];
  var menuIconClose = document.getElementsByClassName("close")[0];
  var menuItems = document.getElementsByClassName("menu");

  menuIconClose.style.display = "none";

  menuIconOpen.onclick = function () {
    this.style.display = "none";
    menuIconClose.style.display = "block";
    menuDisplay("show", menuItems);
  };

  menuIconClose.onclick = function () {
    this.style.display = "none";
    menuIconOpen.style.display = "block";
    menuDisplay("hide", menuItems);
  };

  checkMediaQueries(menuItems);
}

function menuDisplay(state, items) {
  if (state == "show") {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add("show");
    }
  } else {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("show");
    }
  }
}

function checkMediaQueries(items) {
  $(window).resize(function () {
    if ($(window).width() <= 767) {
      var menuIconOpen = document.getElementsByClassName("open")[0];
      var menuIconClose = document.getElementsByClassName("close")[0];

      menuIconClose.style.display = "none";
      menuIconOpen.style.display = "block";
      menuDisplay("hide", items);
    }
  });
}

window.onload = function () {
  main();
};

logoSize = function () {
  var theLogo = $("#thelogo");
  var newImage = new Image();
  newImage.src = theLogo.attr("src");
  var imgWidth = newImage.width;
  var maxScrollDistance = 200;
  maxScrollDistance = Math.min(maxScrollDistance, $(window).height());
  var widthAtMax = 140;
  console.log(imgWidth);
  var widthDiff = imgWidth - widthAtMax;
  var pixelsPerScroll = widthDiff / maxScrollDistance;

  $(window).scroll(function () {
    var scrollTopPos = Math.min($(document).scrollTop(), maxScrollDistance);
    var scrollChangePx = Math.floor(scrollTopPos * pixelsPerScroll);

    var zoomedWidth = imgWidth - scrollChangePx;
    $(".logo").css("width", zoomedWidth);
  });
};

logoSize();

$(".variable").slick({
  // dots: true,
  // infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
  // infinite: true,
  // variableWidth: true,
});

window.addEventListener("load", function (event) {
  var targetClassName = "flex-wrap-anim";
  var defaultDuration = "0.3s";

  var wrapAnimList = [];
  function addWrapAnim(item, duration) {
    var top = item.offsetTop;
    var left = item.offsetLeft;
    setTimeout(function () {
      item.style.position = "absolute";
      item.style.top = top + "px";
      item.style.left = left + "px";

      var wrapAnimDiv = document.createElement("div");
      wrapAnimDiv.classList.add(targetClassName + "-wrapAnim");
      var rect = item.getBoundingClientRect();
      wrapAnimDiv.style.width = rect.width + "px";
      wrapAnimDiv.style.height = rect.height + "px";
      wrapAnimDiv.style.visibility = "hidden";
      wrapAnimDiv["__" + targetClassName + "_pair"] = item;
      wrapAnimDiv["__" + targetClassName + "_duration"] = duration;
      item.parentNode.appendChild(wrapAnimDiv);
      wrapAnimList.push(wrapAnimDiv);
    }, 0);
  }

  var conts = document.getElementsByClassName(targetClassName);
  for (var i = 0, max = conts.length; i < max; i++) {
    var cont = conts[i];
    cont.style.position = "relative";
    var duration = cont.getAttribute("data-duration") || defaultDuration;
    var items = cont.getElementsByTagName("div");
    for (var i = 0, max = items.length; i < max; i++) {
      addWrapAnim(items[i], duration);
    }
  }

  window.addEventListener("resize", function (event) {
    wrapAnimList.forEach(function (wrapAnimDiv) {
      var item = wrapAnimDiv["__" + targetClassName + "_pair"];
      var duration = wrapAnimDiv["__" + targetClassName + "_duration"];
      if (item.offsetTop != wrapAnimDiv.offsetTop) {
        item.style.transition = "all " + duration;
        item.style.top = wrapAnimDiv.offsetTop + "px";
        item.style.left = wrapAnimDiv.offsetLeft + "px";
      } else {
        item.style.transition = "";
        item.style.left = wrapAnimDiv.offsetLeft + "px";
      }
    });
  });
});

function zoomImage(imageForZoom) {
  const smallWidth = 150;
  const smallHeigth = 150;
  const normalWidth = 250;
  const normalHeight = 250;
  imageForZoom.style.width = smallWidth + "px";
  imageForZoom.style.height = smallHeigth + "px";
  $(window).scroll(function (e) {
    let isScrolled = isScrolledIntoView(imageForZoom);
    const currentWidth = imageForZoom.clientWidth;
    if (isScrolled && currentWidth < normalWidth) {
      $(".zoom").animate(
        {
          width: normalWidth + "px",
          height: normalHeight + "px",
        },
        1000
      );
      // imageForZoom.style.width = currWidth + 100 + 'px';
    }
  });
}

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return elemBottom <= docViewBottom && elemTop >= docViewTop;
}

function zoomAllImages() {
  let imagesForZoom = document.querySelectorAll(".zoom");
  for (let i = 0; i < imagesForZoom.length; i++) {
    const image = imagesForZoom[i];
    zoomImage(image);
  }
}
zoomAllImages();
