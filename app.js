// ================================
// Dog Market
// app.js Part1
// ================================

// 検索欄
const searchInput = document.getElementById("search");
const prefectureSelect = document.getElementById("prefecture");
const priceSelect = document.getElementById("price");
const searchBtn = document.getElementById("searchBtn");

// 犬カード
const cards = document.querySelectorAll(".card");

// モーダル
const modal = document.getElementById("dogModal");
const closeBtn = document.getElementById("close");

// モーダル表示用
const dogImage = document.getElementById("dogImage");
const dogName = document.getElementById("dogName");
const dogSex = document.getElementById("dogSex");
const dogAge = document.getElementById("dogAge");
const dogPrefecture = document.getElementById("dogPrefecture");
const dogPrice = document.getElementById("dogPrice");
const dogDescription = document.getElementById("dogDescription");

// ================================
// 検索
// ================================

function filterDogs() {

    const keyword = searchInput.value.toLowerCase().trim();
    const prefecture = prefectureSelect.value;
    const price = priceSelect.value;

    cards.forEach(card => {

        const name = card.dataset.name.toLowerCase();
        const pref = card.dataset.prefecture;
        const value = Number(card.dataset.price);

        let visible = true;

        // 犬種
        if (keyword && !name.includes(keyword)) {
            visible = false;
        }

        // 都道府県
        if (prefecture && pref !== prefecture) {
            visible = false;
        }

        // 価格
        if (price) {

            const [min, max] = price.split("-").map(Number);

            if (value < min || value > max) {
                visible = false;
            }

        }

        card.style.display = visible ? "block" : "none";

    });

}

searchBtn.addEventListener("click", filterDogs);

searchInput.addEventListener("keyup", filterDogs);

prefectureSelect.addEventListener("change", filterDogs);

priceSelect.addEventListener("change", filterDogs);

// ================================
// 詳細モーダル
// ================================

document.querySelectorAll(".detailBtn").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".card");

        dogImage.src = card.dataset.image;
        dogImage.alt = card.dataset.name;

        dogName.textContent = card.dataset.name;
        dogSex.textContent = "性別：" + card.dataset.sex;
        dogAge.textContent = "月齢：" + card.dataset.age;
        dogPrefecture.textContent = "所在地：" + card.dataset.prefecture;
        dogPrice.textContent =
            "価格：¥" + Number(card.dataset.price).toLocaleString();

        dogDescription.textContent = card.dataset.description;

        modal.style.display = "flex";

    });

});

// 閉じる
closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});

// 背景クリック
window.addEventListener("click", e => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// ================================
// Dog Market
// app.js Part2
// ================================

// ================================
// お気に入り機能
// ================================

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelectorAll(".favorite").forEach(button => {

    const card = button.closest(".card");
    const dogName = card.dataset.name;

    if (favorites.includes(dogName)) {
        button.textContent = "❤️ お気に入り済み";
    }

    button.addEventListener("click", () => {

        if (favorites.includes(dogName)) {

            favorites = favorites.filter(name => name !== dogName);

            button.textContent = "♡ お気に入り";

        } else {

            favorites.push(dogName);

            button.textContent = "❤️ お気に入り済み";

        }

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

    });

});

// ================================
// 見学予約
// ================================

const reserveBtn = document.getElementById("reserveBtn");

if (reserveBtn) {

    reserveBtn.addEventListener("click", () => {

        alert(
            dogName.textContent +
            " の見学予約ページは準備中です。"
        );

    });

}

// ================================
// 初期化
// ================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Dog Market 起動");

});
