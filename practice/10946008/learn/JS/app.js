console.log("Hello \n Word"); //換行"\n"

let user_name = window.prompt("請輸入你的姓名"); //有一個視窗跳出來
window.alert("歡迎來到網站" + user_name);

let n1 = 20;
let n2 = 30;
let name = "Johnson";
let n3 = 10;
let n4 = 15;

console.log(n1 + n2 + name); //50Johnson
console.log(n1 + n2 + name + n3 + n4); //50Johnson1015

let age = 27;
console.log(typeof age.toString()); //string

const pi = 3.1415926;
console.log(typeof pi.toFixed(2)); //string 確認資料類型

let x = 10;
console.log(x.toString()); //()括號很重要

let str = "Wilson Ren";
let str1 = ""; //empty string

console.log(str.length); //10
console.log(str1.length); //0
console.log(str.indexOf("Ren")); //7 表示從第7個找到Ren 所以是7
console.log(str[str.length - 1]); //n  從0, 1 ,2, 3, 4, 5開始 string長度為x 最後文字index是x-1

let sentence = "Today is a good day";

let result = sentence.split(" "); //Array"  "表示空白格切一刀
console.log(result);

console.log(!false); //!可以將Boolean反轉 所以結果變成true

console.log(3 == 5); //== 等於 comparison operators運算結果= boolean 值
console.log(3 !== 5); //!= 不等於
console.log(3 === "3"); //== 代表去檢查operators的值,也檢查data type的值 結果為fals1e 因為type不一樣
console.log(true && false); //&&且
console.log(true || false); //||或
