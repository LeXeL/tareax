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
async function returnAllSubCategories() {
    let subcategories = []
    await db
        .collection('subcategories')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.')
                return
            }
            snapshot.forEach(doc => {
                subcategories.push({...doc.data(), id: doc.id})
            })
        })
        .catch(function(error) {
            console.log('Error getting documents: ', error)
        })
    return subcategories
}
module.exports = {
    createSubCategoryInDatabase,
    deleteSubCategoryInDatabase,
    returnAllSubCategories,
}
