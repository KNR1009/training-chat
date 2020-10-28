
import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import './assets/styles/style.css';
import {AnswersList, Chats} from "./components/index"
// import defaultDataset from "./dataset" 
//データベースの値をこちらでインポートする
import { db } from "./firebase/index";



const App = () => {

  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});


 
  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: "question",
    }
    )
    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  };

  const selectAnswer = (selectAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "init":
        displayNextQuestion(nextQuestionId, dataset[nextQuestionId]);
        break;

      // urlできた場合の実装
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;

      default:
        addChats({
            text: selectAnswer,
            type: "answer"
        })
        // 遅延時間を使って回答するようにする(2つの引数を取れる)

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 700);

        break;
    }
  };

  // chatに値を追加するメソット

  const addChats = (chat)=>{
    setChats(prevChats=>{
      return[...prevChats, chat]
    })
  }


  useEffect(()=>{
      (async () => {
        const initDataset = {};
      await db
        .collection("questions")
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            initDataset[id] = data;
          });
        });
      // setDatasetで先ほどの上記の値を変更する
      setDataset(initDataset);
      // 以下では質問を追加する実装を施す
      displayNextQuestion(currentId, initDataset[currentId])
    })();
  }, [])

  // スクロール時の挙動

  useEffect(()=>{
      const scrollAre = document.getElementById("scrollarea");
      if (scrollAre) {
        scrollAre.scrollTop = scrollAre.scrollHeight;
        console.log(scrollAre.scrollTop);
        console.log(scrollAre.scrollHeight);
      }
  })

  return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          <AnswersList
            answers={answers}
            select={selectAnswer}
          />
        </div>
      </section>
    );
}

export default App
