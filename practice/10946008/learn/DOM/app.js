//150
function sayHelloToUser() {
  alert("三秒過了。。。");
}

let interval = window.setInterval(sayHelloToUser, 3000);

let Grace = {
  name: "Grace",
  age: 26,
};

let Wilson = {
  name: "Wilson",
  age: 26,
  spouse: Grace,
};

console.log(Wilson.spouse.name);
//151
let myHeading = document.getElementById("myHeading1");
let myParagraphs = document.getElementsByClassName("my-p");
console.log(myParagraphs);
//152
let myH1 = document.createElement("h1");

console.log(myH1);
