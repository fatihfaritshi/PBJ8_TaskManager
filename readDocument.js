const { MongoClient, ObjectId } = require('mongodb'); 
const url = 'mongodb://127.0.0.1:27017'; 
const client = new MongoClient(url); 
const namaDatabase = 'testsaja'; 

async function main() { 
    try { 
        await client.connect(); 
        console.log('Berhasil terhubung ke MongoDB database server'); 
        const db = client.db(namaDatabase); 

        // Cek semua data dalam koleksi 'pengguna'
        const semuaData = await db.collection('pengguna').find().toArray();
        console.log('Semua data dalam koleksi pengguna:', semuaData);

        // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan nama
        const byNama = await db.collection('pengguna').findOne({ nama : 'Fatih' }); 
        console.log('Data ditemukan berdasarkan nama:', byNama);

        // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan ID objek tertentu
        const id = "67487ffb8800cbb7ceaa16e7"; // Sesuaikan dengan ID yang ada di database Anda
        const isValid = ObjectId.isValid(id);
        console.log('ID valid:', isValid);
        
        const byObjectID = isValid ? await db.collection('pengguna').findOne({ _id: new ObjectId(id) }) : null; 
        console.log('Data ditemukan berdasarkan ObjectId:', byObjectID);

        // Mencari beberapa dokumen dalam koleksi 'pengguna' dengan kriteria usia 20
        const toArray = await db.collection('pengguna').find({ usia : 20 }).toArray(); 
        console.log('Data ditemukan berdasarkan usia :', toArray);

        // Menampilkan hasil pencarian
        if (byNama || byObjectID || toArray.length > 0) { 
            if (byNama) {
                console.log('Data Pengguna ditemukan (berdasarkan nama):', byNama); 
            }
            if (byObjectID) {
                console.log('Data Pengguna ditemukan (berdasarkan ID Objek):', byObjectID); 
            }
            if (toArray.length > 0) {
                console.log('Data Pengguna ditemukan (dalam format Array):', toArray); 
            }
        } else { 
            console.log('Data Pengguna tidak ditemukan'); 
        } 
    } catch (err) { 
        console.error('Terjadi kesalahan:', err); 
    } finally { 
        await client.close(); 
    } 
} 

main().catch(console.error);