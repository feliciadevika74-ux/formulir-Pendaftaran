LATIHAN SOAL EVALUASI MANDIRI


1. Jelaskan mengapa validasi client-side tidak boleh menjadi satu-satunya lapisan validasi pada aplikasi web.
JAWAB:
Karena kode di browser bisa dilewati atau dimanipulasi (misalnya JavaScript dimatikan, HTML diubah, atau request dikirim langsung ke server). Maka validasi server-side tetap wajib untuk memastikan data aman dan benar. Client-side hanya untuk feedback cepat. 

2. Sebutkan minimal tiga atribut validasi bawaan HTML5 beserta fungsinya masing-masing.
JAWAB: 
    - `required`: mewajibkan pengguna mengisi field sebelum formulir dapat dikirim.
    - `type="email"`: memeriksa agar nilai memiliki format alamat email yang valid.
    - `minlength` dan `maxlength`: membatasi jumlah karakter minimum dan maksimum.   
    - `min` dan `max`: membatasi nilai minimum dan maksimum, misalnya untuk angka atau tanggal.
    - `pattern`: mewajibkan nilai sesuai pola ekspresi reguler yang ditentukan.

3. Jelaskan perbedaan antara input.checkValidity() dan input.reportValidity().
JAWAB: 
    - checkValidity() → hanya mengembalikan true/false tanpa menampilkan pesan error.
    - reportValidity() → memeriksa validitas sekaligus menampilkan pesan error bawaan browser.
Keduanya memicu event invalid jika input tidak valid.

4. Apa fungsi setCustomValidity("") (string kosong), dan mengapa penting memanggilnya kembali setelah error diperbaiki?
JAWAB:
Menghapus pesan error kustom sebelumnya. Penting dipanggil setelah nilai diperbaiki, agar input kembali dianggap valid. Jika tidak, form tetap ditolak meski nilainya sudah benar.

5. Rancang aturan validasi (beserta pseudocode) agar field “Tanggal Lahir” tidak boleh berada di masa depan.
JAWAB: 
Aturan: nilai harus ≤ tanggal hari ini. Bisa dibatasi dengan atribut max dan dicek ulang dengan JavaScript/server-side.
Pseudocode:

tanggalLahir = nilai field "Tanggal Lahir"
tanggalHariIni = tanggal hari ini (YYYY-MM-DD)
set max pada input tanggal = tanggalHariIni
setCustomValidity("")

jika tanggalLahir kosong:
    setCustomValidity("Tanggal lahir wajib diisi")
jika tanggalLahir > tanggalHariIni:
    setCustomValidity("Tanggal lahir tidak boleh di masa depan")

saat submit:
    jika !reportValidity():
        batalkan submit
    else:
        lanjutkan submit
