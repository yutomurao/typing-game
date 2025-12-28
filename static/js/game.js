//1　HTMLの要素が完全に解析&構築された後に内側のコードを実装
document.addEventListener("DOMContentLoaded",() => {

    //2　
    let startFlag = 0; // 0→開始前、１→開始待機、２→ゲーム中、３→終了
    let startTime; //経過時間を表示するための開始時間を保持
    let missTypeCount = 0; //タイプミスの回数
    let typeCount = 0; //タイプした総数
    let current = 0; //現在何単語目か
    let letterCount= 0; //ゲーム全体の単語数


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
        current.Panel.classList.remove("active");
        currentPanel.classList.add("faded");
        nextPanel.classList.add("active");
    }
    // 時間がかかる処理を待ってから、実行できるようにする。
    (async () =>{
        await fetch(`csv/word-jr-1.csv`) //csvファイルのデータの取得
        .then(response => response.text()) // \nを含む文字列に変換　例）egg,卵\nbag,カバン\nrise,バラ
        .then(data => wordObjListMake(data)); // 実際に単語パネルを作成

        console.log(wordObjList);
        createPanels();
    })();
});