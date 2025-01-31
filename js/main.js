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

//validation
$('#investmentForm').on('submit', function(e) {
  e.preventDefault();
  let isValid = true;

  // Перевірка полів та виведення помилок
  $('.investment__input').each(function() {
    const input = $(this);
    const value = input.val().trim();
    const id = input.attr('id');
    const errorMessage = {
      'name': "Il nome può contenere solo lettere e spazi.",
      'surname': "Il cognome può contenere solo lettere e spazi.",
      'email': "E-mail non valida.",
      'phone': "Il numero di telefono deve contenere tra 9 e 15 cifre e deve essere un numero valido."
    };

    let isValidField = true;

    // Перевірка імені та прізвища (лише літери та пробіл)
    if ((id === 'name' || id === 'surname') && !/^[A-Za-zÀ-ÿ\s-]+$/.test(value)) {
      isValidField = false;
      setError(input, "Il nome e cognome devono contenere solo lettere e spazi.");
    }
    // Перевірка email
    else if (id === 'email' && !validateEmail(value)) {
      isValidField = false;
      setError(input, "E-mail non valida.");
    }
    else if (id === 'phone' && !validatePhone(value)) {
      isValidField = false;
      setError(input, "Il numero di telefono deve contenere tra 9 e 15 cifre.");
    }
    else if (value === "") {
      isValidField = false;
      setError(input, errorMessage[id]);
    }

    if (isValidField) {
      input.removeClass('invalid');
      $(`.error-${id}`).text('');
    }

    if (!isValidField) {
      isValid = false;
    }
  });

  if (isValid) {
    this.submit();
  }
});

function setError(input, message) {
  input.addClass('invalid');
  $(`.error-${input.attr('id')}`).text(message);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\+?[0-9]{9,15}$/.test(phone);
}


// phone

const input = document.querySelector("#phone");

let telInputInstance;

function initTelInput() {
  if (telInputInstance) {
    telInputInstance.destroy();
  }
  if (window.innerWidth <= 1400) {
    telInputInstance = window.intlTelInput(input, {
      initialCountry: "it",
      separateDialCode: true,
    });
  }

  if (window.innerWidth > 1400) {
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
