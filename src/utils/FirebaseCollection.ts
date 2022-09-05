import { Unsubscribe } from "firebase/auth";
import {
  child,
  Database,
  DatabaseReference,
  DataSnapshot,
  get,
  onChildAdded,
  onChildChanged,
  onValue,
  push,
  query,
  QueryConstraint,
  ref,
  remove,
  set,
  ThenableReference,
  update,
} from "firebase/database";

export enum FirebaseCollectionEnum {
  Orders = "orders",
  FoodChoices = "foodChoices",
}

export class FirebaseCollection<T extends Record<string, any>> {
  private collection: DatabaseReference;
  private dbRef: DatabaseReference;
  constructor(db: Database, private collectionName: FirebaseCollectionEnum) {
    this.dbRef = ref(db);
    this.collection = child(this.dbRef, collectionName);
  }

  private getItemRef(key: string) {
    return child(this.dbRef, `${this.collectionName}/${key}`);
  }

  async get(): Promise<T[]> {
    const items: T[] = [];
    const snapshot = await get(this.collection);
    snapshot.forEach((snapshot) => {
      items.push({
        key: snapshot.key,
        ...snapshot.val(),
      });
    });
    return items;
  }

  async getByKey(key: string): Promise<T> {
    const snapshot = await get(
      child(this.dbRef, `${this.collectionName}/${key}`)
    );
    return {
      key: snapshot.key,
      ...snapshot.val(),
    };
  }

  async getByKeyAndPath<Result>(key: string, path: string): Promise<Result> {
    const snapshot = await get(
      child(this.dbRef, `${this.collectionName}/${key}/${path}`)
    );
    return snapshot.val();
  }

  async push(item: T): Promise<void> {
    const newItemRef = push(this.collection, item);
    return await set(newItemRef, item);
  }

  async remove(key: string): Promise<void> {
    await remove(this.getItemRef(key));
  }

  async update(key: string, item: T): Promise<void> {
    await update(this.getItemRef(key), item);
  }

  onItemAddedOrUpdated(
    cb: (item: T, key: string) => void,
    ...queryConstraints: QueryConstraint[]
  ): Unsubscribe {
    const q = query(this.collection, ...queryConstraints);

    const parseDbSnapshot = (snapshot: DataSnapshot) => {
      cb(snapshot.val(), snapshot.key!);
    };

    // Subscribe to changes
    const unSubscribeOnChildAdded = onChildAdded(q, parseDbSnapshot);
    const unSubscribeOnChildChanged = onChildChanged(q, parseDbSnapshot);

    // return tear down function to unsubscribe on component unmount.
    return () => {
      console.log(`Unsubscribing from ${this.collectionName} add or changed`);
      unSubscribeOnChildAdded();
      unSubscribeOnChildChanged();
    };
  }
}
