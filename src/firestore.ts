export {
  DocumentData,
  UpdateData,
  LogLevel,
  Settings as IClientSettings,
  GeoPoint,
  Blob,
  Transaction,
  WriteBatch,
  DocumentListenOptions as IDocumentListenOptions,
  SetOptions as ISetOptions,
  DocumentReference,
  SnapshotOptions as ISnapshotOptions,
  SnapshotMetadata as ISnapshotMetadata,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  OrderByDirection,
  WhereFilterOp,
  QueryListenOptions as IQueryListenOptions,
  Query,
  QuerySnapshot,
  DocumentChangeType,
  DocumentChange as IDocumentChange,
  CollectionReference,
  FieldValue,
  FieldPath,
  FirestoreErrorCode,
  FirestoreError as IFirestoreError
} from "@firebase/firestore-types";

import {
  FirebaseFirestore,
  Settings as ClientSettings,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Transaction,
  WriteBatch
} from "@firebase/firestore-types";
export interface IFirebaseFirestore {
  /**
   * Specifies custom settings to be used to configure the `Firestore`
   * instance. Must be set before invoking any other methods in client API.
   *
   * @param settings The settings to use.
   */
  settings?: (settings: ClientSettings) => void;

  /**
   * Attempts to enable persistent storage, if possible.
   *
   * Must be called before any other methods (other than settings()). Again, this is
   * just for the client API.
   *
   * If this fails, enablePersistence() will reject the promise it returns.
   * Note that even after this failure, the firestore instance will remain
   * usable, however offline persistence will be disabled.
   *
   * There are several reasons why this can fail, which can be identified by
   * the `code` on the error.
   *
   *   * failed-precondition: The app is already open in another browser tab.
   *   * unimplemented: The browser is incompatible with the offline
   *     persistence implementation.
   *
   * @return A promise that represents successfully enabling persistent
   * storage.
   */
  enablePersistence?: () => Promise<void>;

  /**
   * Gets a `CollectionReference` instance that refers to the collection at
   * the specified path.
   *
   * @param collectionPath A slash-separated path to a collection.
   * @return The `CollectionReference` instance.
   */
  collection(collectionPath: string): CollectionReference;

  /**
   * Gets a `DocumentReference` instance that refers to the document at the
   * specified path.
   *
   * @param documentPath A slash-separated path to a document.
   * @return The `DocumentReference` instance.
   */
  doc(documentPath: string): DocumentReference;

  /**
   * Retrieves multiple documents from Firestore.
   *
   * @param documentRef The `DocumentReferences` to receive.
   * @return A Promise that resolves with an array of resulting document
   * snapshots.
   */
  getAll(...documentRef: DocumentReference[]): Promise<DocumentSnapshot[]>;

  /**
   * Fetches the root collections that are associated with this Firestore
   * database.
   *
   * @returns A Promise that resolves with an array of CollectionReferences.
   */
  getCollections(): Promise<CollectionReference[]>;

  /**
   * Executes the given updateFunction and commits the changes applied within
   * the transaction.
   *
   * You can use the transaction object passed to 'updateFunction' to read and
   * modify Firestore documents under lock. Transactions are committed once
   * 'updateFunction' resolves and attempted up to five times on failure.
   *
   * @param updateFunction The function to execute within the transaction
   * context.
   * @return If the transaction completed successfully or was explicitly
   * aborted (by the updateFunction returning a failed Promise), the Promise
   * returned by the updateFunction will be returned here. Else if the
   * transaction failed, a rejected Promise with the corresponding failure
   * error will be returned.
   */
  runTransaction<T>(
    updateFunction: (transaction: Transaction) => Promise<T>
  ): Promise<T>;

  /**
   * Creates a write batch, used for performing multiple writes as a single
   * atomic operation.
   */
  batch(): WriteBatch;
}
