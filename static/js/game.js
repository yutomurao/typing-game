//1　HTMLの要素が完全に解析&構築された後に内側のコードを実装
document.addEventListener("DOMContentLoaded",() => {

    //2　
    let startFlag = 0; // 0→開始前、１→開始待機、２→ゲーム中、３→終了
    let startTime; //経過時間を表示するための開始時間を保持
    let missTypeCount = 0; //タイプミスの回数
    let typeCount = 0; //タイプした総数
    let current = 0; //現在何単語目か
    let letterCount= 0; //ゲーム全体の単語数
    let typedText;// 入力済みの文字
    let untypedText;// 未入力の文字


    const wordObjList = []; //単語配列用のリスト
    const wordLength = 20; //１ゲームの単語数
    const panelContainer = document.getElementsByClassName("panel-container")[0];
    //3　音声の取得
    const clearSound = document.getElementById("type_clear");
    const missSound = document.getElementById("type_miss");
    const countSound = document.getElementById("count_down");
    const startSound = document.getElementById("start_sound");

    //4 配列の要素をランダムに入れ替えている
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // 0からiまでのランダムなインデックスを生成
            const j = Math.floor(Math.random() * (i + 1));
            // array[i] と array[j] を入れ替える
            [array[i], array[j]] = [array[j], array[i]];
        };
        return array;
    };
    function wordObjListMake(data){//データはcsvファイルを指す
        //単語リストを作成する関数
        //2 lines = ["egg,卵", "bag,カバン","rose,バラ",...]
        const lines = data.split("\n");
        shuffleArray(lines);

        //3 word = ["egg","卵"] ["bad","カバン"]　・・・　英単語の部分を取得
        for(let i = 0; i < wordLength; i++){
            let word = lines[i].split(",");
            wordObjList.push({
                "untyped": word[0],
                "typed": "",
                "word": word[0],
                "letterLength": word[0].length,
            });
        };
    };

    function createPanels(){
        //1
        panelContainer.innerHTML = "";
        for (let i = 0; i < wordLength; i++){
            //2
            const panel = document.createElement("div"); // 単語1つのまとまりを作る（div要素）
            const typedSpan = document.createElement("span");// 入力済みの文字を表示するところを作成
            const untypedSpan = document.createElement("span");// 未入力の文字を表示するところを作成

            panel.id = "panel-" + i;
            panel.className = "panel";
            typedSpan.id = "typed-" + i;
            typedSpan.className = "typed";
            untypedSpan.id = "untyped-" + i;
            untypedSpan.className = "untyped";

            //3
            untypedSpan.textContent = wordObjList[i]["untyped"];// 実際に、文字列として未入力の文字を表示
            //4
            letterCount += wordObjList[i]["letterLength"];// 英単語の語数の合計を計算する（後で正確さを出すため）

            panel.appendChild(typedSpan);// divの子要素にspanを置く
            panel.appendChild(untypedSpan);
            panelContainer.appendChild(panel);// sectionクラスの子要素にdivを置く
        }
        //5
        panelContainer.classList.add("panel-container-play");

        // 最初のパネルを光らせておく
        document.getElementById("panel-0").classList.add("active");
    }
// 打つ単語を目立たせる・わかりやすくする関数
    function highlightCurrentPanel(){
        
        // 1
        let currentPanel = document.getElementById(`panel-${current - 1}`);
        let nextPanel = document.getElementById(`panel-${current}`);
        // 2
        currentPanel.classList.remove("active");
        currentPanel.classList.add("faded");
        nextPanel.classList.add("active");
    }

    function inputcheck(key){
        // キーをUserが打ち込んだら、Userの入力した回数を増やしている
        typeCount += 1;

        // 1(a) 正解のキーをタイプしたら
        // charAt(n)・・・n文字目を抜き出す
        // 入力したキーが、現在の単語パネルのuntypedの１文字目と同じ場合
        if (key == wordObjList[current]["untyped"].charAt(0)){
            // 音声再生ごとに、最初から流れるようにする
            clearSound.currentTime = 0;
            clearSound.play();

            // 1(b)
            // untypedの１文字目をtypedに加えて、再代入している
            wordObjList[current]["typed"] = wordObjList[current]["typed"] + wordObjList[current]["untyped"].charAt(0);
            // untypedの２文字目以降を読み取って、再代入している
            wordObjList[current]["untyped"] = wordObjList[current]["untyped"].substring(1);

            // 1(c)
            typedText.textContent = wordObjList[current]["typed"];
            untypedText.textContent = wordObjList[current]["untyped"];

            // ラスト１文字→次のワードへ
            // 2
            if (wordObjList[current]["untyped"].length == 0){
                current += 1;

                if(current == wordLength){

                }
                // 3(b)
                else{
                    highlightCurrentPanel(); // 単語パネルを目立たせる処理
                    typedText = document.getElementById(`typed-${current}`); // 次のtypedの要素(id)を取得
                    untypedText = document.getElementById(`untyped-${current}`);
                }
            }
        }

        // 4 間違ったキーをタイプしたら
        else{
            missSound.currentTime = 0;
            missSound.play();
            missTypeCount += 1;
        }

    }
    
    // 1
    window.addEventListener("keydown", (event) => {
        // 2 もしゲームがまだスタートしていなくて、スペースキーが押されたら
        if(startFlag == 0 && event.key == " "){
            startFlag = 2;
            // 時間がかかる処理を待ってから、実行できるようにする。
            (async () =>{ // awaitを呼び出す
                // await 動機的に処理を行えるようにする
                await fetch(`csv/word-jr-1.csv`) //csvファイルのデータの取得
                    .then(response => response.text()) // \nを含む文字列に変換　例）egg,卵\nbag,カバン\nrise,バラ
                    .then(data => wordObjListMake(data)); // 実際に単語パネルを作成
                console.log(wordObjList);
                createPanels();
                // 5 追加
                typedText = document.getElementById(`typed-${current}`);
                untypedText = document.getElementById(`untyped-${current}`)
            })();
        }
        // 3 ゲーム中かつ、１文字入力されていてかつ、登録した文字に対応していたら
        else if(startFlag == 2 && event.key.length == 1 && event.key.match(/^[a-zA-Z0-9!-/:-@\[-`{-~\s]*$/)){
            inputcheck(event.key);
        }
    })
});