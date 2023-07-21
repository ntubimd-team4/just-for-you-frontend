// console.log("Hello \n Word"); //換行"\n"

// //let user_name = window.prompt("請輸入你的姓名"); //有一個視窗跳出來
// //window.alert("歡迎來到網站" + user_name);

// let n1 = 20;
// let n2 = 30;
// let name = "Johnson";
// let n3 = 10;
// let n4 = 15;

// console.log(n1 + n2 + name); //50Johnson
// console.log(n1 + n2 + name + n3 + n4); //50Johnson1015

// let age1 = 27;
// console.log(typeof age.toString()); //string

// const pi = 3.1415926;
// console.log(typeof pi.toFixed(2)); //string 確認資料類型

// let x = 10;
// console.log(x.toString()); //()括號很重要

// let str = "Wilson Ren";
// let str1 = ""; //empty string

// console.log(str.length); //10
// console.log(str1.length); //0
// console.log(str.indexOf("Ren")); //7 表示從第7個找到Ren 所以是7
// console.log(str[str.length - 1]); //n  從0, 1 ,2, 3, 4, 5開始 string長度為x 最後文字index是x-1

// let sentence = "Today is a good day";

// let result = sentence.split(" "); //Array"  "表示空白格切一刀
// console.log(result);

// console.log(!false); //!可以將Boolean反轉 所以結果變成true

// console.log(3 == 5); //== 等於 comparison operators運算結果= boolean 值
// console.log(3 !== 5); //!= 不等於
// console.log(3 === "3"); //== 代表去檢查operators的值,也檢查data type的值 結果為fals1e 因為type不一樣
// console.log(true && false); //&&且
// console.log(true || false); //||或

//----------------------------------------------------------------
// let age = prompt("請輸入年齡(阿拉伯數字):");

// age = Number(age);

// if (age >= 0 && age <= 12) {
//   alert("兒童票 100元");
// } else if (age > 12 && age <= 65) {
//   alert("成人票 250元");
// } else if (age > 65 && age <= 125) {
//   alert("敬老票 150元");
// }

// //Falsy Values 有false 、 0,-0,0n 、 "" '' ``(empty string) 、 null 、 undefined 、 NaN
// //&&規則中 left is true, 顯示right值
// console.log(3 && 10);
// //left is not true,顯示left值
// console.log(-0 && 100);

// //||規則中 left is true,顯示left值
// console.log(6 || 100);
// //left is not true,顯示right值
// console.log(null || 100);

//---------------------------------------------------------------------
// function sayHi(myParamater, myParamater2) {
//   console.log("你好，我的名子是" + myParamater);
//   console.log("我今年" + myParamater2 + "歲");
// }

// sayHi("Mike", 35);

// function cirle(r) {
//   return 3.14 * r * r;
// }

// let area1 = cirle(10);
// let area2 = cirle(5);
// console.log(area1 + area2);

// //攝氏溫度轉換成華氏溫度

// function convertor(c) {
//   return c * 1.8 + 32;
// }

// let input = Number(prompt("請輸入溫度: (°C)"));
// let result = convertor(input);
// alert("換算後的溫度為:" + result + "°F");
// //7/16

//--------------------------------------------------------------------------
// let friends = ['Grace', 'Mike', 'Spence', 'Esther', 'Slade'];

// friends.unshift('shan');//最前面增加第一個
// //friends.shift(); //最前面拿走
// //friends.push('MOmo'); //變成6多增增加一個
// //friends.pop(); //減少一個
// console.log(friends);
// console.log(friends.length);

// let anotherVariable = friends;

// anotherVariable[0] = 'Michael';

// console.log('friends array變成是:');
// console.log(friends);

// console.log('anotherVariable array變成是:');
// console.log(anotherVariable);

// //let anotherArray = [null, false, 3.14159]; //可以是不同資料混合

// let deposit = 500;
// let anotherDeposit = deposit;

// anotherDeposit = 600;
// console.log('deposit 為', deposit, 'anotherDeposit為', anotherDeposit);

// let arr1 = [1, 2, 3];
// let arr2 = arr1;

// console.log(arr1 == arr2);

// let myArr = [['name', 'address', 'age'], ['Esther', '台灣', 35], ['Mike', '美國', '26']];

// console.log(myArr[1][0]);

//------------------------------------------------------------------------
function sayHelloToUser(){
  alert('三秒過了...');
}

let interval = window.setInterval(sayHelloToUser, 3000);

window.clearInterval(interval); //clearInterval停止setInterval

let Grace = {
  'name': 'Grace',
  'age': 26,
};

let Wilson = {
  'name': 'Wilson',
  'age': 26,
  'spouse': Grace,
};

console.log(Wilson.spouse.name);
//--------------------------------------------------------------------
let found_elements = document.querySelectorAll('.my-p');

console.log(found_elements);