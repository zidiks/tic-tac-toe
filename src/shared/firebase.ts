import { initializeApp } from 'firebase/app';
import { collection, query, where, onSnapshot, getFirestore } from "firebase/firestore";

export class Firebase {
    private fb;
    private db;
    constructor(
        private env: any
    ) {
        this.fb = initializeApp(this.env);
        this.db = getFirestore(this.fb);
    }

    public getData() {
        const q = query(collection(this.db, 'rooms'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
               console.log(doc.data());
            });
        });

        return unsubscribe;
    }
}