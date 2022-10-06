import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync("./coder-backend-a3fcf-firebase-adminsdk-9ug8w-cd644304ba.json", 'utf8'))

initializeApp({
	credential: cert(serviceAccount),
});



class ContenedorFirebaseProductos {
	constructor(collection){
		this.collection = collection;
	}
	
	async save(obj) {
		let id = 0;
		try {
			obj.price = Number(obj.price);
			obj.id = id++;
			const db = getFirestore();
			const docRef = db.collection('products');
			await docRef.add(obj);
			id++;
		} catch (err) { console.log(err) }
	}

	async getById(id) {
		try {
			let res;
			id = Number(id);
			const db = getFirestore();
			const ref = db.collection('products');
			const whereRef = await ref.where('id', '==', id).get();
			whereRef.forEach((doc) => res = doc.data());
			return res;
		} catch (err) {console.log(err)}
	}

	async getAll() {
		try {
			let res = [];
			const db = getFirestore();
			const snapshot = await db.collection('products').get();
			snapshot.forEach((doc) => {
				res.push(doc.data());
			});
			return res;
		} catch (err) { console.log(err) }
	}

	async deleteById(id) {
		try {
			let res;
			id = Number(id);
			const db = getFirestore();
			const ref = db.collection('products');
			const whereRef = await ref.where('id', '==', id).get();
			whereRef.forEach((doc) => res = doc.id);
			if (res) {
				const deleteRef = db.collection('products').doc(res);
				await deleteRef.delete();
			}
		} catch (err) {console.log(err)}
	}


	async update(id, obj){
		try {
			let res;
			id = Number(id);
			const db = getFirestore();
			const ref = db.collection('products');
			const whereRef = await ref.where('id', '==', id).get();
			whereRef.forEach((doc) => res = doc.id);
			if (res) {
				const updateRef = db.collection('products').doc(res);
				await updateRef.update(obj);
			}
		} catch (err) { console.log(err) }
	}
}
export default ContenedorFirebaseProductos;