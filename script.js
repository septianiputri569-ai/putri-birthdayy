/* ========================================
   PUTRI'S BIRTHDAY
   SCRIPT.JS
======================================== */


/* =========================
   SCREEN
========================= */

const screens = {
    welcome: document.getElementById("welcomeScreen"),
    name: document.getElementById("nameScreen"),
    hub: document.getElementById("hubScreen"),
    message: document.getElementById("messageScreen"),
    quiz: document.getElementById("quizScreen"),
    result: document.getElementById("resultScreen"),
    leaderboard: document.getElementById("leaderboardScreen")
};


function showScreen(screen) {
    Object.values(screens).forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   GUEST NAME
========================= */

let guestName = "";

const enterBtn = document.getElementById("enterBtn");
const continueBtn = document.getElementById("continueBtn");
const nameInput = document.getElementById("nameInput");
const nameError = document.getElementById("nameError");
const guestNameDisplay = document.getElementById("guestName");


enterBtn.addEventListener("click", () => {
    showScreen(screens.name);

    setTimeout(() => {
        nameInput.focus();
    }, 300);
});


continueBtn.addEventListener("click", saveGuestName);


nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        saveGuestName();
    }
});


function saveGuestName() {

    const name = nameInput.value.trim();

    if (name === "") {
        nameError.textContent = "Namanya diisi dulu dong 😭";
        return;
    }

    guestName = name;

    guestNameDisplay.textContent = guestName.toUpperCase();

    nameError.textContent = "";

    showScreen(screens.hub);
}


/* =========================
   MENU NAVIGATION
========================= */

const messageBtn = document.getElementById("messageBtn");
const quizBtn = document.getElementById("quizBtn");
const leaderboardBtn = document.getElementById("leaderboardBtn");

const messageBackBtn = document.getElementById("messageBackBtn");
const quizBackBtn = document.getElementById("quizBackBtn");
const leaderboardBackBtn = document.getElementById("leaderboardBackBtn");


messageBtn.addEventListener("click", () => {
    showScreen(screens.message);
});


quizBtn.addEventListener("click", () => {

    startQuiz();

    showScreen(screens.quiz);
});


leaderboardBtn.addEventListener("click", () => {

    renderLeaderboard();

    showScreen(screens.leaderboard);
});


messageBackBtn.addEventListener("click", () => {
    showScreen(screens.hub);
});


quizBackBtn.addEventListener("click", () => {

    const confirmLeave = confirm(
        "Keluar dari quiz? Progress kamu bakal hilang 😭"
    );

    if (confirmLeave) {
        showScreen(screens.hub);
    }

});


leaderboardBackBtn.addEventListener("click", () => {
    showScreen(screens.hub);
});


/* =========================
   MESSAGE
========================= */

const messageInput = document.getElementById("messageInput");
const charCount = document.getElementById("charCount");

const sendMessageBtn = document.getElementById("sendMessageBtn");

const successModal = document.getElementById("successModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");


messageInput.addEventListener("input", () => {

    charCount.textContent = messageInput.value.length;

});


sendMessageBtn.addEventListener("click", () => {

    const message = messageInput.value.trim();

    if (message === "") {

        alert("Isi pesannya dulu dong 😭");

        return;
    }


    /*
        Untuk sekarang pesan hanya disimpan
        di browser.

        Nanti kita sambungkan ke database.
    */

    const messages =
        JSON.parse(localStorage.getItem("birthdayMessages")) || [];


    messages.push({

        name: guestName,

        message: message,

        date: new Date().toLocaleString("id-ID")

    });


    localStorage.setItem(
        "birthdayMessages",
        JSON.stringify(messages)
    );


    successModal.classList.add("show");

});


modalCloseBtn.addEventListener("click", () => {

    successModal.classList.remove("show");

    messageInput.value = "";

    charCount.textContent = "0";

    showScreen(screens.hub);

});


/* =========================
   QUIZ QUESTIONS
========================= */

const questions = [

    {
        question: "Ukuran sepatu Putri berapa? 👟",

        answers: [
            { text: "37", correct: false },
            { text: "39", correct: true },
            { text: "36", correct: false },
            { text: "38", correct: false }
        ]
    },


    {
        question: "Kalau Putri punya uang 1M, paling mungkin dihabisin buat apa? 💸",

        answers: [
            { text: "Ditabung semuanya", correct: false },
            { text: "Foya-foya", correct: true },
            { text: "Investasi", correct: false },
            { text: "Beli rumah", correct: false }
        ]
    },


    {
        question: "Kalau Putri lagi bad mood, apa yang paling mungkin dilakukan? 😤",

        answers: [
            { text: "Tidur", correct: false },
            { text: "Curhat ke seseorang", correct: false },
            { text: "Marah-marah", correct: true },
            { text: "Jalan-jalan", correct: false }
        ]
    },


    {
        question: "Kalau ada tugas dan deadline masih lama, Putri biasanya... 📚",

        answers: [
            { text: "Langsung dikerjain", correct: false },
            { text: "Dicicil", correct: false },
            { text: "Lupa kalau punya tugas", correct: false },
            { text: '"Nanti aja", terus panik H-1 😭', correct: true }
        ]
    },


    {
        question: 'Kalau Putri bilang "OTW", biasanya... 🚗',

        answers: [
            { text: "Sudah di jalan", correct: false },
            { text: "Baru siap-siap", correct: false },
            { text: "Baru pakai sepatu", correct: false },
            { text: "Hanya Tuhan yang tahu 💀", correct: true }
        ]
    },


    {
        question: "Setelah seharian ketemu banyak orang, Putri biasanya butuh... 🫠",

        answers: [
            { text: "Jalan-jalan lagi", correct: false },
            { text: "Nongkrong sama teman dekat", correct: false },
            { text: "Tergantung siapa orangnya", correct: true },
            { text: "Tidur 12 jam", correct: false }
        ]
    },


    {
        question: "Kalau ada teman ngajak pergi dadakan... 👀",

        answers: [
            { text: "Lihat siapa aja yang ikut", correct: false },
            { text: "Cek duit dulu, ada duit gak 💸", correct: true },
            { text: "Langsung GAS", correct: false },
            { text: "Tanya dulu mau ke mana", correct: false }
        ]
    },


    {
        question: 'Kalau Putri bilang "gapapa", kemungkinan sebenarnya... 💀',

        answers: [
            { text: "Lagi males cerita", correct: false },
            { text: "Beneran gapapa", correct: false },
            { text: "ITU PERANGKAP 🚨", correct: true },
            { text: "Cuma sedikit kesel", correct: false }
        ]
    },


    {
        question: "Mana yang paling menggambarkan Putri? 😂",

        answers: [
            { text: "Gak ada yang bener 😭", correct: true },
            { text: '"Gue mau hemat."', correct: false },
            { text: '"Gue janji gak beli baju."', correct: false },
            { text: '"Gue mau diet."', correct: false }
        ]
    },


    {
        question: "Putri kalau udah penasaran sama sesuatu kemungkinan... 🔎",

        answers: [
            { text: "Lupa beberapa hari kemudian", correct: false },
            { text: "Tanya orang lain", correct: false },
            { text: "Jadi intel 🕵️‍♀️", correct: true },
            { text: "Cari tahu sebentar", correct: false }
        ]
    },


    {
        question: "Kalau Putri lagi cerita masalah, dia lebih butuh... 🫂",

        answers: [
            { text: "Solusi", correct: true },
            { text: "Didengerin", correct: true },
            { text: "Ditemenin", correct: true },
            { text: "Dibawain makanan 😭", correct: true }
        ]
    },


    {
        question: "Putri kalau udah nyaman sama seseorang biasanya... 🫣",

        answers: [
            { text: "Jadi lebih pendiam", correct: false },
            { text: "Jadi lebih formal", correct: false },
            { text: "Cuma ngobrol seperlunya", correct: false },
            { text: "Keluar sifat asli 100% 😭", correct: true }
        ]
    },


    {
        question: "Seberapa yakin kamu bisa menjawab quiz ini? 🤨",

        answers: [
            { text: "100% 😎", correct: true },
            { text: "Lumayan", correct: true },
            { text: "Gue asal pencet", correct: true },
            { text: "Gue cuma datang buat ngucapin HBD 🎂", correct: true }
        ]
    },


    {
        question: "Coba tebak, Putri sekarang punya cowok atau nggak? 👀",

        answers: [
            { text: "Iya, sama Indra ❤️", correct: true },
            { text: "Nggak, masih sendiri", correct: false },
            { text: "Lagi PDKT sama seseorang", correct: false },
            { text: "Gak tahu, coba tanya Putri langsung 😭", correct: false }
        ]
    },


    {
        question: "Menurut lo, Putri cantik gak? 💅🏻",

        answers: [
            { text: "G", correct: false },
            { text: "Y", correct: false },
            { text: "Dih", correct: false },
            {
                text: "OMG CANTIK, IMUT, MENGGEMASKAN 😭💗 I LOPYU",
                correct: true
            }
        ]
    }

];


/* =========================
   QUIZ VARIABLES
========================= */

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const answersContainer = document.getElementById("answersContainer");
const progressFill = document.getElementById("progressFill");


/* =========================
   SHUFFLE
========================= */

function shuffle(array) {

    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] =
            [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}


/* =========================
   START QUIZ
========================= */

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    showQuestion();

}


/* =========================
   SHOW QUESTION
========================= */

function showQuestion() {

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 15`;


    const progress =
        ((currentQuestion) / questions.length) * 100;

    progressFill.style.width = `${progress}%`;


    questionText.textContent =
        question.question;


    answersContainer.innerHTML = "";


    const shuffledAnswers =
        shuffle(question.answers);


    shuffledAnswers.forEach((answer) => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent =
            answer.text;


        button.addEventListener("click", () => {

            handleAnswer(answer, button);

        });


        answersContainer.appendChild(button);

    });

}


/* =========================
   ANSWER
========================= */

function handleAnswer(answer, selectedButton) {

    const buttons =
        document.querySelectorAll(".answer-btn");


    /*
        Supaya tidak bisa klik dua kali
    */

    buttons.forEach(button => {
        button.disabled = true;
    });


    selectedButton.classList.add("selected");


    /*
        Semua jawaban nomor 11 dan 13 benar.
        Soal lainnya hanya jawaban correct:true.
    */

    if (answer.correct) {

        score++;

    }


    setTimeout(() => {

        currentQuestion++;


        if (currentQuestion < questions.length) {

            showQuestion();

        } else {

            finishQuiz();

        }

    }, 450);

}


/* =========================
   FINISH QUIZ
========================= */

function finishQuiz() {

    /*
        Untuk sementara score dihitung dari
        jumlah jawaban benar.

        Nanti kita ubah menjadi sistem /100.
    */

    const percentage =
        Math.round((score / questions.length) * 100);


    document.getElementById("scoreValue")
        .textContent = percentage;


    const result =
        getResultTitle(percentage);


    document.getElementById("resultTitle")
        .textContent = result.title;


    document.getElementById("resultDescription")
        .textContent = result.description;


    saveLeaderboard(
        guestName,
        percentage
    );


    showScreen(screens.result);

}


/* =========================
   RESULT TITLE
========================= */

function getResultTitle(score) {

    if (score >= 90) {

        return {
            title: "👑 PUTRI EXPERT",
            description:
                "LAH LU TAU GUE DARI MANA 😭💗"
        };

    }


    if (score >= 80) {

        return {
            title: "💗 INNER CIRCLE",
            description:
                "Lu ternyata lumayan deket sama Putri 👀"
        };

    }


    if (score >= 70) {

        return {
            title: "🫂 TEMAN DEKAT",
            description:
                "Lumayan lah, Putri masih mengakui lu 😭"
        };

    }


    if (score >= 60) {

        return {
            title: "👀 LUMAYAN KENAL",
            description:
                "Masih ada harapan buat naik level."
        };

    }


    if (score >= 40) {

        return {
            title: "🙂 TEMAN",
            description:
                "Kayaknya kita perlu quality time lebih banyak."
        };

    }


    return {
        title: "💀 NPC",
        description:
            "Lu yakin kita temenan? 😭"
    };

}


/* =========================
   LEADERBOARD
========================= */

function saveLeaderboard(name, score) {

    const leaderboard =
        JSON.parse(
            localStorage.getItem("birthdayLeaderboard")
        ) || [];


    /*
        Kalau orang yang sama mengerjakan lagi,
        hapus score lamanya.
    */

    const filtered =
        leaderboard.filter(
            person => person.name !== name
        );


    filtered.push({

        name: name,

        score: score

    });


    filtered.sort(
        (a, b) => b.score - a.score
    );


    localStorage.setItem(
        "birthdayLeaderboard",
        JSON.stringify(filtered)
    );

}


function renderLeaderboard() {

    const leaderboard =
        JSON.parse(
            localStorage.getItem("birthdayLeaderboard")
        ) || [];


    const list =
        document.getElementById("leaderboardList");


    list.innerHTML = "";


    if (leaderboard.length === 0) {

        list.innerHTML = `
            <div class="rank-item">
                <div class="rank-name">
                    Belum ada yang ikut quiz 😭
                </div>
            </div>
        `;

        return;
    }


    /*
        TOP 3
    */

    const first =
        leaderboard[0];

    const second =
        leaderboard[1];

    const third =
        leaderboard[2];


    document.getElementById("firstName")
        .textContent =
        first ? first.name : "---";


    document.getElementById("firstScore")
        .textContent =
        first ? `${first.score}/100` : "0";


    document.getElementById("secondName")
        .textContent =
        second ? second.name : "---";


    document.getElementById("secondScore")
        .textContent =
        second ? `${second.score}/100` : "0";


    document.getElementById("thirdName")
        .textContent =
        third ? third.name : "---";


    document.getElementById("thirdScore")
        .textContent =
        third ? `${third.score}/100` : "0";


    /*
        RANKING LIST
    */

    leaderboard.forEach((person, index) => {

        const item =
            document.createElement("div");


        item.className = "rank-item";


        item.innerHTML = `

            <div class="rank-number">
                #${index + 1}
            </div>

            <div class="rank-name">
                ${person.name}
            </div>

            <div class="rank-score">
                ${person.score}/100
            </div>

        `;


        list.appendChild(item);

    });

}


/* =========================
   RESULT BUTTONS
========================= */

const leaderboardFromResultBtn =
    document.getElementById(
        "leaderboardFromResultBtn"
    );


const hubFromResultBtn =
    document.getElementById(
        "hubFromResultBtn"
    );


leaderboardFromResultBtn.addEventListener(
    "click",
    () => {

        renderLeaderboard();

        showScreen(
            screens.leaderboard
        );

    }
);


hubFromResultBtn.addEventListener(
    "click",
    () => {

        showScreen(
            screens.hub
        );

    }
);


/* =========================
   CLOSE MODAL WHEN CLICK
   OUTSIDE CARD
========================= */

successModal.addEventListener(
    "click",
    (event) => {

        if (event.target === successModal) {

            successModal.classList.remove(
                "show"
            );

        }

    }
);