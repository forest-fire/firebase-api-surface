export { DocumentData, UpdateData, LogLevel, Settings as IClientSettings, GeoPoint, Blob, Transaction, WriteBatch, DocumentListenOptions as IDocumentListenOptions, SetOptions as ISetOptions, DocumentReference, SnapshotOptions as ISnapshotOptions, SnapshotMetadata as ISnapshotMetadata, DocumentSnapshot, QueryDocumentSnapshot, OrderByDirection, WhereFilterOp, QueryListenOptions as IQueryListenOptions, Query, QuerySnapshot, DocumentChangeType, DocumentChange as IDocumentChange, CollectionReference, FieldValue, FieldPath, FirestoreErrorCode, FirestoreError as IFirestoreError } from "@firebase/firestore-types";
import { Settings as ClientSettings, CollectionReference, DocumentReference, DocumentSnapshot, Transaction, WriteBatch } from "@firebase/firestore-types";
export interface IFirebaseFirestore {
    settings?: (settings: ClientSettings) => void;
    enablePersistence?: () => Promise<void>;
    collection(collectionPath: string): CollectionReference;
    doc(documentPath: string): DocumentReference;
    getAll(...documentRef: DocumentReference[]): Promise<DocumentSnapshot[]>;
    getCollections(): Promise<CollectionReference[]>;
    runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>): Promise<T>;
    batch(): WriteBatch;
}
