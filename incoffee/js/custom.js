//새로고침 시 스크롤을 맨 위로
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};

//헤더 속성 변경
const indHeader = document.querySelector("#header");
const txt = document.querySelector("#header p");
const indexBtn = document.querySelector("#start");
const logo = document.querySelector("#header .logo");
function index() {
  txt.style.animation = "fadeout 1s forwards";
  indexBtn.style.animation = "fadeout 1s forwards";
  indHeader.style.height = "20rem";
  logo.style.top = "45%";
  logo.style.animation = "font 1s";
}

//버튼 클릭 시 헤더 속성 변경
document.getElementById("start").addEventListener("click", index);

//화면이 768px 이상일 경우 스크롤 내릴때 헤더 변경
var winSize = window.matchMedia("screen and (min-width: 768px)");
if (winSize.matches) {
  window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;
    if (scroll > 50) {
      index();
    }
  });
}

//scrollTop 버튼
function moveTop() {
  window.scrollTo({
    behavior: "smooth",
    left: 0,
    top: 0,
  });
}
const topBtn = document.querySelector("#topBtn");
window.addEventListener("scroll", () => {
  let scroll = window.pageYOffset;
  if (scroll > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", moveTop);

//화면이 769px 이상일 경우 네비가 화면에서 안보이면 페이지 상단에 고정
const navi = document.querySelector("#nav");
if (winSize.matches) {
  // winSize = window.matchMedia("screen and (min-width: 769px)");
  window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset;
    let aTop = window.pageYOffset + navi.getBoundingClientRect().top;
    if (scroll > 320) {
      navi.style.width = "100%";
      navi.style.position = "fixed";
      navi.style.top = "0";
      navi.style.background = "#eee";
      navi.style.color = "#555";
    } else {
      navi.style.width = "80%";
      navi.style.position = "relative";
      navi.style.background = "rgba(255, 255, 255, 0.3)";
      navi.style.color = "#fff";
    }
  });
}


const hisBtn = document.querySelector("#hisBtn");
const varBtn = document.querySelector("#varBtn");
const proBtn = document.querySelector("#proBtn");
const history = document.getElementById("history");
const varieties = document.getElementById("varieties");
const production = document.getElementById("production");

//767px 이하의 화면에서 페이지 로드 시 스크롤을 가장 위로 이동시키고 토글메뉴를 닫는다. 768px 이상의 화면에서는 네비게이션 바가 화면 최상단에 위치하도록 한다.
if(window.matchMedia("screen and (min-width: 767px)").matches){
  hisBtn.addEventListener("click", historyLoad);
  varBtn.addEventListener("click", varietiesLoad);
  proBtn.addEventListener("click", productionLoad);
  history.addEventListener("click", historyLoad);
  varieties.addEventListener("click", varietiesLoad);
  production.addEventListener("click", productionLoad);
  $("#nav").show();
} else{
  hisBtn.addEventListener("click", () => {
    $("#main").load("history.html");
    moveTop();
  });
  varBtn.addEventListener("click", () => {
    $("#main").load("varieties.html");
    moveTop();
  });
  proBtn.addEventListener("click", () => {
    $("#main").load("production.html");
    moveTop();
  });
  history.addEventListener("click", () => {
    $("#main").load("history.html");
    $("#nav").hide();
    document.getElementById("navPanelToggle").innerHTML = "<i class='fas fa-bars'></i>";
    moveTop();
  });
  varieties.addEventListener("click", () => {
    $("#main").load("varieties.html");
    $("#nav").hide();
    document.getElementById("navPanelToggle").innerHTML = "<i class='fas fa-bars'></i>";
    moveTop();
  });
  production.addEventListener("click", () => {
    $("#main").load("production.html");
    $("#nav").hide();
    document.getElementById("navPanelToggle").innerHTML = "<i class='fas fa-bars'></i>";
    moveTop();
  });
}

//콘텐츠 페이지 로드
function historyLoad() {
  $("#main").load("history.html");
  window.scrollTo({
    behavior: "smooth",
    top: 320,
  });
}
function varietiesLoad() {
  $("#main").load("varieties.html");
  window.scrollTo({
    behavior: "smooth",
    top: 320,
  });
}
function productionLoad() {
  $("#main").load("production.html");
  window.scrollTo({
    behavior: "smooth",
    top: 320,
  });
}


//메뉴에 active 클래스 추가
const act = document.querySelectorAll(".menu > li");
act.forEach((li) =>
  li.addEventListener("click", () => {
    act.forEach((li) => li.classList.remove("active"));
    li.classList.add("active");
  })
);

//toggle 버튼
function toggleBtn() {
  if ($("#nav").css("display") == "none") {
    $("nav").show();
    document.getElementById("navPanelToggle").innerHTML =
      "<i style='color: #784e04'; class='fas fa-times'></i>";
  } else {
    $("nav").hide();
    document.getElementById("navPanelToggle").innerHTML =
      "<i class='fas fa-bars'></i>";
  }
}
document.getElementById("navPanelToggle").addEventListener("click", toggleBtn);

