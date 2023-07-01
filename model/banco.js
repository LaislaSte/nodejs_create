const { getFirestore } = require('firebase-admin/firestore')
var admin = require("firebase-admin");
var serviceAccount = require("../projeto-agendamentos-d7259-firebase-adminsdk-8342g-26bd9b1574.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = getFirestore()

module.exports = {
    dbfirestore: db
}