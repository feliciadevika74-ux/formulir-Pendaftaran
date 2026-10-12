"use strict";

/* =============================================================
   MODUL 5 — VALIDASI FORM
   Bagian B — Kegiatan Praktikum (program lengkap: script.js)
   Mata Kuliah: Pemrograman Berbasis Web (PROG31W)

   Praktikum ini MELANJUTKAN kode dari modul sebelumnya, sehingga
   file ini KUMULATIF:
     - Basis Modul 3 (JavaScript Dasar & DOM)
     - Modul 4 (Event Handling)
     - Modul 5 (Validasi Form)   <-- fokus modul ini

   Berpasangan dengan index.html & style.css pada paket yang sama.
   Tautkan sebelum </body>: <script src="script.js"></script>
   ============================================================= */


/* =========================================================
   BASIS — MODUL 3 (JavaScript Dasar dan DOM)
   ========================================================= */

const judulSitus = document.querySelector("header h1");
if (judulSitus) {
  console.log(judulSitus);
  console.log(judulSitus.textContent);
}

const tombolTema = document.querySelector("#btn-tema");
function toggleTema() {
  document.body.classList.toggle("dark-mode");
}
if (tombolTema) {
  tombolTema.addEventListener("click", toggleTema);
}

const tombolInfo = document.querySelector("#btn-info");
const kotakAside = document.querySelector("aside");
if (tombolInfo && kotakAside) {
  tombolInfo.addEventListener("click", () => {
    kotakAside.classList.toggle("tersembunyi");
  });
}

const daftarArtikel = [
  { judul: "Mengenal HTML Semantik", tanggal: "2026-08-20", isi: "HTML semantik membantu membangun struktur halaman yang bermakna..." },
  { judul: "Dasar CSS Responsif", tanggal: "2026-08-22", isi: "CSS responsif memastikan tampilan menyesuaikan berbagai layar..." },
  { judul: "Mengenal JavaScript dan DOM", tanggal: "2026-08-24", isi: "JavaScript memungkinkan halaman web menjadi interaktif..." },
];

const containerArtikel = document.querySelector(".daftar-artikel");

if (containerArtikel) {
  daftarArtikel.forEach((data) => {
    const article = document.createElement("article");

    const judul = document.createElement("h3");
    judul.textContent = data.judul;

    const waktu = document.createElement("time");
    waktu.textContent = data.tanggal;

    const isi = document.createElement("p");
    isi.textContent = data.isi;

    const tombolLike = document.createElement("button");
    let jumlahLike = 0;
    tombolLike.textContent = `Like (${jumlahLike})`;

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";

    article.appendChild(judul);
    article.appendChild(waktu);
    article.appendChild(isi);
    article.appendChild(tombolLike);
    article.appendChild(tombolHapus);

    containerArtikel.appendChild(article);
  });


  /* =======================================================
     MODUL 4 — EVENT HANDLING
     ======================================================= */

  // Hover pada artikel (event delegation)
  containerArtikel.addEventListener("mouseover", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.add("artikel-hover");
  });
  containerArtikel.addEventListener("mouseout", (e) => {
    const article = e.target.closest("article");
    if (article) article.classList.remove("artikel-hover");
  });

  // Tombol Like (event delegation) — dibedakan dari tombol Hapus lewat teks
  containerArtikel.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent.startsWith("Like")) {
      let jumlah = parseInt(e.target.dataset.like || 0);
      jumlah++;
      e.target.dataset.like = jumlah;
      e.target.textContent = `Like (${jumlah})`;
    }
  });

  // Hapus artikel — hanya untuk tombol "Hapus"
  containerArtikel.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.textContent === "Hapus") {
      e.target.closest("article").remove();
    }
  });
}

// Form komentar (Modul 4): submit + preventDefault + render ke DOM
const formKomentar = document.querySelector("#form-komentar");
const daftarKomentar = document.querySelector("#daftar-komentar");

if (formKomentar && daftarKomentar) {
  formKomentar.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.querySelector("#input-nama").value.trim();
    const pesan = document.querySelector("#input-pesan").value.trim();
    if (nama === "" || pesan === "") {
      alert("Nama dan komentar wajib diisi!");
      return;
    }
    const itemKomentar = document.createElement("li");
    itemKomentar.textContent = `${nama}: ${pesan}`;
    daftarKomentar.appendChild(itemKomentar);
    formKomentar.reset();
  });
}

// Keyboard shortcut (Modul 4): tekan "d" untuk dark mode (abaikan saat mengetik)
document.addEventListener("keydown", (e) => {
  const tag = e.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (e.key.toLowerCase() === "d") {
    document.body.classList.toggle("dark-mode");
  }
});


/* =========================================================
   MODUL 5 — VALIDASI FORM (Bagian B)
   ========================================================= */

/* B.4 — Langkah 3: Pesan error kustom pada form komentar
   via Constraint Validation API (setCustomValidity), dijalankan
   setiap event input. (Atribut required/minlength ada di index.html.) */
const inputNama = document.querySelector("#input-nama");
if (inputNama) {
  inputNama.addEventListener("input", () => {
    if (inputNama.validity.valueMissing) {
      inputNama.setCustomValidity("Nama wajib diisi");
    } else if (inputNama.validity.tooShort) {
      inputNama.setCustomValidity("Nama minimal 3 karakter");
    } else {
      inputNama.setCustomValidity("");
    }
  });
}

const inputPesan = document.querySelector("#input-pesan");
if (inputPesan) {
  inputPesan.addEventListener("input", () => {
    if (inputPesan.validity.valueMissing) {
      inputPesan.setCustomValidity("Komentar wajib diisi");
    } else if (inputPesan.validity.tooShort) {
      inputPesan.setCustomValidity("Komentar minimal 5 karakter");
    } else {
      inputPesan.setCustomValidity("");
    }
  });
}

/* B.5 — Langkah 4: Form pendaftaran akun + validasi konfirmasi password.
   preventDefault() dipanggil di awal agar simulasi tidak me-reload halaman. */
const formDaftar = document.querySelector("#form-daftar");
const errorKonfirmasi = document.querySelector("#error-konfirmasi");

if (formDaftar && errorKonfirmasi) {
  formDaftar.addEventListener("submit", (e) => {
    e.preventDefault(); // simulasi tanpa backend -> cegah reload

    const password = document.querySelector("#password").value;
    const konfirmasi = document.querySelector("#konfirmasi").value;

    if (password !== konfirmasi) {
      errorKonfirmasi.textContent = "Konfirmasi password tidak sama dengan password";
    } else {
      errorKonfirmasi.textContent = "";
      alert("Pendaftaran berhasil (simulasi)!");
      formDaftar.reset();
    }
  });
}

/* B.6 — Langkah 5: Pesan error per field di DOM (bukan alert).
   validasiField() menulis pesan bawaan browser ke <span> milik tiap field. */
function validasiField(input, errorElement) {
  if (!input.checkValidity()) {
    errorElement.textContent = input.validationMessage;
  } else {
    errorElement.textContent = "";
  }
}

// Pasang pada field form pendaftaran (pola serupa bisa diperluas ke field lain)
[
  ["#username", "#error-username"],
  ["#email", "#error-email"],
  ["#password", "#error-password"],
].forEach(([fieldSel, errorSel]) => {
  const field = document.querySelector(fieldSel);
  const errEl = document.querySelector(errorSel);
  if (field && errEl) {
    field.addEventListener("input", () => validasiField(field, errEl));
  }
});
