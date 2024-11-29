// Mengimport modul MongoClient dan ObjectId dari 'mongodb'.
const { MongoClient, ObjectId } = require('mongodb');

// Mendefinisikan URL MongoDB server yang akan digunakan untuk koneksi.
const url = 'mongodb://127.0.0.1:27017';
// Membuat instance MongoClient dengan URL koneksi yang telah didefinisikan sebelumnya.
const client = new MongoClient(url);
// Mendefinisikan nama database yang akan digunakan.
const namaDatabase = 'testsaja';
// Membuat instance ObjectId baru. ObjectId digunakan untuk menghasilkan unik identifier untuk dokumen MongoDB.
const id = new ObjectId();

// BAGIAN INI MENCETAK INFORMASI DARI ObjectId
// Mencetak ObjectId yang baru dibuat ke konsol.
console.log('ObjectId:', id);
// Mencetak representasi hexadecimal dari ObjectId ke konsol.
console.log('Hexadecimal:', id.id);
// Mencetak panjang (jumlah karakter) dari representasi hexadecimal ObjectId ke konsol.
console.log('Panjang Hexadecimal:', id.id.length);
// Mencetak timestamp yang terkait dengan ObjectId ke konsol.
console.log('Timestamp ObjectId:', id.getTimestamp());
// Mencetak panjang dari representasi ObjectId dalam bentuk string hexadecimal.
console.log('Panjang Hexadecimal (toHexString):', id.toHexString().length);

// BAGIAN INI ADALAH FUNGSI UTAMA YANG BERJALAN SECARA ASYNCHRONOUS
async function main() {
    try {
        // BAGIAN INI TERKAIT KONEKSI KE DATABASE DAN MEMASUKKAN DATA
        // Menggunakan 'await' untuk menghubungkan ke server MongoDB.
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        
        // Memilih database dengan nama 'task-manager' yang telah didefinisikan sebelumnya.
        const db = client.db(namaDatabase);
        // Memilih koleksi 'pengguna' di dalam database.
        const clPengguna = db.collection('pengguna');
        // Memilih koleksi 'tugas' di dalam database.
        const clTugas = db.collection('tugas');
        
        // MEMASUKKAN SATU DATA (DOKUMEN)
        const insertPengguna = await clPengguna.insertOne([
            { _id: id, nama: 'Fatih', usia: 20 }
        ]);
        console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);
        
        // MEMASUKKAN BANYAK DATA (DOKUMEN)
        const insertTugas = await clTugas.insertMany([
            {
                Deskripsi: 'Membersihkan rumah',
                StatusPenyelesaian: true
            },
            {
                Deskripsi: 'Mengerjakan tugas kuliah',
                StatusPenyelesaian: false
            },
            {
                Deskripsi: 'Memberikan bimbingan',
                StatusPenyelesaian: false
            }
        ]);
        console.log('Memasukkan data Tugas ke koleksi =>', insertTugas);
        
        // Mengembalikan pesan sukses setelah operasi selesai.
        return 'Data selesai dimasukkan.';
    } catch (err) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol.
        console.error('Terjadi kesalahan:', err);
    } finally {
        // Selalu menutup koneksi ke server MongoDB setelah operasi selesai, baik sukses maupun gagal.
        await client.close();
        console.log('Koneksi ke database ditutup.');
    }
}

// Memanggil fungsi 'main' dan menangani hasilnya menggunakan 'then' dan 'catch' untuk mencetak hasil atau pesan kesalahan ke konsol.
main()
    .then((result) => console.log(result))
    .catch((error) => console.error('Error pada main:', error));
