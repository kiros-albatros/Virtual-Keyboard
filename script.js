const engKeys = {
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  Backspace: "Backspace",

  Tab: "Tab",
  KeyQ: "Q",
  KeyW: "W",
  KeyE: "E",
  KeyR: "R",
  KeyT: "T",
  KeyY: "Y",
  KeyU: "U",
  KeyI: "I",
  KeyO: "O",
  KeyP: "P",
  BracketLeft: "[",
  BracketRight: "]",
  Delete: "Delete",

  CapsLock: "CapsLock",
  KeyA: "A",
  KeyS: "S",
  KeyD: "D",
  KeyF: "F",
  KeyG: "G",
  KeyH: "H",
  KeyJ: "J",
  KeyK: "K",
  KeyL: "L",
  Semicolon: ";",
  Quote: "'",
  Backslash: "\\",
  Enter: "Enter",

  ShiftLeft: "Shift",
  KeyZ: "Z",
  KeyX: "X",
  KeyC: "C",
  KeyV: "V",
  KeyB: "B",
  KeyN: "N",
  KeyM: "M",
  Comma: ",",
  Period: ".",
  Slash: "/",
  ArrowUp: "Up",
  ShiftRight: "Shift",

  ControlLeft: "Ctrl",
  MetaLeft: "Win",
  AltLeft: "Alt",
  Space: "Space",
  AltRight: "Alt",
  ControlRight: "Ctrl",

  ArrowLeft: "Left",
  ArrowDown: "Down",
  ArrowRight: "Right",
};

const ruKeys = {
  Backquote: "`",
  Digit1: "1",
  Digit2: "2",
  Digit3: "3",
  Digit4: "4",
  Digit5: "5",
  Digit6: "6",
  Digit7: "7",
  Digit8: "8",
  Digit9: "9",
  Digit0: "0",
  Minus: "-",
  Equal: "=",
  Backspace: "Backspace",

  Tab: "Tab",
  KeyQ: "Й",
  KeyW: "Ц",
  KeyE: "У",
  KeyR: "К",
  KeyT: "Е",
  KeyY: "Н",
  KeyU: "Г",
  KeyI: "Ш",
  KeyO: "Щ",
  KeyP: "З",
  BracketLeft: "Х",
  BracketRight: "Ъ",
  Delete: "Delete",

  CapsLock: "CapsLock",
  KeyA: "Ф",
  KeyS: "Ы",
  KeyD: "В",
  KeyF: "А",
  KeyG: "П",
  KeyH: "Р",
  KeyJ: "О",
  KeyK: "Л",
  KeyL: "Д",
  Semicolon: "Ж",
  Quote: "Э",
  Backslash: "\\",
  Enter: "Enter",

  ShiftLeft: "Shift",
  KeyZ: "Я",
  KeyX: "Ч",
  KeyC: "С",
  KeyV: "М",
  KeyB: "И",
  KeyN: "Т",
  KeyM: "Ь",
  Comma: "Б",
  Period: "Ю",
  Slash: ".",
  ArrowUp: "Up",
  ShiftRight: "Shift",

  ControlLeft: "Ctrl",
  MetaLeft: "Win",
  AltLeft: "Alt",
  Space: "Space",
  AltRight: "Alt",
  ControlRight: "Ctrl",

  ArrowLeft: "Left",
  ArrowDown: "Down",
  ArrowRight: "Right",
};

let currentKeys = engKeys;
let shiftOn = false;
let CapsLock = false;
let ru = false;
let AltLeftOn = false;

//console.log(localStorage["rus"]);
if (localStorage["rus"] == "true") {
  currentKeys = ruKeys;
} else {
  currentKeys = engKeys;
}

//отрисовка виртуальной клавиатуры

window.onload = function (event) {
  var body = document.querySelector("body");
  var textarea = document.createElement("textarea");
  body.appendChild(textarea);
  var keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  body.appendChild(keyboard);
  var describe = document.createElement("p");
  describe.innerHTML = "Нажмите Alt+Shift для переключения языка";
  body.appendChild(describe);

  function printChars() {
    let printChars = "";
    for (var key in currentKeys) {
      if (
        currentKeys[key] == "Shift" ||
        currentKeys[key] == "Ctrl" ||
        currentKeys[key] == "CapsLock" ||
        currentKeys[key] == "Backspace" ||
        currentKeys[key] == "Enter"
      ) {
        printChars +=
          '<div class="key double" data="' +
          key +
          '">' +
          currentKeys[key] +
          "</div>";
      } else if (currentKeys[key] == "Space") {
        printChars +=
          '<div class="key space-button" data="' +
          key +
          '">' +
          currentKeys[key] +
          "</div>";
      } else {
        printChars +=
          '<div class="key" data="' + key + '">' + currentKeys[key] + "</div>";
      }
    }
    document.querySelector(".keyboard").innerHTML = printChars;
  }
  printChars();

  //при нажатии мышкой

  keyboard.onmousedown = function (event) {
    let targetKey = event.target;
    targetKey.classList.add("press");
    var data = targetKey.getAttribute("data");
    if (data == "Space") {
      textarea.innerHTML += " ";
    } else if (data == "Backspace" || data == "Delete") {
      textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    } else if (data == "Enter") {
      textarea.innerHTML = textarea.innerHTML + "\n";
    } else if (data == "Tab") {
      textarea.innerHTML = textarea.innerHTML + "\t";
    } else if (
      data == "ControlRight" ||
      data == "ControlLeft" ||
      data == "AltRight" ||
      data == "AltLeft" ||
      data == "ShiftLeft" ||
      data == "ShiftRight" ||
      data == "CapsLock"
    ) {
      textarea.innerHTML = textarea.innerHTML;
    } else {
      textarea.innerHTML += currentKeys[data].toLowerCase();
    }
  };

  keyboard.onmouseup = function (event) {
    let targetKey = event.target;
    targetKey.classList.remove("press");
  };

  var keys = document.querySelectorAll(".key");

  //при нажатии клавиши

  document.onkeydown = function (event) {
    if (event.code == "AltLeft") {
      AltLeftOn = true;
    }

    if (event.code == "ShiftLeft" && AltLeftOn) {
      if (ru == false) {
        ru = true;
        currentKeys = ruKeys;
        printChars();

        localStorage["rus"] = "true";
        let russ = localStorage.getItem("rus");
      } else {
        ru = false;
        currentKeys = engKeys;
        printChars();

        localStorage["rus"] = "false";
        let russ = localStorage.getItem("rus");
      }
      AltLeftOn = false;
    }

    if (event.code == "Backspace" || event.code == "Delete") {
      textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    } else if (event.code == "Enter") {
      textarea.innerHTML = textarea.innerHTML + "\n";
    } else if (event.code == "Tab") {
      textarea.innerHTML = textarea.innerHTML + "    ";
    } else if (event.code == "Space") {
      textarea.innerHTML = textarea.innerHTML + " ";
    } else if (event.code == "ShiftLeft" || event.code == "ShiftRight") {
      shiftOn = true;
      textarea.innerHTML = textarea.innerHTML;
    } else if (event.code == "CapsLock") {
      if (CapsLock == false) {
        CapsLock = true;
      } else {
        CapsLock = false;
      }
      textarea.innerHTML = textarea.innerHTML;
    } else if (
      event.code == "ControlRight" ||
      event.code == "ControlLeft" ||
      event.code == "AltRight" ||
      event.code == "AltLeft"
    ) {
      textarea.innerHTML = textarea.innerHTML;
    } else {
      if (shiftOn !== true && CapsLock !== true) {
        textarea.innerHTML += currentKeys[event.code].toLowerCase();
      } else {
        textarea.innerHTML += currentKeys[event.code].toUpperCase();
      }
      shiftOn = false;
    }

    var keys = document.querySelectorAll(".key");
    for (let j = 0; j < keys.length; j++) {
      let data = keys[j].getAttribute("data");
      if (event.code == data) {
        keys[j].classList.add("press");
      }
    }
  };

  document.onkeyup = function (event) {
    var keys = document.querySelectorAll(".key");
    for (let j = 0; j < keys.length; j++) {
      keys[j].classList.remove("press");
    }
  };
};