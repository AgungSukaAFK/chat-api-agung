# Riwayat perubahan
Berikut daftar perubahan yang tercatat, berdasarkan nomor.  
1. Alih fungsi dari router chat method GET, jadi sekarang routernya disatukan dengan method POST. Dibedakan dengan req.body.action-nya.

# Kode error
2. Terjadi kesalahan dimana seharusnya ketika user Register terbuat kontak, malah tidak dibuatkan oleh sistem.

# Patch
2.1 - Api berjalan normal, setidaknya untuk fungsi utama yaitu chatting.
2.1.1 - Update ketika admin membuat public group, maka otomatis dibuatkan chatAddressnya.