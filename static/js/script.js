"use strict" // strictモードを実行　厳しく審査 

// window.alert("hello!")

// let num = 10; // 変数を定義するときに、letをつける
// console.log(num)

// let name = 'yuto';
// name = 'しょうご'
// console.log(name);

// const answer = 'yes'; //定数の時はconst
// console.log(answer)

// answer = 'no';

// const a = 20;
// const b = 30;

// console.log(a > 10 && b > 25);

// console.log(a > 10 || b < 15);

// console.log(!(a === 20));

// console.log(!(a !== 20));

const a = 0;
// const b = 3;
// const c = 'ゆうと';

// if (a == 20){
//     console.log('お酒飲めます');
// } else if (a > 20){
//     console.log('よりお酒が飲めます');
// }  else{
//     console.log('お酒なんて飲むなバカ')
// }

// if (a % 2 == 0){
//     console.log(a);
// } else{
//     console.log('表示できません');
// }

//1から10まで増やす
// for(let i = 1; i <= 10; i++){
//     console.log(i);
// }

// function greet(name){
//     return(name)
// }
// name = "ゆうと"
// console.log(greet(`こんにちは ${name} さん`)) //バッククオート使って変数と文字を一緒に使う


// const content = document.getElementById("main");
// console.log("getElementById", content);

// const data = document.getElementsByClassName("data");
// console.log("getElementsByClsddNsme", data);
// console.log(data[0]);

// const h1 = document.querySelector(".wrapper h1");
// console.log("querySelector", h1);

// const data2 = document.querySelectorAll(".unorderd-list li");
// console.log("querySelectorAll", data2);

// const container = document.createElement("div");
// const text = document.createElement("p");

// container.appendChild(text)

// const sample1 = document.querySelector(".list1") //.list1を取ってくる
// console.log("TextContentBefore", sample1.textContent);
// sample1.textContent = "藤笑先生"
// console.log("TextContentAfter", sample1.textContent);

// const sample2 = document.querySelector(".list2");
// console.log("innerHTML before", sample2.innerHTML);
// sample2.innerHTML = "<strong>内田先生</strong>"
// console.log("innerHTML after", sample2.innerHTML);

// const content = document.querySelector("body");
// content.style.backgroundColor = "skyblue";

//ブラウザ操作　ページ遷移やwebページの表示に関与しているウィンドウに関して扱う
// // window.location.reload()//リロードを実装
// window.scrollTo(1000,500);//scrollTo(X,Y)で、座標の位置に移動

const header = document.querySelector("h1");
header.addEventListener("click", function() {
    if (header.style.fontSize == "40px") {
        header.style.fontSize = "32px";
    } else {
        header.style.fontSize = "40px";
    }
});