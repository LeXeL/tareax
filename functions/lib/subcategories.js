const admin = require('firebase-admin')
const db = admin.firestore()

async function createSubCategoryInDatabase(subcategory) {
    return db
        .collection('subcategories')
        .doc()
        .set({
            name: subcategory.name,
            category: subcategory.category,
            creationTime: Date.now(),
        })
        .then(() => {
            return 'Succesfull'
        })
        .catch(error => {
            return error
        })
}
async function deleteSubCategoryInDatabase(id) {
    return db
        .collection('subcategories')
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
    createSubCategoryInDatabase,
    deleteSubCategoryInDatabase,
}
