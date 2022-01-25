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
const aboutMeWrapper = document.querySelector(".about-me_wrapper");
const aboutMeContent = document.querySelector(".about-me_content");
const connectContent = document.querySelector(".connect_content");

function aboutMe() {
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

function aboutMeCloseFunc() {
  aboutMeWrapper.classList.add("about-me_wrapper--close");
  aboutMeContent.classList.add("about-me_content--close");
  connectContent.classList.add("connect_content--close");
}

// Modal
function modal() {
  const modals = document.querySelectorAll(".modal");
  const modalBtns = document.querySelectorAll(".modal-btn");
  const modalCloseBtns = document.querySelectorAll(".modal_close");

  modalBtns.forEach((item) => {
    item.addEventListener("click", function (e) {
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.paddingRight = "16px";
      e.preventDefault();
      modals[0].classList.remove("modal--close");
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      modals.forEach((modal) => {
        document.querySelector("body").style.overflow = "scroll";

        modal.classList.add("modal--close");
      });
    });
  });

  modalCloseBtns[0].addEventListener("click", () => {
    document.querySelector("body").style.paddingRight = "0";
  });
}

// Form

function form() {
  const connectForm = document.forms.header_form;
  const userName = connectForm[0];
  const userEmail = connectForm[1];
  const userTel = connectForm[2];
  const submit = connectForm[4];

  const modalForm = document.forms.modal_form;
  const modalUserName = modalForm[0];
  const modalUserEmail = modalForm[1];
  const modalUserTel = modalForm[2];
  const modalSubmit = modalForm[4];

  const buttons = document.querySelectorAll(".connect_form_btn");
  const forms = document.querySelectorAll(".connect_form");
  const sendMailText = document.querySelector(".sendmail-text");

  buttons.forEach((btn) => {
    btn.disabled = true;
  });

  // field Name
  noNum(userName);
  noNum(modalUserName);

  nameValidate(userName, submit);
  nameValidate(modalUserName, modalSubmit);

  // field Email
  emailValidate(userEmail, submit);
  emailValidate(modalUserEmail, modalSubmit);

  // field Tel
  noLetter(userTel);
  noLetter(modalUserTel);
  maskPhone("#tel", "+7(___)___-__-__");
  maskPhone("#modalTel", "+7(___)___-__-__");

  // Fetch

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let url = "send_mail.php";

      sendMail(this);

      async function sendMail(form) {
        const modal = document.querySelector(".modal-sendmail");
        let formData = new FormData(form);
        fetch(url, {
          method: "post",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              modal.classList.remove("modal--close");
              aboutMeCloseFunc();
              sendMailText.textContent = "Ваше письмо отправлено успешно!";
              form.reset();
            } else {
              sendMailText.textContent = "Что то пошло не так...";
              throw new Error(`Error ${response.status}`);
            }
          })
          .catch((error) => {
            console.error("Ошибка:", error);
          });
      }
    });
  });

  // Auxiliary functions

  function nameValidate(inpit, button) {
    inpit.addEventListener("focusout", () => {
      if (!inpit.value) {
        inpit.value = "";
        button.disabled = true;
        return inpit.setAttribute(
          "placeholder",
          " Поле не должно быть пустым!"
        );
      } else {
        inpit.value = firstLetterUppercase(inpit);
        button.disabled = false;
      }
    });
  }

  function emailValidate(input, button) {
    input.addEventListener("focusout", validate);

    function validate() {
      let email = input.value;
      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      if (email.match(pattern)) {
        button.disabled = false;
        return;
      } else {
        button.disabled = true;
        input.value = "";
        return input.setAttribute("placeholder", "Введите корректный Email!");
      }
    }
  }

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
}
mobileMenu();
aboutMe();
modal();
form();
