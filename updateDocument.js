const { MongoClient, ObjectId } = require("mongodb");

// URL MongoDB server
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const namaDatabase = "testsaja";

async function main() {
    try {
        // Menghubungkan ke server MongoDB
        await client.connect();
        console.log("Berhasil terhubung ke MongoDB database server");

        // Memilih database
        const db = client.db(namaDatabase);

        // Memperbarui satu dokumen dengan `updateOne`
        const updateOnePromise = db.collection("pengguna").updateOne(
            { _id: new ObjectId("67487ffb8800cbb7ceaa16e7") }, // Filter
            // { $set: { nama: "Faritzy" } } // Update
            { $inc: { usia: 19 } } // (Contoh untuk menambahkan usia dengan increment)
        );

    updateOnePromise
        .then((result) => {
            console.log("Hasil updateOne:", result);
        })
        .catch((error) => {
            console.error("Error updateOne:", error);
        })
        .finally(() => {
            client.close();
            console.log("Koneksi ke MongoDB database server ditutup.");
        });
        

    // Contoh memperbarui banyak dokumen dengan `updateMany`
    /*
    db.collection('tugas').updateMany(
        { StatusPenyelesaian: false }, // Filter
        { $set: { StatusPenyelesaian: true } } // Update
        ).then((result) => {
            console.log('Jumlah dokumen yang diperbarui (updateMany):', result.modifiedCount);
        }).catch((error) => {
            console.error('Error updateMany:', error);
        }).finally(() => {
            client.close();
            console.log('Koneksi ke MongoDB database server ditutup.');
        });
    */
    } catch (error) {
    console.error("Error pada fungsi utama:", error);
    }
}

// Memanggil fungsi utama
main();