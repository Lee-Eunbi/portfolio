const wrap = document.querySelector("#wrap");
const login = document.querySelector(".loginBtn");

const loginClose = document.querySelector("#loginModal .close");
const loginModal = document.querySelector("#loginModal");
const loginPage = document.querySelector("#joinModal h3 a");

const joinClose = document.querySelector("#joinModal .close");
const joinModal = document.querySelector("#joinModal");
const joinPage = document.querySelector("#loginModal h3 a");

let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginModal button");
const joinBtn = document.querySelector("#joinModal button");

const joinName = document.querySelector("#joinName");
const joinEmail = document.querySelector("#joinEmail");
const joinPassword = document.querySelector("#joinPassword");
const joinPasswordCheck = document.querySelector("#joinPasswordCheck");

const nameError = document.querySelector(".nameError");
const emailError = document.querySelector(".emailError");
const passwordError = document.querySelector(".passwordError");

// @, . 등 유효한 형식의 이메일인지 확인하기 위한 변수
let re =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//가입된 유저 데이터
let users = [
  {
    nickname: "ADMIN",
    mail: "admin@admin.com",
    pw: "admin",
  },
  {
    nickname: "user1",
    mail: "user1@user1.com",
    pw: "user1",
  },
  {
    nickname: "user2",
    mail: "user2@user2.com",
    pw: "user2",
  },
  {
    nickname: "user3",
    mail: "user3@user3.com",
    pw: "user3",
  },
];
//창이 닫히거나 이동 시 입력한 값과 확인메세지 초기화
function clearValues() {
  joinName.value = null;
  joinEmail.value = null;
  joinPassword.value = null;
  joinPasswordCheck.value = null;
  nameError.innerHTML = "4자 이상 10자 미만";
  nameError.style.color = "#666";
  emailError.style.display = "none";
  passwordError.style.display = "none";
  loginEmail.value = null;
  loginPassword.value = null;
}

//로그인창과 회원가입창을 여닫고 이동하는 코드. 창이 열렸을때는 바깥요소의 스크롤 기능이 사라지도록 전체를 감싸는 요소에 클래스 추가
function loginShow() {
  wrap.classList.add("stop");
  loginModal.style.display = "block";
}
function loginHide() {
  wrap.classList.remove("stop");
  loginModal.style.display = "none";
  clearValues();
}
function joinShow() {
  joinModal.style.display = "block";
}
function joinHide() {
  wrap.classList.remove("stop");
  joinModal.style.display = "none";
  clearValues();
}

login.addEventListener("click", loginShow);

loginClose.addEventListener("click", loginHide);
loginPage.addEventListener("click", () => {
  joinHide();
  loginShow();
});

joinClose.addEventListener("click", joinHide);
joinPage.addEventListener("click", () => {
  loginHide();
  joinShow();
});

//로그인 유효성 검사. admin 계정인지, 기존 유저 정보와 일치하는지, 올바른 형식의 이메일인지 등
loginBtn.addEventListener("click", userLogin);

function userLogin() {
  switch (true) {
    case loginEmail.value == "admin@admin.com" &&
      loginPassword.value == "admin": {
      login.style.color = "#fc9823";
      login.innerHTML =
        "<strong><i class='fas fa-user-cog' id='users'></i>" +
        users[0].nickname +
        "</strong>";
      loginHide();
      break;
    }
    case loginEmail.value.length != 0 &&
      loginPassword.value.length != 0 &&
      re.test(loginEmail.value): {
      for (let i = 0; i < users.length; i++) {
        if (loginEmail.value == users[i].mail) {
          if (loginPassword.value == users[i].pw) {
            login.style.color = "#fc9823";
            login.innerHTML =
              "<strong><i class='fa fa-user-circle'></i>" +
              users[i].nickname +
              "</strong>";
            loginHide();
            return true;
          } else {
            alert("이메일/비밀번호가 일치하지 않습니다.");
            return false;
          }
        }
      }
      alert("이메일/비밀번호가 일치하지 않습니다.");
      break;
    }
    case loginEmail.value.length == 0: {
      alert("이메일을 입력하세요.");
      break;
    }
    case loginPassword.value.length == 0: {
      alert("비밀번호를 입력하세요.");
      break;
    }
    default: {
      alert("이메일/비밀번호가 일치하지 않습니다.");
      break;
    }
  }
}

//회원가입 유효성 검사(닉네임 중복 확인, 글자수, 이메일 중복확인, 비밀번호 확인 일치여부를 확인하고 조건에 만족할 시 사용이 가능함을 알리는 텍스트를 띄우고 각 항목의 status를 1로 설정합니다.)
joinName.addEventListener("blur", nameCheck);
joinEmail.addEventListener("blur", emailCheck);
joinPasswordCheck.addEventListener("keyup", passwordCheck);

let nameStatus = 0;
let emailStatus = 0;
let passwordStatus = 0;
function nameCheck(e) {
  for (let i = 0; i < users.length; i++) {
    if (e.target.value == users[i].nickname) {
      nameError.innerHTML = "이미 존재하는 닉네임입니다.";
      nameError.style.color = "red";
      nameStatus = 0;
      return false;
    } else if (e.target.value.length > 0 && e.target.value.length < 4) {
      nameError.innerHTML = "닉네임은 4자 이상이어야 합니다.";
      nameError.style.color = "red";
      nameStatus = 0;
    } else if (e.target.value.length >= 10) {
      nameError.innerHTML = "닉네임은 10자 미만이어야 합니다.";
      nameError.style.color = "red";
      nameStatus = 0;
    } else if (e.target.value.length == 0) {
      nameError.innerHTML = "4자 이상";
      nameError.style.color = "#666";
      nameStatus = 0;
    } else {
      nameError.innerHTML = "사용가능한 닉네임입니다.";
      nameError.style.color = "blue";
      nameStatus = 1;
    }
  }
}

function emailCheck(e) {
  for (let i = 0; i < users.length; i++) {
    if (e.target.value == 0) {
      emailError.style.display = "none";
    } else if (e.target.value == users[i].mail) {
      emailError.innerHTML = "이미 가입된 이메일입니다.";
      emailError.style.color = "red";
      emailError.style.display = "block";
      emailStatus = 0;
      return false;
    } else if (!re.test(e.target.value)) {
      emailError.innerHTML = "잘못된 형식의 이메일입니다.";
      emailError.style.color = "red";
      emailError.style.display = "block";
      emailStatus = 0;
    } else {
      emailError.innerHTML = "사용가능한 이메일입니다.";
      emailError.style.color = "blue";
      emailError.style.display = "block";
      emailStatus = 1;
    }
  }
}

function passwordCheck(e) {
  if (e.target.value == 0) {
    passwordError.style.display = "none";
  } else if (joinPassword.value == joinPasswordCheck.value) {
    passwordError.innerHTML = "비밀번호가 일치합니다.";
    passwordError.style.color = "blue";
    passwordError.style.display = "block";
    passwordStatus = 1;
    return false;
  } else {
    passwordError.innerHTML = "비밀번호가 일치하지 않습니다.";
    passwordError.style.color = "red";
    passwordError.style.display = "block";
    passwordStatus = 0;
  }
}
//가입 버튼을 클릭하면 빈 칸이 있는지, 위의 조건에 만족하지 못한 항목이 있는지를 다시 한번 체크하고 경고창을 띄운다. 모든 조건이 만족한다면 유저리스트 객체에 새로 가입한 회원 정보를 추가하고 로그인창으로 이동합니다.
joinBtn.addEventListener("click", alertCheck);
function alertCheck() {
  switch (true) {
    case joinName.value.length == 0: {
      alert("사용할 닉네임을 입력하세요.");
      break;
    }
    case joinEmail.value.length == 0: {
      alert("사용할 이메일을 입력하세요.");
      break;
    }
    case joinPassword.value.length == 0: {
      alert("사용할 비밀번호를 입력하세요.");
      break;
    }
    case joinPasswordCheck.value.length == 0: {
      alert("비밀번호를 한번 더 입력하세요.");
      break;
    }
    case nameStatus != 1: {
      alert("닉네임을 확인하세요.");
      break;
    }
    case emailStatus != 1: {
      alert("이메일을 확인하세요.");
      break;
    }
    case passwordStatus != 1: {
      alert("비밀번호를 확인하세요.");
      break;
    }
    default: {
      let add = [
        {
          nickname: joinName.value,
          mail: joinEmail.value,
          pw: joinPassword.value,
        },
      ];
      users.push.apply(users, add);
      alert("회원가입이 완료 되었습니다.");
      joinModal.style.display = "none";
      loginModal.style.display = "block";
      break;
    }
  }
}
let winSize = window.matchMedia("screen and (min-width: 768px)");
if (winSize.matches) {
  //화면 사이즈가 768px 이상일 때에만 이벤트가 발생합니다.
  window.addEventListener("scroll", () => {
    //picSection 글자 등장 이벤트
    let doScroll = window.pageYOffset;
    const picSection = document.querySelector("#picSection");
    const picText = document.querySelectorAll("#picSection a");
    const textOn =
      window.pageYOffset + picSection.getBoundingClientRect().top - 300;

    if (doScroll > textOn) {
      picText.forEach((t) => t.classList.add("on"));
    }

    //textSection 순차적으로 글자가 나타나게
    const textSection = document.querySelector("#textSection");
    const title = document.querySelector("#textSection h3");
    const subTitle = document.querySelector("#textSection span");
    const text = document.querySelector("#textSection p");
    const moreBtn = document.querySelector("#textSection button");
    const titleMov =
      window.pageYOffset + textSection.getBoundingClientRect().top - 600;
    const subMov =
      window.pageYOffset + textSection.getBoundingClientRect().top - 500;
    const textMov =
      window.pageYOffset + textSection.getBoundingClientRect().top - 400;
    const btnMov =
      window.pageYOffset + textSection.getBoundingClientRect().top - 300;

    if (doScroll > titleMov) {
      title.classList.add("title");
    }
    if (doScroll > subMov) {
      subTitle.classList.add("subTitle");
    }
    if (doScroll > textMov) {
      text.classList.add("text");
    }
    if (doScroll > btnMov) {
      moreBtn.classList.add("moreBtn");
    }
  });
}

//모바일버전 toggle메뉴
const toggleBtn = document.querySelector("#toggle");
const side = document.querySelector(".side");

toggleBtn.addEventListener("click", () => {
  wrap.classList.toggle("stop");
  toggleBtn.classList.toggle("toggleBtn");
  side.classList.toggle("menu");
});

//모바일 화면에서 아코디언 서브 메뉴
const arrow = document.querySelectorAll(".gnb > li span");
for (let i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", () => {
    const subMenu = arrow[i].nextElementSibling;
    subMenu.classList.toggle("show");
    if (subMenu.classList.contains("show")) {
      arrow[i].style.transform = "rotate(135deg)";
      arrow[i].style.top = "1.3rem";
    } else {
      arrow[i].style.transform = "rotate(-45deg)";
      arrow[i].style.top = "1.5rem";
    }
  });
}

//메뉴 클릭시 active효과
const naviActive = document.querySelectorAll(".gnb > li");
naviActive.forEach((na) =>
  na.addEventListener("click", () => {
    naviActive.forEach((n) => n.classList.remove("active"));
    na.classList.add("active");
  })
);

//토글 형태의 메뉴일 때 메뉴를 클릭하면 메뉴창이 닫히는 이벤트
const navi = document.querySelectorAll(".gnb > li a");
const subMenu = document.querySelectorAll(".sub");
navi.forEach((nav) =>
  nav.addEventListener("click", () => {
    side.classList.remove("menu");
    wrap.classList.remove("stop");
    toggleBtn.classList.remove("toggleBtn");
  })
);
subMenu.forEach((sub) =>
  sub.addEventListener("click", () => {
    side.classList.remove("menu");
    wrap.classList.remove("stop");
    toggleBtn.classList.remove("toggleBtn");
  })
);
