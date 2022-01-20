// Slider
const swiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Mobile-menu
function mobileMenu() {
  const menuTrigger = document.querySelector(".menu-trigger");
  const headerNav = document.querySelector(".header_nav");
  const triggerSpans = document.querySelectorAll(".menu-trigger-span");

  menuTrigger.addEventListener("click", () => {
    if (!headerNav.classList.contains("header_nav--active")) {
    }

    headerNav.classList.toggle("header_nav--active");
    triggerSpans.forEach((item) => {
      item.classList.toggle("menu-trigger-span--active");
    });
  });
}

// About me
function aboutMe() {
  const aboutMeWrapper = document.querySelector(".about-me_wrapper");
  const aboutMeContent = document.querySelector(".about-me_content");
  const connectContent = document.querySelector(".connect_content");
  const aboutMeClose = document.querySelector(".about-me_close");
  const btnAboutMe = document.querySelector(".btn_about-me");

  btnAboutMe.addEventListener("click", aboutMeOpen);

  aboutMeClose.addEventListener("click", aboutMeCloseFunc);

  function aboutMeOpen() {
    aboutMeWrapper.classList.remove("about-me_wrapper--close");
    aboutMeContent.classList.remove("about-me_content--close");
    connectContent.classList.remove("connect_content--close");
  }

  function aboutMeCloseFunc() {
    aboutMeWrapper.classList.add("about-me_wrapper--close");
    aboutMeContent.classList.add("about-me_content--close");
    connectContent.classList.add("connect_content--close");
  }
}

// Close description
function closeDescription() {
  const btnCloseDiscriptions = document.querySelectorAll(
    ".btn_close-discription"
  );

  btnCloseDiscriptions.forEach((button) => {
    button.addEventListener("click", () => {
      let parent = button.parentElement;
      parent.classList.toggle("img-block--active");
      if (parent.classList.contains("img-block--active")) {
        button.classList.remove("btn_close-discription--open");
        button.classList.add("btn_close-discription--close");
      } else {
        button.classList.add("btn_close-discription--open");
        button.classList.remove("btn_close-discription--close");
      }
    });
  });
}

// Modal
function modal() {
  const modal = document.querySelector(".modal");

  const modalBtns = document.querySelectorAll(".modal-btn");
  const modalClose = document.querySelector(".modal_close");

  modalBtns.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("modal--close");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.add("modal--close");
  });
}

// Form

function form() {
  const connectForm = document.forms.header_form;
  const modalForm = document.forms.modal_form;
  const userName = connectForm[0];
  const userEmail = connectForm[1];
  const userTel = connectForm[2];
  const textarea = connectForm[3];
  const submit = connectForm[4];

  noNum(userName);
  noLetter(userTel);

  userName.addEventListener("change", () => {
    if (!userName.value) {
      userName.value = "";
    } else {
      userName.value = firstLetterUppercase(userName);
    }
  });

  userEmail.addEventListener("change", validate);

  function validate() {
    let email = userEmail.value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.match(pattern)) {
      submit.disabled = false;
      return;
    } else {
      submit.disabled = true;
      userEmail.value = "";
      return userEmail.setAttribute("placeholder", "Введите корректный Email!");
    }
  }

  maskPhone("#tel", "+7(___)___-__-__");

  function noNum(input) {
    input.addEventListener("keyup", function () {
      this.value = this.value.replace(/[0-9]/g, "");
    });
  }
  function noLetter(input) {
    input.addEventListener("keyup", function () {
      this.value = this.value.replace(/[A-Za-zА-Яа-яЁё]/g, "");
    });
  }

  function firstLetterUppercase(input) {
    let text = input.value;

    if (text != "") {
      let nameArray = text.split("");
      let [firstLetter, ...otherLetter] = nameArray;
      return (text = `${firstLetter.toUpperCase()}${otherLetter.join("")}`);
    } else {
      return;
    }
  }
  connectForm.reset();
}
mobileMenu();
aboutMe();
closeDescription();
modal();
form();
