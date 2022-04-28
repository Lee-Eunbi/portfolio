//새로고침이 됐을때 스크롤 위치를 페이지 상단으로 변경
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

//메뉴 클릭 시 스크롤 설정
const sections = Array.prototype.slice.call(
  document.querySelectorAll("#container >section")
);
let count = 0;
const menus = Array.prototype.slice.call(
  document.querySelectorAll("#navi > ul > li")
);
menus.forEach((menu, index) =>
  menu.addEventListener("click", (e) => {
    e.preventDefault();
    count = index;
    activation();

    let secTop =
      window.pageYOffset + sections[count].getBoundingClientRect().top;
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: secTop,
    });
  })
);

//스크롤을 따라 사이드바에 표시 되도록 설정, 각 파트 애니메이션 설정
window.addEventListener("scroll", () => {
  let doScroll = window.pageYOffset;
  let top1 = window.pageYOffset + sections[1].getBoundingClientRect().top - 300;
  let top2 = window.pageYOffset + sections[2].getBoundingClientRect().top - 300;
  let top3 = window.pageYOffset + sections[3].getBoundingClientRect().top - 300;
  let top4 = window.pageYOffset + sections[4].getBoundingClientRect().top - 500;
  let bottom = document.querySelector("body").offsetHeight;
  let scrollBottom = screen.height + doScroll;

  const pf = document.querySelector("#portfolio ul");
  const sk = document.querySelectorAll("#skill li");
  const skP = document.querySelector("#skill > p");
  const rgt = document.querySelector("#introduce");
  const vis = document.querySelectorAll(".question");
  const visA = document.querySelectorAll(".answer");

  if (doScroll > 0 && doScroll < top1) {
    menus.forEach((menu) => menu.classList.remove("on"));
    menus[0].classList.add("on");
    sk.forEach((s) => s.classList.remove("rot"));
    skP.classList.remove("rot");
    rgt.classList.remove("rgt");
  } else if (doScroll > top1 && doScroll < top2) {
    menus.forEach((menu) => menu.classList.remove("on"));
    menus[1].classList.add("on");
    sk.forEach((s) => s.classList.add("rot"));
    skP.classList.add("rot");
    rgt.classList.add("rgt");
    pf.classList.remove("mov");
  } else if (doScroll > top2 && doScroll < top3) {
    menus.forEach((menu) => menu.classList.remove("on"));
    menus[2].classList.add("on");
    sk.forEach((s) => s.classList.remove("rot"));
    skP.classList.remove("rot");
    rgt.classList.remove("rgt");
    pf.classList.add("mov");
    vis.forEach((vi) => vi.classList.remove("vis"));
    visA.forEach((va) => va.classList.remove("vis"));
  } else if (doScroll > top3 && doScroll < top4) {
    menus.forEach((menu) => menu.classList.remove("on"));
    menus[3].classList.add("on");
    pf.classList.remove("mov");
    vis.forEach((vi) => vi.classList.add("vis"));
    visA.forEach((va) => va.classList.add("vis"));
  } else if (doScroll > top4 && scrollBottom > bottom) {
    menus.forEach((menu) => menu.classList.remove("on"));
    menus[4].classList.add("on");
  }
});

//네비 메뉴에 on클래스를 추가하는 함수. 토글 형태일시 메뉴를 클릭해도 토글 버튼이 접히도록 하였다.
function activation() {
  menus.forEach((menu) => menu.classList.remove("on"));
  menus[count].classList.add("on");
  if (navi.classList.contains("show")) {
    navi.classList.add("hide"), navi.classList.remove("show");
  }
}

//타이핑효과
const typingText = document.querySelector("#intro .introTxt");
typing(typingText, 50);

function typing(element, speed) {
  const text = element.innerText;
  element.innerText = "";
  let i = 0;
  const timer = setInterval(function () {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}
//커서
const cursor = document.getElementById("cursor");
setInterval(function () {
  if (cursor.innerText == "|") {
    cursor.innerText = "";
  } else {
    cursor.innerText = "|";
  }
}, 700);

//아코디언 qna메뉴
$(document).ready(function () {
  $(".answer").hide();
  $(".question").click(function () {
    $(this)
      .next(".answer")
      .slideToggle("fast")
      .siblings(".answer:visible")
      .slideUp("fast");
    $(this).toggleClass("active").siblings(".question").removeClass("active");
  });
});

//토글메뉴
const navi = document.querySelector("#navi ul");
const btn = document.querySelector("#toggle");
const container = document.querySelector("#container");
const menuLi = document.querySelector("#navi > ul > li > a");

btn.addEventListener("click", () => {
  navi.classList.contains("show")
    ? (navi.classList.remove("show"), navi.classList.add("hide"))
    : (navi.classList.remove("hide"), navi.classList.add("show"));
});

container.addEventListener("click", () => {
  if (navi.classList.contains("show")) {
    navi.classList.add("hide"), navi.classList.remove("show");
  }
});

//detail-modal
const modal = document.querySelector("#detail-modal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.querySelector(".detail-title");
const modalImg = document.querySelector(".detail-image > a");
const modalText = Array.prototype.slice.call(
  document.querySelectorAll(".detail-text li")
);
const items = Array.prototype.slice.call(
  document.querySelectorAll("#portfolio li")
);

items.forEach((item, index) =>
  item.addEventListener("click", () => {
    const num = index + 1;
    modal.style.display = "block";
    if (num == 1) {
      //item1
      modalTitle.innerText = "Portfolio Site(Responsive Web)";
      modalImg.innerHTML = "<img src='img/detail/portfolio_detail.jpg' alt='portfolio'>";
      modalImg.setAttribute("href", "index.html");
      modalText[0].style.display = "block";
    } else if (num == 2) {
      //item2
      modalTitle.innerText = "In Coffee(Responsive Web)";
      modalImg.innerHTML = "<img src='img/detail/incoffee_detail.jpg' alt='incoffee'>";
      modalImg.setAttribute("href", "incoffee/index.html");
      modalText[1].style.display = "block";
    } else if (num == 3) {
      //item3
      modalTitle.innerText = "TINNY OCEAN(Clone Coding)";
      modalImg.innerHTML = "<img src='img/detail/tinnyocean_detail.png' alt='tinnyocean'>";
      modalImg.setAttribute("href", "clonecoding/index.html");
      modalText[2].style.display = "block";
    } else if (num == 4) {
      //item4
      modalTitle.innerText = "Mini Shopping Mall";
      modalImg.innerHTML = "<img src='img/detail/minishop_detail.jpg' alt='MiniShoppingMall'>";
      modalImg.setAttribute("href", "miniShopping/index.html");
      modalText[3].style.display = "block";
    } else if (num == 5) {
      //item5
      modalTitle.innerText = "Todo List";
      modalImg.innerHTML = "<img src='img/detail/none.jpg' alt='none'>";
      modalImg.setAttribute("href", "index.html");
      modalText[4].style.display = "block";
    }
    else if (num == 6) {
      //item5
      modalTitle.innerText = "Analog Clock";
      modalImg.innerHTML = "<img src='img/detail/clock_detail.jpg' alt='clock'>";
      modalImg.setAttribute("href", "analog clock/Analog Clock.html");
      modalText[5].style.display = "block";
    }
    else if (num == 7) {
      //item5
      modalTitle.innerText = "환율계산기(수정중)";
      modalImg.innerHTML = "<img src='img/detail/exchange_detail.jpg' alt='exchange'>";
      modalImg.setAttribute("href", "exchange/index.html");
      modalText[6].style.display = "block";
    }
    else if (num == 8) {
      //item5
      modalTitle.innerText = "Block Game";
      modalImg.innerHTML = "<img src='img/detail/block_detail.jpg' alt='none'>";
      modalImg.setAttribute("href", "blockgame/block.html");
      modalText[7].style.display = "block";
    }
  })
);

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  modalText.forEach((t) => (t.style.display = "none"));
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
    modalText.forEach((t) => (t.style.display = "none"));
  }
});
