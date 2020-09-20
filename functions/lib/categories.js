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
async function returnAllCategories() {
    let categories = []
    await db
        .collection('categories')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                categories.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return categories
}
module.exports = {
    createCategoryInDatabase,
    deleteCategoryInDatabase,
    returnAllCategories,
}
