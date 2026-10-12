
/* =========================================================
   FORMULIR PENDAFTARAN MAHASISWA BARU
   Modul 6 — Validasi Form
   ========================================================= */

"use strict";

const formPendaftaran = document.querySelector("#form-pendaftaran");
const pesanSukses = document.querySelector("#pesan-sukses");

const email = document.querySelector("#email");
const telepon = document.querySelector("#telepon");

const pilihan1 = document.querySelector("#pilihan1");
const pilihan2 = document.querySelector("#pilihan2");
const pilihan3 = document.querySelector("#pilihan3");

const radioJK = document.querySelectorAll(
  'input[name="jenisKelamin"]'
);
const errorJK = document.querySelector("#error-jenisKelamin");

const persetujuan = document.querySelector("#persetujuan");
const errorPersetujuan = document.querySelector("#error-persetujuan");

// Menandai apakah formulir pernah dikirim.
let sudahSubmit = false;

// =========================================================
// 1. DAFTAR FIELD DAN PESAN KESALAHAN
// =========================================================

const daftarField = [
  ["nama", "error-nama"],
  ["status", "error-status"],
  ["agama", "error-agama"],
  ["kewarganegaraan", "error-kewarganegaraan"],
  ["alamat", "error-alamat"],
  ["kabupaten", "error-kabupaten"],
  ["provinsi", "error-provinsi"],
  ["telepon", "error-telepon"],
  ["email", "error-email"],
  ["namaOrtu", "error-namaOrtu"],
  ["hpOrtu", "error-hpOrtu"],
  ["pendidikanOrtu", "error-pendidikanOrtu"],
  ["pilihan1", "error-pilihan1"],
  ["pilihan2", "error-pilihan2"],
  ["pilihan3", "error-pilihan3"],
  ["sekolah", "error-sekolah"],
  ["tahunLulus", "error-tahunLulus"]
];

// Ambil elemen input berdasarkan ID.
function ambilField(id) {
  return document.getElementById(id);
}

// Ambil pesan kesalahan atau buat jika belum tersedia.
function ambilPesanError(input, idError) {
  let error = document.getElementById(idError);

  if (!error && input) {
    error = document.createElement("span");
    error.id = idError;
    error.className = "pesan-error";
    input.insertAdjacentElement("afterend", error);
  }

  return error;
}

// =========================================================
// 2. FUNGSI MENAMPILKAN PESAN VALIDASI
//    Menggunakan Constraint Validation API
// =========================================================

function validasiField(input, errorElement) {
  if (!input || !errorElement) {
    return;
  }

  const validitas = input.validity;

  if (input.checkValidity()) {
    errorElement.textContent = "";
    return;
  }

  if (validitas.customError) {
    errorElement.textContent = input.validationMessage;
  } else if (validitas.valueMissing) {
    errorElement.textContent = "Field ini wajib diisi.";
  } else if (validitas.tooShort) {
    errorElement.textContent =
      `Minimal ${input.minLength} karakter.`;
  } else if (validitas.tooLong) {
    errorElement.textContent =
      `Maksimal ${input.maxLength} karakter.`;
  } else if (validitas.typeMismatch) {
    errorElement.textContent =
      "Format input tidak valid.";
  } else if (validitas.patternMismatch) {
    errorElement.textContent =
      "Format input tidak sesuai.";
  } else if (validitas.rangeUnderflow) {
    errorElement.textContent =
      `Nilai minimal adalah ${input.min}.`;
  } else if (validitas.rangeOverflow) {
    errorElement.textContent =
      `Nilai maksimal adalah ${input.max}.`;
  } else if (validitas.stepMismatch) {
    errorElement.textContent =
      "Nilai yang dimasukkan tidak sesuai.";
  } else {
    errorElement.textContent = input.validationMessage;
  }
}

// =========================================================
// 3. VALIDASI EMAIL DAN NOMOR TELEPON
// =========================================================

function validasiEmail() {
  if (!email) return;

  email.setCustomValidity("");

  if (email.validity.valueMissing) {
    email.setCustomValidity("Email wajib diisi.");
  } else if (email.validity.typeMismatch) {
    email.setCustomValidity(
      "Format email tidak valid. Contoh: nama@email.com"
    );
  }
}

function validasiTelepon() {
  if (!telepon) return;

  telepon.setCustomValidity("");

  if (telepon.validity.valueMissing) {
    telepon.setCustomValidity(
      "Nomor telepon wajib diisi."
    );
  } else if (telepon.validity.patternMismatch) {
    telepon.setCustomValidity(
      "Nomor telepon harus terdiri dari 10–13 angka."
    );
  }
}

// =========================================================
// 4. VALIDASI PILIHAN PROGRAM STUDI
//    Pilihan I, II, dan III tidak boleh sama
// =========================================================

function validasiPilihanProdi() {
  const pilihan = [pilihan1, pilihan2, pilihan3];

  // Hapus pesan validasi duplikat sebelumnya.
  pilihan.forEach((field) => {
    if (field) {
      field.setCustomValidity("");
    }
  });

  // Periksa apakah terdapat program studi yang sama.
  pilihan.forEach((field) => {
    if (!field || field.value === "") {
      return;
    }

    const jumlahSama = pilihan.filter(
      (item) => item && item.value === field.value
    ).length;

    if (jumlahSama > 1) {
      field.setCustomValidity(
        "Program studi ini sudah dipilih. " +
        "Silakan pilih program studi lain."
      );
    }
  });

  // Perbarui pesan untuk semua pilihan.
  [
    ["pilihan1", "error-pilihan1"],
    ["pilihan2", "error-pilihan2"],
    ["pilihan3", "error-pilihan3"]
  ].forEach(([id, idError]) => {
    const field = ambilField(id);
    const error = ambilPesanError(field, idError);

    if (field && error) {
      validasiField(field, error);
    }
  });
}

// =========================================================
// 5. MEMPERBARUI VALIDASI KHUSUS
// =========================================================

function perbaruiValiditasKhusus() {
  validasiEmail();
  validasiTelepon();
  validasiPilihanProdi();
}

// =========================================================
// 6. DAFTARKAN SELURUH INPUT UNTUK VALIDASI
// =========================================================

// Input tambahan seperti tahun NEM, jumlah nilai,
// jumlah mata pelajaran, dan jumlah sumbangan juga diperiksa.
const semuaField = formPendaftaran
  ? formPendaftaran.querySelectorAll(
      "input:not([type='radio']):not([type='checkbox']), " +
      "select, textarea"
    )
  : [];

semuaField.forEach((field) => {
  const idError = `error-${field.id}`;
  const error = ambilPesanError(field, idError);

  function perbaruiField() {
    perbaruiValiditasKhusus();

    // Tampilkan pesan saat formulir sudah dikirim
    // atau ketika field memiliki pesan kesalahan.
    if (sudahSubmit || field.validationMessage) {
      validasiField(field, error);
    }
  }

  field.addEventListener("input", perbaruiField);
  field.addEventListener("change", perbaruiField);
});

// =========================================================
// 7. VALIDASI JENIS KELAMIN
// =========================================================

function validasiJenisKelamin() {
  const jkDipilih = Array.from(radioJK).some(
    (radio) => radio.checked
  );

  if (errorJK) {
    errorJK.textContent = jkDipilih
      ? ""
      : "Jenis kelamin wajib dipilih.";
  }

  return jkDipilih;
}

radioJK.forEach((radio) => {
  radio.addEventListener("change", () => {
    validasiJenisKelamin();
  });
});

// =========================================================
// 8. VALIDASI PERSETUJUAN
// =========================================================

function validasiPersetujuan() {
  const disetujui = Boolean(
    persetujuan && persetujuan.checked
  );

  if (errorPersetujuan) {
    errorPersetujuan.textContent = disetujui
      ? ""
      : "Anda harus menyetujui pernyataan.";
  }

  return disetujui;
}

if (persetujuan) {
  persetujuan.addEventListener("change", () => {
    validasiPersetujuan();
  });
}

// =========================================================
// 9. VALIDASI SELURUH FORM SAAT SUBMIT
// =========================================================

if (formPendaftaran) {
  formPendaftaran.addEventListener("submit", (event) => {
    event.preventDefault();

    sudahSubmit = true;

    // Hapus pesan sukses sebelumnya.
    if (pesanSukses) {
      pesanSukses.textContent = "";
      pesanSukses.style.display = "none";
    }

    // Perbarui seluruh validasi khusus.
    perbaruiValiditasKhusus();

    // Periksa semua input, termasuk field opsional
    // yang mempunyai batas nilai.
    semuaField.forEach((field) => {
      const error = ambilPesanError(
        field,
        `error-${field.id}`
      );

      validasiField(field, error);
    });

    // Periksa jenis kelamin dan persetujuan.
    const jkValid = validasiJenisKelamin();
    const persetujuanValid = validasiPersetujuan();

    // Periksa validitas seluruh formulir.
    const formValid = formPendaftaran.checkValidity();

    if (!formValid || !jkValid || !persetujuanValid) {
      // Cari field pertama yang tidak valid.
      const fieldTidakValid = Array.from(
        formPendaftaran.elements
      ).find((field) => {
        return typeof field.checkValidity === "function" &&
          !field.checkValidity();
      });

      if (fieldTidakValid) {
        fieldTidakValid.focus();
      } else if (!jkValid && radioJK.length > 0) {
        radioJK[0].focus();
      } else if (!persetujuanValid && persetujuan) {
        persetujuan.focus();
      }

      return;
    }

    // Validasi berhasil, tetapi belum ada pengiriman
    // data ke server atau penyimpanan basis data.
    if (pesanSukses) {
      pesanSukses.textContent =
        "Validasi berhasil! Data formulir siap diproses.";

      pesanSukses.style.display = "block";
    }

    // Formulir sengaja tidak di-reset otomatis agar
    // pengguna masih dapat memeriksa data yang diisi.
  });
}

// =========================================================
// 10. RESET FORM
// =========================================================

if (formPendaftaran) {
  formPendaftaran.addEventListener("reset", () => {
    // Reset event terjadi sebelum nilai field dikembalikan.
    // Gunakan microtask agar pembersihan dilakukan setelahnya.
    queueMicrotask(() => {
      sudahSubmit = false;

      formPendaftaran.querySelectorAll(
        "input, select, textarea"
      ).forEach((field) => {
        field.setCustomValidity("");
      });

      formPendaftaran.querySelectorAll(".pesan-error")
        .forEach((error) => {
          error.textContent = "";
        });

      if (pesanSukses) {
        pesanSukses.textContent = "";
        pesanSukses.style.display = "none";
      }
    });
  });
}
