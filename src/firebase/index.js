import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./config.js"; // firebaseの設定

firebase.initializeApp(firebaseConfig); //データベースへの接続を行っている
export const db = firebase.firestore(); //インスタンス化する
