import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
admin.initializeApp(); //adminを初期化することで機能を利用できるようにする
const db = admin.firestore(); //firestoreインスタンスで定義されているものを使う


// レスポンンスを受け取るメソットを作成する
const sendResponse = (response: functions.Response, statusCode: number, body: any)=>{
    response.send({
      statusCode,
      body: JSON.stringify(body)
    })
}


// Cloud functionsでhttps関数を作成する
export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
    //  こちらに非同期処理を書く
    // まずメソットがPOSTじゃない場合のレスポンス
    if(req.method !== 'POST'){
      sendResponse(res, 405, { error: "Invalid Request"});
    }else{
      // POSTだった場合にデータを追加する処理を行う
      const dataset = req.body;
      // ofを使ったfor文
      for(const key of Object.keys(dataset)){
          const data = dataset[key];
          await db.collection('questions').doc(key).set(data);
      }
      // 成功のレスポンスメッセージを送る
      sendResponse(res, 200, {message: 'success'});

    }
});