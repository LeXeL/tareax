const admin = require('firebase-admin')
const db = admin.firestore()

async function createServiceInDatabase(service) {
    console.log(service)
    return db
        .collection('services')
        .doc()
        .set({
            name: service.name,
            category: service.category,
            subcategory: service.subcategory,
            creationTime: Date.now(),
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function deleteServiceInDatabase(id) {
    return db
        .collection('services')
        .doc(id)
        .delete()
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
module.exports = {
    createServiceInDatabase,
    deleteServiceInDatabase,
}
