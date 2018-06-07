// export {
//   DocumentData,
//   UpdateData,
//   LogLevel,
//   Settings as IClientSettings,
//   GeoPoint,
//   Blob,
//   Transaction,
//   WriteBatch,
//   DocumentListenOptions as IDocumentListenOptions,
//   SetOptions as ISetOptions,
//   DocumentReference,
//   SnapshotOptions as ISnapshotOptions,
//   SnapshotMetadata as ISnapshotMetadata,
//   DocumentSnapshot,
//   QueryDocumentSnapshot,
//   OrderByDirection,
//   WhereFilterOp,
//   QueryListenOptions as IQueryListenOptions,
//   Query,
//   QuerySnapshot,
//   DocumentChangeType,
//   DocumentChange as IDocumentChange,
//   CollectionReference,
//   FieldValue,
//   FieldPath,
//   FirestoreErrorCode,
//   FirestoreError as IFirestoreError
// } from "@firebase/firestore-types";

import {
  FirebaseFirestore,
  Settings as ClientSettings,
  CollectionReference,
  DocumentReference,
  Transaction,
  WriteBatch,
  DocumentData,
  FieldPath,
  WhereFilterOp,
  OrderByDirection,
  QuerySnapshot,
  QueryListenOptions,
  DocumentListenOptions,
  FirestoreError,
  UpdateData,
  SetOptions,
  SnapshotOptions,
  SnapshotMetadata
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
  collection: (collectionPath: string) => ICollectionReference;

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
  getAll(...documentRef: DocumentReference[]): Promise<IDocumentSnapshot[]>;

  /**
   * Fetches the root collections that are associated with this Firestore
   * database.
   *
   * @returns A Promise that resolves with an array of CollectionReferences.
   */
  getCollections(): Promise<ICollectionReference[]>;

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

  /**
   * Re-enables use of the network for this Firestore instance after a prior
   * call to disableNetwork().
   *
   * CLIENT API ONLY
   *
   * @return A promise that is resolved once the network has been enabled.
   */
  enableNetwork?: () => Promise<void>;

  /**
   * Disables network usage for this instance. It can be re-enabled via
   * enableNetwork(). While the network is disabled, any snapshot listeners or
   * get() calls will return results from cache, and any write operations will
   * be queued until the network is restored.
   *
   * CLIENT API ONLY
   *
   * @return A promise that is resolved once the network has been disabled.
   */
  disableNetwork?: () => Promise<void>;
}

export interface ICollectionReference extends IQuery {
  /** The identifier of the collection. */
  readonly id: string;

  /**
   * A reference to the containing Document if this is a subcollection, else
   * null.
   */
  readonly parent: IDocumentReference | ICollectionReference | null;

  /**
   * A string representing the path of the referenced collection (relative
   * to the root of the database).
   */
  readonly path: string;

  /**
   * Get a `DocumentReference` for the document within the collection at the
   * specified path. If no path is specified, an automatically-generated
   * unique ID will be used for the returned DocumentReference.
   *
   * @param documentPath A slash-separated path to a document.
   * @return The `DocumentReference` instance.
   */
  doc(documentPath?: string): IDocumentReference;

  /**
   * Add a new document to this collection with the specified data, assigning
   * it a document ID automatically.
   *
   * @param data An Object containing the data for the new document.
   * @return A Promise resolved with a `DocumentReference` pointing to the
   * newly created document after it has been written to the backend.
   */
  add(data: DocumentData): Promise<IDocumentReference>;

  /**
   * Returns true if this `CollectionReference` is equal to the provided one.
   *
   * CLIENT API ONLY
   *
   * @param other The `CollectionReference` to compare against.
   * @return true if this `CollectionReference` is equal to the provided one.
   */
  isEqual?: (other: ICollectionReference) => boolean;
}

export interface IQuery {
  /**
   * The `Firestore` for the Firestore database (useful for performing
   * transactions, etc.).
   */
  readonly firestore: IFirebaseFirestore;

  /**
   * Creates and returns a new Query with the additional filter that documents
   * must contain the specified field and the value should satisfy the
   * relation constraint provided.
   *
   * @param fieldPath The path to compare
   * @param opStr The operation string (e.g "<", "<=", "==", ">", ">=").
   * @param value The value for comparison
   * @return The created Query.
   */
  where(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: any
  ): IQuery;

  /**
   * Creates and returns a new Query that's additionally sorted by the
   * specified field, optionally in descending order instead of ascending.
   *
   * @param fieldPath The field to sort by.
   * @param directionStr Optional direction to sort by ('asc' or 'desc'). If
   * not specified, order will be ascending.
   * @return The created Query.
   */
  orderBy(
    fieldPath: string | FieldPath,
    directionStr?: OrderByDirection
  ): IQuery;

  /**
   * Creates and returns a new Query that's additionally limited to only
   * return up to the specified number of documents.
   *
   * @param limit The maximum number of items to return.
   * @return The created Query.
   */
  limit(limit: number): IQuery;

  /**
   * Creates and returns a new Query that starts at the provided document
   * (inclusive). The starting position is relative to the order of the query.
   * The document must contain all of the fields provided in the orderBy of
   * this query.
   *
   * @param snapshot The snapshot of the document to start at.
   * @return The created Query.
   */
  startAt(snapshot: IDocumentSnapshot): IQuery;

  /**
   * Creates and returns a new Query that starts at the provided fields
   * relative to the order of the query. The order of the field values
   * must match the order of the order by clauses of the query.
   *
   * @param fieldValues The field values to start this query at, in order
   * of the query's order by.
   * @return The created Query.
   */
  startAt(...fieldValues: any[]): IQuery;

  /**
   * Creates and returns a new Query that starts after the provided document
   * (exclusive). The starting position is relative to the order of the query.
   * The document must contain all of the fields provided in the orderBy of
   * this query.
   *
   * @param snapshot The snapshot of the document to start after.
   * @return The created Query.
   */
  startAfter(snapshot: IDocumentSnapshot): IQuery;

  /**
   * Creates and returns a new Query that starts after the provided fields
   * relative to the order of the query. The order of the field values
   * must match the order of the order by clauses of the query.
   *
   * @param fieldValues The field values to start this query after, in order
   * of the query's order by.
   * @return The created Query.
   */
  startAfter(...fieldValues: any[]): IQuery;

  /**
   * Creates and returns a new Query that ends before the provided document
   * (exclusive). The end position is relative to the order of the query. The
   * document must contain all of the fields provided in the orderBy of this
   * query.
   *
   * @param snapshot The snapshot of the document to end before.
   * @return The created Query.
   */
  endBefore(snapshot: IDocumentSnapshot): IQuery;

  /**
   * Creates and returns a new Query that ends before the provided fields
   * relative to the order of the query. The order of the field values
   * must match the order of the order by clauses of the query.
   *
   * @param fieldValues The field values to end this query before, in order
   * of the query's order by.
   * @return The created Query.
   */
  endBefore(...fieldValues: any[]): IQuery;

  /**
   * Creates and returns a new Query that ends at the provided document
   * (inclusive). The end position is relative to the order of the query. The
   * document must contain all of the fields provided in the orderBy of this
   * query.
   *
   * @param snapshot The snapshot of the document to end at.
   * @return The created Query.
   */
  endAt(snapshot: IDocumentSnapshot): IQuery;

  /**
   * Creates and returns a new Query that ends at the provided fields
   * relative to the order of the query. The order of the field values
   * must match the order of the order by clauses of the query.
   *
   * @param fieldValues The field values to end this query at, in order
   * of the query's order by.
   * @return The created Query.
   */
  endAt(...fieldValues: any[]): IQuery;

  /**
   * Returns true if this `Query` is equal to the provided one.
   *
   * CLIENT API ONLY
   *
   * @param other The `Query` to compare against.
   * @return true if this `Query` is equal to the provided one.
   */
  isEqual?: (other: IQuery) => boolean;

  /**
   * Executes the query and returns the results as a QuerySnapshot.
   *
   * @return A Promise that will be resolved with the results of the Query.
   */
  get(): Promise<QuerySnapshot>;

  /**
   * Attaches a listener for QuerySnapshot events. You may either pass
   * individual `onNext` and `onError` callbacks or pass a single observer
   * object with `next` and `error` callbacks.
   *
   * NOTE: Although an `onCompletion` callback can be provided, it will
   * never be called because the snapshot stream is never-ending.
   *
   * @param options Options controlling the listen behavior.
   * @param onNext A callback to be called every time a new `QuerySnapshot`
   * is available.
   * @param onError A callback to be called if the listen fails or is
   * cancelled. No further callbacks will occur.
   * @param observer A single object containing `next` and `error` callbacks.
   * @return An unsubscribe function that can be called to cancel
   * the snapshot listener.
   */
  onSnapshot(observer: {
    next?: (snapshot: QuerySnapshot) => void;
    error?: (error: Error) => void;
    complete?: () => void;
  }): () => void;
  onSnapshot(
    options: QueryListenOptions,
    observer: {
      next?: (snapshot: QuerySnapshot) => void;
      error?: (error: Error) => void;
      complete?: () => void;
    }
  ): () => void;
  onSnapshot(
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
  onSnapshot(
    options: QueryListenOptions,
    onNext: (snapshot: QuerySnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

export interface IDocumentReference {
  /** The identifier of the document within its collection. */
  readonly id: string;

  /**
   * The `Firestore` for the Firestore database (useful for performing
   * transactions, etc.).
   */
  readonly firestore: IFirebaseFirestore;

  /**
   * A reference to the Collection to which this DocumentReference belongs.
   */
  readonly parent: ICollectionReference;

  /**
   * A string representing the path of the referenced document (relative
   * to the root of the database).
   */
  readonly path: string;

  /**
   * Gets a `CollectionReference` instance that refers to the collection at
   * the specified path.
   *
   * @param collectionPath A slash-separated path to a collection.
   * @return The `CollectionReference` instance.
   */
  collection(collectionPath: string): ICollectionReference;

  /**
   * Fetches the subcollections that are direct children of this document.
   *
   * ADMIN API ONLY!
   *
   * @returns A Promise that resolves with an array of CollectionReferences.
   */
  getCollections?: () => Promise<ICollectionReference[]>;

  /**
   * Returns true if this `DocumentReference` is equal to the provided one.
   *
   * CLIENT ONLY API
   *
   * @param other The `DocumentReference` to compare against.
   * @return true if this `DocumentReference` is equal to the provided one.
   */
  isEqual?: (other: IDocumentReference) => boolean;

  /**
   * Creates a document referred to by this `DocumentReference` with the
   * provided object values. The write fails if the document already exists
   *
   * ADMIN API ONLY
   *
   * @param data The object data to serialize as the document.
   * @return A Promise resolved with the write time of this create.
   */
  create(data: DocumentData): Promise<IWriteResult>;

  /**
   * Writes to the document referred to by this `DocumentReference`. If the
   * document does not yet exist, it will be created. If you pass
   * `SetOptions`, the provided data can be merged into an existing document.
   *
   * @param data A map of the fields and values for the document.
   * @param options An object to configure the set behavior.
   * @return A Promise resolved once the data has been successfully written
   * to the backend (Note that it won't resolve while you're offline).
   */
  set(data: DocumentData, options?: SetOptions): Promise<void | IWriteResult>;

  /**
   * Updates fields in the document referred to by this `DocumentReference`.
   * The update will fail if applied to a document that does not exist.
   *
   * @param data An object containing the fields and values with which to
   * update the document. Fields can contain dots to reference nested fields
   * within the document.
   * @return A Promise resolved once the data has been successfully written
   * to the backend (Note that it won't resolve while you're offline).
   */
  update(data: UpdateData): Promise<void | IWriteResult>;

  /**
   * Updates fields in the document referred to by this `DocumentReference`.
   * The update will fail if applied to a document that does not exist.
   *
   * Nested fields can be updated by providing dot-separated field path
   * strings or by providing FieldPath objects.
   *
   * @param field The first field to update.
   * @param value The first value.
   * @param moreFieldsAndValues Additional key value pairs.
   * @return A Promise resolved once the data has been successfully written
   * to the backend (Note that it won't resolve while you're offline).
   */
  update(
    field: string | FieldPath,
    value: any,
    ...moreFieldsAndValues: any[]
  ): Promise<void | IWriteResult>;

  /**
   * Updates fields in the document referred to by this `DocumentReference`.
   * The update will fail if applied to a document that does not exist.
   *
   * Nested fields can be updated by providing dot-separated field path
   * strings.
   *
   * ADMIN API ONLY!
   *
   * @param data An object containing the fields and values with which to
   * update the document.
   * @param precondition A Precondition to enforce on this update.
   * @return A Promise resolved with the write time of this update.
   */
  update(data: UpdateData, precondition?: IPrecondition): Promise<IWriteResult>;

  /**
   * Deletes the document referred to by this `DocumentReference`.
   *
   * @return A Promise resolved once the document has been successfully
   * deleted from the backend (Note that it won't resolve while you're
   * offline).
   */
  delete(): Promise<void | IWriteResult>;

  /**
   * Deletes the document referred to by this `DocumentReference`.
   *
   * ADMIN API ONLY
   *
   * @param precondition A Precondition to enforce for this delete.
   * @return A Promise resolved with the write time of this delete.
   */
  delete(precondition?: IPrecondition): Promise<IWriteResult>;

  /**
   * Reads the document referred to by this `DocumentReference`.
   *
   * Note: get() attempts to provide up-to-date data when possible by waiting
   * for data from the server, but it may return cached data or fail if you
   * are offline and the server cannot be reached.
   *
   * @return A Promise resolved with a DocumentSnapshot containing the
   * current document contents.
   */
  get(): Promise<IDocumentSnapshot>;

  /**
   * Attaches a listener for DocumentSnapshot events. You may either pass
   * individual `onNext` and `onError` callbacks or pass a single observer
   * object with `next` and `error` callbacks.
   *
   * NOTE: Although an `onCompletion` callback can be provided, it will
   * never be called because the snapshot stream is never-ending.
   *
   * @param options Options controlling the listen behavior.
   * @param onNext A callback to be called every time a new `DocumentSnapshot`
   * is available.
   * @param onError A callback to be called if the listen fails or is
   * cancelled. No further callbacks will occur.
   * @param observer A single object containing `next` and `error` callbacks.
   * @return An unsubscribe function that can be called to cancel
   * the snapshot listener.
   */
  onSnapshot(observer: {
    next?: (snapshot: IDocumentSnapshot) => void;
    error?: (error: any) => void;
    complete?: () => void;
  }): () => void;
  onSnapshot(
    options: DocumentListenOptions,
    observer: {
      next?: (snapshot: IDocumentSnapshot) => void;
      error?: (error: Error) => void;
      complete?: () => void;
    }
  ): () => void;
  onSnapshot(
    onNext: (snapshot: IDocumentSnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
  onSnapshot(
    options: DocumentListenOptions,
    onNext: (snapshot: IDocumentSnapshot) => void,
    onError?: (error: Error) => void,
    onCompletion?: () => void
  ): () => void;
}

/**
 * A WriteResult wraps the write time set by the Firestore servers on `sets()`,
 * `updates()`, and `creates()`.
 */
export interface IWriteResult {
  /**
   * The write time as set by the Firestore servers. Formatted as an ISO-8601
   * string.
   *
   * ADMIN API ONLY
   */
  readonly writeTime: string;
}

/**
 * An options object that configures conditional behavior of `update()` and
 * `delete()` calls in `DocumentReference`, `WriteBatch`, and `Transaction`.
 * Using Preconditions, these calls can be restricted to only apply to
 * documents that match the specified restrictions.
 *
 * ADMIN API Only!
 */
export interface IPrecondition {
  /**
   * If set, the last update time to enforce (specified as an ISO 8601
   * string).
   */
  readonly lastUpdateTime?: string;
}

export type IDocumentSnapshot =
  | IClientDocumentSnapshot
  | IAdminDocumentSnapshot;

export interface IAdminDocumentSnapshot {
  /** True if the document exists. */
  readonly exists: boolean;

  /** A `DocumentReference` to the document location. */
  ref: any; // TODO: make this strongly typed
  // ref: IDocumentReference;

  /**
   * The ID of the document for which this `DocumentSnapshot` contains data.
   */
  readonly id: string;

  /**
   * The time the document was created. Not set for documents that don't
   * exist.
   */
  readonly createTime?: string;

  /**
   * The time the document was last updated (at the time the snapshot was
   * generated). Not set for documents that don't exist.
   */
  readonly updateTime?: string;

  /**
   * The time this snapshot was read.
   */
  readonly readTime: string;

  /**
   * Retrieves all fields in the document as an Object. Returns 'undefined' if
   * the document doesn't exist.
   *
   * @return An Object containing all fields in the document.
   */
  data(): DocumentData | undefined;

  /**
   * Retrieves the field specified by `fieldPath`.
   *
   * @param fieldPath The path (e.g. 'foo' or 'foo.bar') to a specific field.
   * @return The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  get(fieldPath: string | FieldPath): any;
}

export interface IClientDocumentSnapshot {
  /** True if the document exists. */
  readonly exists: boolean;
  /** A `DocumentReference` to the document location. */
  readonly ref: IDocumentReference;
  /**
   * The ID of the document for which this `DocumentSnapshot` contains data.
   */
  readonly id: string;
  /**
   * Metadata about this snapshot, concerning its source and if it has local
   * modifications.
   */
  readonly metadata: SnapshotMetadata;

  /**
   * Retrieves all fields in the document as an Object. Returns 'undefined' if
   * the document doesn't exist.
   *
   * By default, `FieldValue.serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @param options An options object to configure how data is retrieved from
   * the snapshot (e.g. the desired behavior for server timestamps that have
   * not yet been set to their final value).
   * @return An Object containing all fields in the document or 'undefined' if
   * the document doesn't exist.
   */
  data(options?: SnapshotOptions): DocumentData | undefined;

  /**
   * Retrieves the field specified by `fieldPath`. Returns 'undefined' if the
   * document or field doesn't exist.
   *
   * By default, a `FieldValue.serverTimestamp()` that has not yet been set to
   * its final value will be returned as `null`. You can override this by
   * passing an options object.
   *
   * @param fieldPath The path (e.g. 'foo' or 'foo.bar') to a specific field.
   * @param options An options object to configure how the field is retrieved
   * from the snapshot (e.g. the desired behavior for server timestamps that have
   * not yet been set to their final value).
   * @return The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  get(fieldPath: string | FieldPath, options?: SnapshotOptions): any;

  /**
   * Returns true if this `DocumentSnapshot` is equal to the provided one.
   *
   * @param other The `DocumentSnapshot` to compare against.
   * @return true if this `DocumentSnapshot` is equal to the provided one.
   */
  isEqual(other: IDocumentSnapshot): boolean;
}
