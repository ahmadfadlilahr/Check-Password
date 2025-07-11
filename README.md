# 🔐 Website Tools Keamanan

Website sederhana untuk membuat dan mengecek keamanan password menggunakan HTML, CSS, dan JavaScript vanilla.

## 📋 Fitur Utama

### 1. Password Generator
- **Kustomisasi Panjang**: Slider untuk mengatur panjang password (4-50 karakter)
- **Pilihan Karakter**: 
  - Huruf besar (A-Z)
  - Huruf kecil (a-z)
  - Angka (0-9)
  - Simbol (!@#$%^&*)
- **Copy ke Clipboard**: Tombol copy dengan animasi feedback
- **Keamanan**: Password di-generate secara random dengan distribusi karakter yang seimbang

### 2. Password Checker
- **Analisis Real-time**: Cek kekuatan password saat mengetik
- **Meter Kekuatan**: Visual progress bar dengan 5 level kekuatan
- **Kriteria Validasi**:
  - Minimal 8 karakter
  - Mengandung huruf besar
  - Mengandung huruf kecil
  - Mengandung angka
  - Mengandung simbol
- **Toggle Visibility**: Tombol untuk show/hide password

### 3. Dokumentasi Lengkap
- Tips membuat password yang kuat
- Hal-hal yang harus dihindari
- Panduan penggunaan tools
- Informasi keamanan dan privasi

## 🚀 Cara Menggunakan

1. **Buka File**: Double-click `index.html` atau buka melalui web browser
2. **Password Generator**:
   - Atur panjang password dengan slider
   - Pilih jenis karakter yang diinginkan
   - Klik "Generate Password"
   - Copy password dengan tombol copy
3. **Password Checker**:
   - Masukkan password di kolom input
   - Lihat analisis kekuatan secara real-time
   - Periksa kriteria yang belum terpenuhi

## 📁 Struktur File

```
website-keamanan/
├── index.html          # File utama HTML
├── styles.css          # Styling dan responsive design
├── script.js           # Logika JavaScript
└── README.md           # Dokumentasi proyek
```

## 🎨 Fitur Teknis

### HTML
- Struktur semantik yang clean
- Accessibility-friendly
- Meta tags untuk responsive design

### CSS
- Modern design dengan gradient background
- Responsive grid system
- Smooth animations dan transitions
- CSS Grid dan Flexbox untuk layout
- Custom checkbox dan slider styling

### JavaScript
- Object-oriented programming (ES6 Classes)
- Event-driven architecture
- Intersection Observer untuk lazy animations
- Clipboard API untuk copy functionality
- Real-time password strength calculation

## 🔒 Keamanan & Privasi

- **100% Client-side**: Semua proses berjalan di browser pengguna
- **No Server Communication**: Password tidak dikirim ke server manapun
- **No Data Storage**: Tidak ada data yang disimpan atau dibagikan
- **Offline Ready**: Dapat digunakan tanpa koneksi internet
- **Open Source**: Source code dapat diperiksa untuk transparansi

## 🎯 Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Design

Website dirancang untuk berbagai ukuran layar:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🛠 Customization

Anda dapat dengan mudah mengkustomisasi:

### Colors
Edit variabel di `styles.css`:
```css
/* Primary colors */
--primary-color: #5a67d8;
--secondary-color: #667eea;
```

### Password Rules
Edit di `script.js` bagian `PasswordChecker`:
```javascript
evaluateCriteria(password) {
    return {
        length: password.length >= 8, // Ubah minimal length
        // ... kriteria lainnya
    };
}
```

### Character Sets
Edit di `script.js` bagian `PasswordGenerator`:
```javascript
this.characters = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?' // Tambah/hapus simbol
};
```

## 🔧 Pengembangan

### Menjalankan Locally
1. Clone atau download proyek
2. Buka `index.html` di browser
3. Tidak perlu server khusus karena pure client-side

### Testing
- Test di berbagai browser
- Test responsive design di device tools
- Test accessibility dengan screen reader

## 📈 Fitur Future

Potensi pengembangan:
- [ ] Password history (dengan local storage)
- [ ] Export password list
- [ ] Dark/Light theme toggle
- [ ] Bahasa multiple
- [ ] PWA support
- [ ] Advanced security patterns detection

## 🤝 Kontribusi

Proyek ini menggunakan teknologi web standar dan mudah untuk dikembangkan. Silakan fork dan submit pull request untuk perbaikan.

## 📄 License

Open source - boleh digunakan untuk keperluan pribadi maupun komersial.

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ untuk keamanan digital yang lebih baik**
