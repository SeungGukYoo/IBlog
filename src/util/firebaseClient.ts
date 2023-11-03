import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';

interface IFirebase {
  getPosts: (id: string) => Promise<DocumentData | undefined>;
}

export class FirebaseClient implements IFirebase {
  constructor() {}
  async getPosts(id: string) {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
}
