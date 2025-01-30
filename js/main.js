const menuToggle = document.querySelector(".menu__toggle");
const menuClose = document.querySelector(".menu__close");
const menuNavigation = document.querySelector(".menu__navigation");
const body = document.body;

function checkScreenSize() {
  if (window.innerWidth > 992) {
    // Приховуємо мобільне меню, якщо екран став великим
    menuNavigation.classList.remove("active");
    body.classList.remove("menu-open");
    menuClose.style.display = "none";
    menuToggle.style.display = "none";
  } else {
    menuToggle.style.display = "block";
  }
}

menuToggle.addEventListener("click", () => {
  menuNavigation.classList.add("active");
  body.classList.add("menu-open");
  menuClose.style.display = "block";
  menuToggle.style.display = "none";
});

menuClose.addEventListener("click", () => {
  menuNavigation.classList.remove("active");
  body.classList.remove("menu-open");
  menuClose.style.display = "none";
  menuToggle.style.display = "block";
});

checkScreenSize();

window.addEventListener("resize", checkScreenSize);

// phone

const input = document.querySelector("#phone");

let telInputInstance;

function initTelInput() {
  if (telInputInstance) {
    telInputInstance.destroy();
  }
  if (window.innerWidth <= 992) {
    telInputInstance = window.intlTelInput(input, {
      initialCountry: "it",
      separateDialCode: true,
    });
  }

  if (window.innerWidth > 992) {
    telInputInstance = window.intlTelInput(input, {
      initialCountry: "ie",
      separateDialCode: true,
    });
  }
}

initTelInput();

window.addEventListener("resize", initTelInput);


// slider-range

$(document).ready(function () {
  $("#mounth").ionRangeSlider({
    skin: "round",
    grid: true,
    min: 1,
    max: 12,
    step: 1,
    from: 0,
    values: ["1 month", "3 months", "6 months", "9 months", "12 months"],
    prefix: "",
    onChange: function (data) {
      const selectedMonths = data.from;
      const selectedMoney = $("#money").data("ionRangeSlider").result.from;
      updateEarnings(selectedMonths, selectedMoney);
    },
  });

  $("#money").ionRangeSlider({
    skin: "round",
    grid: true,
    min: 300,
    max: 15000,
    from: 2000,
    step: 735,
    prettify: true,
    onChange: function (data) {
      const selectedMoney = data.from;
      const selectedMonths = $("#mounth").data("ionRangeSlider").result.from;
      updateEarnings(selectedMonths, selectedMoney);
    },
  });

  function updateEarnings(selectedMonths, selectedMoney) {
    const months = [1, 3, 6, 9, 12];
    const monthsValue = months[selectedMonths] || 1;

    const totalEarnings = (selectedMoney * monthsValue * (8600 / 2000)).toFixed(
      0
    );

    $("#totalEarnings").text(totalEarnings);
  }

  //slider
  $(".slider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  });
});
