const admin = require('firebase-admin')
const db = admin.firestore()

async function createPublicationInDatabase(publication) {
    return db
        .collection('publications')
        .doc()
        .set({
            category: publication.category,
            subcategory: publication.subcategory,
            service: publication.service,
            creationTime: Date.now(),
            price: publication.price,
            by: publication.by,
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function deletePublicationInDatabase(id) {
    return db
        .collection('publications')
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
    createPublicationInDatabase,
    deletePublicationInDatabase,
}
