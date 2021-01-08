// .innerText es para interpretar el texto no como HTML sí no como texto normal
function getHistory() {
  return document.getElementById("historyV").innerText;
}
function printHistory(num) {
  document.getElementById("historyV").innerText = num;
}
function getOutput() {
  return document.getElementById("outputV").innerText;
}
function printOutput(num) {
  if (num == "") {
    document.getElementById("outputV").innerText = num;
  } else {
    document.getElementById("outputV").innerText = getFormatedNumber(num);
  }
}
function getFormatedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  // El metodo .toLocaleString sirve para devolver una string con una representacion
  // del numero sensible al idioma
  var value = n.toLocaleString("en");
  return value;
}

function reverseNumberFormat(num) {
  // En el metodo .replace la letra g es un modificador que significa global y el cambio se hará
  // en todas las copias que coincidan con el string y se cambiaran por el nuevo string
  return Number(num.replace(/,/g, ""));
}

var operator = document.getElementsByClassName("operator");

for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      //sí el output tiene valor
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var history = getHistory();
      if (output == "" && history != "") {
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id == "=") {
          var result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //Sí el output es un numero
      output = output + this.id;
      printOutput(output);
    }
  });
}
