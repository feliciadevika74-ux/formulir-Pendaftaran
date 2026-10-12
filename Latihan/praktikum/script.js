
"use strict";

// ==========================================
// MODUL 5
// JAVASCRIPT DAN EVENT HANDLING
// ==========================================


// ==========================================
// 1. VARIABEL DAN SELEKSI ELEMEN
// ==========================================

const tombolTema = document.querySelector("#btn-tema");
const tombolTambah = document.querySelector("#btn-tambah");

const containerPengalaman =
    document.querySelector(".daftar-pengalaman");

const formPengalaman =
    document.querySelector("#form-pengalaman");

const tombolSimpan =
    document.querySelector("#btn-simpan");

const tombolBatal =
    document.querySelector("#btn-batal");

const isiKontak =
    document.querySelector("#isi-kontak");

const tombolToggleKontak =
    document.querySelector("#btn-toggle-kontak");

const linkNavigasi =
    document.querySelectorAll("nav a");

const semuaBagian =
    document.querySelectorAll("main > section, main > aside");

const formKomentar =
    document.querySelector("#form-komentar");

const inputNamaKomentar =
    document.querySelector("#input-nama-komentar");

const inputPesan =
    document.querySelector("#input-pesan");

const daftarKomentarDOM =
    document.querySelector("#daftar-komentar");

const pesanError =
    document.querySelector("#pesan-error");

const tombolHapusSemua =
    document.querySelector("#btn-hapus-semua");

const modalKonfirmasi =
    document.querySelector("#modal-konfirmasi");

const btnYa =
    document.querySelector("#btn-ya");

const btnTidak =
    document.querySelector("#btn-tidak");

const formPendaftaran =
    document.querySelector("#form-pendaftaran");

const inputUsername =
    document.querySelector("#username");

const inputEmail =
    document.querySelector("#email");

const inputPassword =
    document.querySelector("#password");

const inputKonfirmasiPassword =
    document.querySelector("#confirm-password");

const errorKonfirmasi =
    document.querySelector("#error-konfirmasi");

const pesanPendaftaran =
    document.querySelector("#pesan-pendaftaran");


// ==========================================
// 2. DATA PENGALAMAN
// ==========================================

const daftarPengalaman = [
    {
        id: 1,
        nama: "Anggota Divisi Minat dan Bakat (Himpunan Mahasiswa Informatika)",
        periode: "2026 - Sekarang",
        deskripsi:
            "Aktif dalam merancang dan mengeksekusi program kerja pengembangan potensi mahasiswa di bidang akademik maupun non-akademik."
    },
    {
        id: 2,
        nama: "Anggota Kader Posyandu Desa",
        periode: "2019 - 2026",
        deskripsi:
            "Berpartisipasi dalam kegiatan pelayanan masyarakat desa dan membantu pencatatan data kegiatan rutin."
    },
    {
        id: 3,
        nama: "Sekretaris 2 Panitia IT DAYS",
        periode: "2026 - Sekarang",
        deskripsi:
            "Bertanggung jawab dalam pengelolaan administrasi, penyusunan dokumen kegiatan, notulen, dan koordinasi persuratan."
    },
    {
        id: 4,
        nama: "Bendahara Organisasi Pemuda-Pemudi Desa",
        periode: "2026 - Sekarang",
        deskripsi:
            "Mengelola pencatatan pemasukan dan pengeluaran serta membantu penyusunan anggaran kegiatan."
    }
];


// ==========================================
// 3. MENAMPILKAN PENGALAMAN
// ==========================================

function tampilkanPengalaman() {
    containerPengalaman.innerHTML = "";

    daftarPengalaman.forEach(function(pengalaman) {
        const article = document.createElement("article");
        article.className = "experience-card";

        const judul = document.createElement("h3");
        judul.textContent = pengalaman.nama;

        const periode = document.createElement("p");

        const labelPeriode = document.createElement("strong");
        labelPeriode.textContent = "Periode: ";

        periode.appendChild(labelPeriode);
        periode.appendChild(
            document.createTextNode(pengalaman.periode)
        );

        const deskripsi = document.createElement("p");
        deskripsi.textContent = pengalaman.deskripsi;

        const tombolContainer = document.createElement("div");
        tombolContainer.className = "tombol-pengalaman";

        // Tombol Like
        const tombolLike = document.createElement("button");
        tombolLike.className = "tombol-like";
        tombolLike.type = "button";
        tombolLike.textContent = "Like (0)";
        tombolLike.dataset.like = "0";

        // Tombol Hapus
        const tombolHapus = document.createElement("button");
        tombolHapus.className = "tombol-hapus";
        tombolHapus.type = "button";
        tombolHapus.textContent = "Hapus";
        tombolHapus.dataset.id = pengalaman.id;

        tombolContainer.append(tombolLike, tombolHapus);

        article.append(
            judul,
            periode,
            deskripsi,
            tombolContainer
        );

        containerPengalaman.appendChild(article);
    });

    // Memperbarui jumlah pengalaman
    document.querySelector(
        ".experience-number span"
    ).textContent = String(daftarPengalaman.length).padStart(2, "0");
}

tampilkanPengalaman();


// ==========================================
// 4. NAVIGASI ANTARBAGIAN
// ==========================================

function tampilkanBagian(idBagian) {
    const bagianAktif = document.querySelector(idBagian);

    if (
        !bagianAktif ||
        !bagianAktif.matches("main > section, main > aside")
    ) {
        return;
    }

    semuaBagian.forEach(function(bagian) {
        bagian.classList.remove("active");
    });

    bagianAktif.classList.add("active");
}

linkNavigasi.forEach(function(link) {
    link.addEventListener("click", function(event) {
        const tujuan = link.getAttribute("href");

        event.preventDefault();

        tampilkanBagian(tujuan);

        // Memperbarui alamat bagian pada browser
        history.replaceState(null, "", tujuan);
    });
});

// Membuka bagian sesuai URL atau menampilkan Tentang Saya
if (
    location.hash &&
    document.querySelector(location.hash) &&
    document.querySelector(location.hash).matches(
        "main > section, main > aside"
    )
) {
    tampilkanBagian(location.hash);
} else {
    tampilkanBagian("#tentang");
}


// ==========================================
// 5. MODE GELAP
// ==========================================

function toggleTema() {
    const modeGelapAktif =
        document.body.classList.toggle("dark-mode");

    tombolTema.textContent = modeGelapAktif
        ? "Mode Terang"
        : "Mode Gelap";

    tombolTema.setAttribute(
        "aria-pressed",
        String(modeGelapAktif)
    );
}

tombolTema.addEventListener("click", toggleTema);


// ==========================================
// 6. KEYBOARD SHORTCUT
// Tekan D untuk mengganti tema
// ==========================================

document.addEventListener("keydown", function(event) {
    const elemenAktif = document.activeElement;

    const sedangMengetik = elemenAktif.matches(
        "input, textarea, select, [contenteditable='true']"
    );

    if (
        event.key.toLowerCase() === "d" &&
        !sedangMengetik &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey
    ) {
        toggleTema();
    }

    if (
        event.key === "Escape" &&
        modalKonfirmasi.style.display === "block"
    ) {
        tutupModal();
    }
});


// ==========================================
// 7. FORM TAMBAH PENGALAMAN
// ==========================================

tombolTambah.addEventListener("click", function() {
    const formTerbuka =
        formPengalaman.style.display === "block";

    formPengalaman.style.display =
        formTerbuka ? "none" : "block";
});

tombolBatal.addEventListener("click", function() {
    formPengalaman.style.display = "none";
});

tombolSimpan.addEventListener("click", function() {
    const inputNama = document.querySelector("#input-nama");
    const inputPeriode = document.querySelector("#input-periode");
    const inputDeskripsi = document.querySelector("#input-deskripsi");

    const nama = inputNama.value.trim();
    const periode = inputPeriode.value.trim();
    const deskripsi = inputDeskripsi.value.trim();

    if (!nama || !periode || !deskripsi) {
        alert("Semua data pengalaman harus diisi.");
        return;
    }

    const pengalamanBaru = {
        id: Date.now(),
        nama: nama,
        periode: periode,
        deskripsi: deskripsi
    };

    daftarPengalaman.push(pengalamanBaru);

    tampilkanPengalaman();

    inputNama.value = "";
    inputPeriode.value = "";
    inputDeskripsi.value = "";

    formPengalaman.style.display = "none";
});


// ==========================================
// 8. EVENT HOVER PENGALAMAN
// ==========================================

containerPengalaman.addEventListener("mouseover", function(event) {
    const article = event.target.closest("article");

    if (
        article &&
        containerPengalaman.contains(article) &&
        !article.contains(event.relatedTarget)
    ) {
        article.classList.add("artikel-hover");
    }
});

containerPengalaman.addEventListener("mouseout", function(event) {
    const article = event.target.closest("article");

    if (
        article &&
        containerPengalaman.contains(article) &&
        !article.contains(event.relatedTarget)
    ) {
        article.classList.remove("artikel-hover");
    }
});


// ==========================================
// 9. EVENT DELEGATION
// LIKE DAN HAPUS PENGALAMAN
// ==========================================

containerPengalaman.addEventListener("click", function(event) {
    const target = event.target;

    // Tombol Like
    if (target.classList.contains("tombol-like")) {
        let jumlah = Number(target.dataset.like || 0);

        jumlah++;

        target.dataset.like = String(jumlah);
        target.textContent = "Like (" + jumlah + ")";
    }

    // Tombol Hapus
    if (target.classList.contains("tombol-hapus")) {
        const idYangDihapus = Number(target.dataset.id);

        const index = daftarPengalaman.findIndex(
            function(pengalaman) {
                return pengalaman.id === idYangDihapus;
            }
        );

        if (index !== -1) {
            daftarPengalaman.splice(index, 1);
            tampilkanPengalaman();
        }
    }
});


// ==========================================
// 10. TOGGLE KONTAK
// ==========================================

tombolToggleKontak.addEventListener("click", function() {
    const kontakTersembunyi =
        isiKontak.style.display === "none";

    isiKontak.style.display =
        kontakTersembunyi ? "" : "none";

    tombolToggleKontak.textContent =
        kontakTersembunyi
            ? "Sembunyikan Kontak"
            : "Tampilkan Kontak";

    tombolToggleKontak.setAttribute(
        "aria-expanded",
        String(kontakTersembunyi)
    );
});


// ==========================================
// 11. VALIDASI FORM KOMENTAR
// ==========================================

formKomentar.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = inputNamaKomentar.value.trim();
    const pesan = inputPesan.value.trim();

    pesanError.textContent = "";

    if (nama.length < 3) {
        pesanError.textContent =
            "Nama minimal 3 karakter.";

        inputNamaKomentar.focus();
        return;
    }

    if (pesan.length < 5) {
        pesanError.textContent =
            "Komentar minimal 5 karakter.";

        inputPesan.focus();
        return;
    }

    if (nama.length > 30 || pesan.length > 200) {
        pesanError.textContent =
            "Nama maksimal 30 karakter dan komentar maksimal 200 karakter.";
        return;
    }

    // Membuat elemen komentar
    const itemKomentar = document.createElement("li");

    const teksKomentar = document.createElement("span");
    teksKomentar.className = "komentar-text";
    teksKomentar.textContent = nama + ": " + pesan;

    const tombolHapus = document.createElement("button");
    tombolHapus.className = "hapus-komentar";
    tombolHapus.type = "button";
    tombolHapus.textContent = "Hapus";

    itemKomentar.append(teksKomentar, tombolHapus);
    daftarKomentarDOM.appendChild(itemKomentar);

    formKomentar.reset();
});


// ==========================================
// 12. HAPUS SATU KOMENTAR
// EVENT DELEGATION
// ==========================================

daftarKomentarDOM.addEventListener("click", function(event) {
    if (event.target.classList.contains("hapus-komentar")) {
        event.target.closest("li").remove();
    }
});


// ==========================================
// 13. MODAL KONFIRMASI HAPUS KOMENTAR
// ==========================================

function bukaModal() {
    modalKonfirmasi.style.display = "block";
    btnTidak.focus();
}

function tutupModal() {
    modalKonfirmasi.style.display = "none";
    tombolHapusSemua.focus();
}

tombolHapusSemua.addEventListener("click", function() {
    if (daftarKomentarDOM.children.length === 0) {
        pesanError.textContent =
            "Belum ada komentar untuk dihapus.";
        return;
    }

    pesanError.textContent = "";
    bukaModal();
});

btnYa.addEventListener("click", function() {
    daftarKomentarDOM.innerHTML = "";
    tutupModal();
});

btnTidak.addEventListener("click", tutupModal);

modalKonfirmasi.addEventListener("click", function(event) {
    if (event.target === modalKonfirmasi) {
        tutupModal();
    }
});


// ==========================================
// 14. VALIDASI KONFIRMASI PASSWORD
// ==========================================

function validasiKonfirmasiPassword() {
    const password = inputPassword.value;
    const konfirmasi = inputKonfirmasiPassword.value;

    if (konfirmasi === "") {
        errorKonfirmasi.textContent = "";
        inputKonfirmasiPassword.setCustomValidity("");
        return true;
    }

    if (password !== konfirmasi) {
        const pesan =
            "Konfirmasi password tidak sama dengan password.";

        errorKonfirmasi.textContent = pesan;
        inputKonfirmasiPassword.setCustomValidity(pesan);

        return false;
    }

    errorKonfirmasi.textContent = "";
    inputKonfirmasiPassword.setCustomValidity("");

    return true;
}

inputPassword.addEventListener(
    "input",
    validasiKonfirmasiPassword
);

inputKonfirmasiPassword.addEventListener(
    "input",
    validasiKonfirmasiPassword
);


// ==========================================
// 15. FORM PENDAFTARAN AKUN
// SIMULASI TANPA SERVER
// ==========================================

formPendaftaran.addEventListener("submit", function(event) {
    event.preventDefault();

    pesanPendaftaran.textContent = "";
    errorKonfirmasi.textContent = "";

    const username = inputUsername.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value;
    const konfirmasi = inputKonfirmasiPassword.value;

    if (username.length < 4) {
        pesanPendaftaran.textContent =
            "Username minimal 4 karakter.";

        inputUsername.focus();
        return;
    }

    if (email === "" || !inputEmail.validity.valid) {
        pesanPendaftaran.textContent =
            "Masukkan alamat email yang valid.";

        inputEmail.focus();
        return;
    }

    if (password.length < 8) {
        pesanPendaftaran.textContent =
            "Password minimal 8 karakter.";

        inputPassword.focus();
        return;
    }

    if (password !== konfirmasi) {
        errorKonfirmasi.textContent =
            "Konfirmasi password tidak sama dengan password.";

        inputKonfirmasiPassword.focus();
        return;
    }

    pesanPendaftaran.textContent =
        "Pendaftaran berhasil! Ini hanya simulasi.";

    formPendaftaran.reset();
    errorKonfirmasi.textContent = "";
});
