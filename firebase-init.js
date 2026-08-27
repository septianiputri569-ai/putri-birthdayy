/* ========================================
   PUTRI'S BIRTHDAY
   FIREBASE-INIT.JS

   File ini yang nyambungin website ke
   Firebase Realtime Database, supaya
   leaderboard-nya sama buat semua orang
   (bukan cuma tersimpan di browser masing2).
======================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBtuFLAKyvIzWiMpVwyd49pIPYKYJQWh7g",
    authDomain: "putri-birthdayy.firebaseapp.com",
    databaseURL: "https://putri-birthdayy-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "putri-birthdayy",
    storageBucket: "putri-birthdayy.firebasestorage.app",
    messagingSenderId: "759653671434",
    appId: "1:759653671434:web:e809e1e6da811191e475f3",
    measurementId: "G-S54W731H8J"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


/*
    Bikin key yang aman buat Firebase.
    Firebase gak boleh pakai karakter . # $ [ ]
    di dalam key, jadi kita ganti jadi "_".
*/
function safeKey(name) {
    return name.replace(/[.#$/\[\]]/g, "_");
}


/*
    Simpan / update skor seseorang.
    Kalau nama yang sama isi lagi, otomatis
    ke-replace (bukan numpuk data lama).
*/
window.firebaseSaveScore = async function (name, score) {
    const key = safeKey(name);

    await set(ref(db, "leaderboard/" + key), {
        name: name,
        score: score,
        date: new Date().toISOString()
    });
};


/*
    Ambil semua data leaderboard dari Firebase,
    sudah diurutin dari skor tertinggi.
*/
window.firebaseGetLeaderboard = async function () {
    const snapshot = await get(ref(db, "leaderboard"));

    if (!snapshot.exists()) {
        return [];
    }

    const data = Object.values(snapshot.val());

    data.sort((a, b) => b.score - a.score);

    return data;
};
