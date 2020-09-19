const admin = require('firebase-admin')
const db = admin.firestore()

async function createCategoryInDatabase(category) {
    return db
        .collection('categories')
        .doc()
        .set({
            name: category.name,
            creationTime: Date.now(),
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function deleteCategoryInDatabase(id) {
    return db
        .collection('categories')
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
    createCategoryInDatabase,
    deleteCategoryInDatabase,
}
