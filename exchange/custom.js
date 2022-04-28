let currency = {
  KRW: {
    KRW: 1,
    USD: 0.00082,
    VND: 18.76,
    JPY: 0.1,
    CNY: 0.01,
    unit: "원",
  },
  USD: {
    USD: 1,
    KRW: 1217.26,
    VND: 22866.5,
    JPY: 123.62,
    CNY: 6.36,
    unit: "달러",
  },
  JPY: {
    JPY: 1,
    KRW: 9.85,
    USD: 0.01,
    VND: 184.93,
    CNY: 0.05,
    unit: "엔",
  },
  CNY: {
    CNY: 1,
    KRW: 191.47,
    USD: 0.16,
    VND: 3594.92,
    JPY: 19.42,
    unit: "위안",
  },
  VND: {
    VND: 1,
    USD: 0.000044,
    KRW: 0.053,
    JPY: 0.0054,
    CNY: 0.00028,
    unit: "동",
  },
};

let fromList = document.querySelectorAll("#fromList li");
let fromBtn = document.querySelector("#fromBtn");
let fromListShow = document.querySelector("#fromList");

let toList = document.querySelectorAll("#toList li");
let toBtn = document.querySelector("#toBtn");
let toListShow = document.querySelector("#toList");

let fromCurrency = "KRW";
let toCurrency = "USD";

let unitWords = ["", "만", "억", "조", "경"];
let splitUnit = 10000;

fromBtn.addEventListener("click", function () {
  fromToggle();
});
toBtn.addEventListener("click", function () {
  toToggle();
});
function fromToggle() {
  fromListShow.classList.toggle("active");
}
function toToggle() {
  toListShow.classList.toggle("active");
}
function fromClose() {
  fromListShow.classList.remove("active");
}
function toClose() {
  toListShow.classList.remove("active");
}

//리스트에서 국가를 설정
fromList.forEach((menu) =>
  menu.addEventListener("click", function () {
    fromBtn.textContent = this.textContent;
    fromCurrency = this.textContent;
    fromClose();
    convert("from");
  })
);

toList.forEach((menu) =>
  menu.addEventListener("click", function () {
    toBtn.textContent = this.textContent;
    toCurrency = this.textContent;
    toClose();
    convert("from");
  })
);


//양쪽 상자 모두 값을 입력할 수 있도록 type을 나누고 환율을 계산해 출력합니다.
function convert(type) {
  let money = 0;
  if (type == "from") {
    money = document.getElementById("fromInput").value;
    let convertedMoney = money * currency[fromCurrency][toCurrency];
    document.getElementById("toInput").value = convertedMoney;
    renderKoreanNumber(money, convertedMoney);
  } else {
    money = document.getElementById("toInput").value;
    let convertedMoney = money * currency[toCurrency][fromCurrency];
    document.getElementById("fromInput").value = convertedMoney;
    renderKoreanNumber(convertedMoney, money);
  }
}

//입력받은 숫자를 단위 별로 나눕니다.
function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}

//나눠진 숫자를 조, 억, 만 등 단위와 함께 출력해 큰 숫자도 쉽게 읽을 수 있도록 합니다.
function renderKoreanNumber(from, to) {
  document.getElementById("fromNum").textContent =
    readNum(from) + currency[fromCurrency].unit;
  document.getElementById("toNum").textContent =
    readNum(to) + currency[toCurrency].unit;
}