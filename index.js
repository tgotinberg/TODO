const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

// LocalStrageからデータを取得→JSONで取得する
const todos = JSON.parse(localStorage.getItem("todos"));
// もしtodosが空じゃなかったらliタグを追加する
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

//　EnterのEventを検知すると、add関数実行
form.addEventListener("submit", function (event) {
    // 実行したら自動でブラウザがリロードされる仕様なので、それを途中で止める
    event.preventDefault();
    add();
  });


function add(todo){
    let todoText = input.value;

    // todoがあったときにはその値でliを作る
    if(todo){
        todoText = todo.text;
    }

    if (todoText) {
        const li = document.createElement("li");
        //input.value; → todoText;
        li.innerText = todoText;
        li.classList.add('list-group-item')

        // TODOがCompletedなら、"text-decoration-line-through" classを追加する
        if(todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        // 右クリックを検知 右クリック="contextmenu"
        li.addEventListener("contextmenu", function(event){
            // 右クリックメニューの表示をさせない
            event.preventDefault();
            // liの削除
            li.remove();
            // localStorageに反映
            saveData();
        });

        // 左クリックを検知
        li.addEventListener("click", function(){
           // 打ち消し線("text-decoration-line-through)をつける
           // toggle = クリックの度に切り替える 
           li.classList.toggle("text-decoration-line-through");
           saveData();
        });

        ul.appendChild(li);
        input.value = "";
        saveData();
    }
}

function saveData(){
    const lists = document.querySelectorAll("li");
    let todos = [];

    // データとしてオブジェクトを定義して、TextとCompletedという属性を持つようにする
    lists.forEach(list => {
        // let todoというオブジェクトを作成
        let todo = {
            text: list.innerText,
            // text-decoration-line-through というclassを持っているかどうかを判断
            // 持っていればtrue、持っていなければfalse
            completed: list.classList.contains("text-decoration-line-through")
        };

        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

