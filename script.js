const questions = {
    pribadi: [
        "Apa momen paling membanggakan dalam hidupmu?",
        "Jika bisa mengubah satu hal dari masa lalu, apa itu?",
        "Apa ketakutan terbesarmu?",
        "Siapa orang yang paling berpengaruh dalam hidupmu?",
        "Apa impian terbesarmu yang belum tercapai?",
        "Apa yang membuatmu bahagia hari ini?",
        "Jika bisa memberi satu nasihat untuk dirimu 5 tahun lalu, apa itu?",
        "Apa hobi yang ingin kamu pelajari?",
        "Skill apa yang paling kamu banggakan dari dirimu?",
        "Apa definisi kesuksesan menurutmu?",
        "Apa bakat tersembunyi yang kamu miliki?",
        "Apa tempat paling indah yang pernah kamu kunjungi?",
        "Apa yang membuatmu tertawa paling keras?",
        "Cerita embarrassing apa yang tidak bisa kamu lupakan?",
        "Apa kebiasaan aneh yang kamu punya?",
        "Prank paling lucu apa yang pernah kamu lakukan atau alami?",
        "Apa rahasia yang belum banyak orang tahu tentang kamu?",
        "Apa hal paling konyol yang pernah kamu lakukan?",
        "Siapa orang yang paling ingin kamu temui?",
        "Apa pencapaian yang paling kamu banggakan?",
        "Kapan terakhir kali kamu menangis dan kenapa?",
        "Apa yang paling kamu syukuri dalam hidup?",
        "Siapa role model kamu dan kenapa?",
        "Apa momen paling memalukan yang pernah kamu alami?",
        "Jika bisa kembali ke masa lalu, usia berapa yang ingin kamu kunjungi?",
        "Apa keputusan terberat yang pernah kamu buat?",
        "Siapa teman terdekatmu dan apa yang spesial dari dia?",
        "Apa tradisi keluarga favorit kamu?",
        "Kapan kamu merasa paling bangga pada diri sendiri?",
        "Apa yang membuat kamu unik dari orang lain?"
    ],
    hiburan: [
        "Film apa yang bisa kamu tonton berulang kali?",
        "Jika bisa bertemu satu selebriti, siapa yang akan kamu pilih?",
        "Lagu apa yang menggambarkan hidupmu saat ini?",
        "Serial TV apa yang paling kamu sukai?",
        "Genre musik favorit kamu apa?",
        "Jika bisa punya satu superpower, apa yang kamu pilih?",
        "Kalau bisa jadi hewan, kamu mau jadi apa?",
        "Negara mana yang paling ingin kamu kunjungi?",
        "Jika punya mesin waktu, mau ke masa lalu atau masa depan?",
        "Kalau bisa hidup di dunia fiksi, dunia apa yang kamu pilih?",
        "Makanan apa yang tidak bisa kamu tolak?",
        "Masakan dari negara mana yang paling kamu suka?",
        "Apa menu sarapan favoritmu?",
        "Minuman apa yang paling sering kamu pesan?",
        "Dessert favorit kamu apa?",
        "Menurutmu, apa tujuan hidup?",
        "Apa yang lebih penting: kebahagiaan atau kesuksesan?",
        "Apakah kamu percaya pada nasib atau usaha?",
        "Apa arti persahabatan sejati menurutmu?",
        "Bagaimana cara kamu menghadapi kegagalan?",
        "Jika bisa berbicara dengan hewan, hewan apa yang akan kamu pilih?",
        "Jika hidup adalah sebuah lagu, judulnya apa?",
        "Karakter film/buku favorit kamu siapa?",
        "Genre film yang paling kamu suka?",
        "Band atau musisi yang ingin kamu tonton live?",
        "Game favorit kamu apa?",
        "Buku terakhir yang kamu baca apa?",
        "Jika bisa masuk ke satu video game, game apa itu?",
        "Aplikasi yang paling sering kamu buka?",
        "Youtuber atau content creator favorit kamu?"
    ]
};

let currentCategory = '';
let currentQuestions = [];
let roundCount = 0;
let canPick = true;
const TOTAL_CARDS = 8;

const els = {
    startScreen: document.getElementById('startScreen'),
    categoryScreen: document.getElementById('categoryScreen'),
    gameScreen: document.getElementById('gameScreen'),
    startBtn: document.getElementById('startBtn'),
    categoryCards: document.querySelectorAll('.category-card'),
    cardsGrid: document.getElementById('cardsGrid'),
    roundCount: document.getElementById('roundCount'),
    totalCards: document.getElementById('totalCards'),
    shuffleBtn: document.getElementById('shuffleBtn'),
    resetBtn: document.getElementById('resetBtn'),
    backBtn: document.getElementById('backBtn'),
    modal: document.getElementById('modal'),
    modalQuestion: document.getElementById('modalQuestion'),
    modalClose: document.getElementById('modalClose')
};

function shuffle(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function createCards(animate = true) {
    const pool = questions[currentCategory] || questions.pribadi;
    currentQuestions = shuffle(pool).slice(0, TOTAL_CARDS);
    els.cardsGrid.innerHTML = '';

    const rotations = [-4, 3, -2, 5, -3, 2, -1, 4];

    for (let i = 0; i < TOTAL_CARDS; i++) {
        const slot = document.createElement('div');
        slot.className = 'card-slot stacked';
        slot.style.setProperty('--rotate', `${rotations[i]}deg`);
        slot.innerHTML = `
            <div class="card" data-index="${i}">
                <div class="card-face card-front">
                    <div class="card-front-inner">
                        <span class="card-emoji">🎴</span>
                        <div class="card-number">${i + 1}</div>
                    </div>
                </div>
                <div class="card-face card-back">
                    <p class="card-question">${currentQuestions[i]}</p>
                </div>
            </div>
        `;
        els.cardsGrid.appendChild(slot);
    }

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', handleCardClick);
    });

    if (animate) {
        setTimeout(() => {
            document.querySelectorAll('.card-slot').forEach((slot, i) => {
                setTimeout(() => {
                    slot.classList.remove('stacked');
                    slot.classList.add('spreading');
                }, i * 100);
            });
        }, 400);
    }
}

function handleCardClick(e) {
    const card = e.currentTarget;
    if (!canPick || card.classList.contains('flipped')) return;

    canPick = false;
    card.classList.add('flipped');
    const index = parseInt(card.dataset.index);

    setTimeout(() => {
        els.modalQuestion.textContent = currentQuestions[index];
        els.modal.classList.add('active');
        roundCount++;
        els.roundCount.textContent = roundCount;
    }, 400);
}

function shuffleCards() {
    els.shuffleBtn.disabled = true;
    els.resetBtn.disabled = true;

    const slots = document.querySelectorAll('.card-slot');
    const gridRect = els.cardsGrid.getBoundingClientRect();
    const centerX = gridRect.width / 2;
    const centerY = gridRect.height / 2;

    slots.forEach(slot => {
        const rect = slot.getBoundingClientRect();
        const slotX = rect.left - gridRect.left + rect.width / 2;
        const slotY = rect.top - gridRect.top + rect.height / 2;
        slot.style.setProperty('--tx', `${centerX - slotX}px`);
        slot.style.setProperty('--ty', `${centerY - slotY}px`);
        slot.classList.add('gathering');
    });

    setTimeout(() => {
        canPick = true;
        createCards(true);
        els.shuffleBtn.disabled = false;
        els.resetBtn.disabled = false;
    }, 800);
}

function resetGame() {
    els.resetBtn.disabled = true;
    els.shuffleBtn.disabled = true;

    const slots = document.querySelectorAll('.card-slot');
    const gridRect = els.cardsGrid.getBoundingClientRect();
    const centerX = gridRect.width / 2;
    const centerY = gridRect.height / 2;

    slots.forEach(slot => {
        const rect = slot.getBoundingClientRect();
        const slotX = rect.left - gridRect.left + rect.width / 2;
        const slotY = rect.top - gridRect.top + rect.height / 2;
        slot.style.setProperty('--tx', `${centerX - slotX}px`);
        slot.style.setProperty('--ty', `${centerY - slotY}px`);
        slot.classList.add('gathering');
    });

    setTimeout(() => {
        roundCount = 0;
        els.roundCount.textContent = roundCount;
        canPick = true;
        createCards(true);
        els.resetBtn.disabled = false;
        els.shuffleBtn.disabled = false;
    }, 800);
}

els.startBtn.addEventListener('click', () => {
    els.startScreen.classList.add('hidden');
    setTimeout(() => {
        els.categoryScreen.classList.add('active');
    }, 500);
});

els.categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        currentCategory = card.dataset.category;
        els.categoryScreen.classList.remove('active');
        setTimeout(() => {
            els.gameScreen.classList.add('active');
            createCards(true);
        }, 500);
    });
});

els.shuffleBtn.addEventListener('click', shuffleCards);
els.resetBtn.addEventListener('click', resetGame);

els.backBtn.addEventListener('click', () => {
    els.gameScreen.classList.remove('active');
    setTimeout(() => {
        els.categoryScreen.classList.add('active');
        // Reset game state
        roundCount = 0;
        els.roundCount.textContent = roundCount;
        currentCategory = '';
        currentQuestions = [];
        canPick = true;
        els.cardsGrid.innerHTML = '';
    }, 500);
});

els.modalClose.addEventListener('click', () => {
    els.modal.classList.remove('active');
});

els.modal.addEventListener('click', (e) => {
    if (e.target === els.modal) {
        els.modal.classList.remove('active');
    }
});
