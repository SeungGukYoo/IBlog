import {
  DocumentData,
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from 'firebaseApp';

interface IFirebase {
  getPosts: (id: string) => Promise<QuerySnapshot<DocumentData, DocumentData>>;
  getPost: (id: string) => Promise<DocumentData | undefined>;
  deleteData: (id: string) => Promise<void>;
}

export class FirebaseClient implements IFirebase {
  constructor() {}
  async getPosts() {
    const docSnap = await getDocs(collection(db, 'posts'));
    return docSnap;
  }

  async getPost(id: string) {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  async deleteData(id: string) {
    return await deleteDoc(doc(db, 'posts', id));
  }
}
