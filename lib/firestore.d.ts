export { DocumentData, UpdateData, LogLevel, Settings as IClientSettings, GeoPoint, Blob, Transaction, WriteBatch, DocumentListenOptions as IDocumentListenOptions, SetOptions as ISetOptions, DocumentReference, SnapshotOptions as ISnapshotOptions, SnapshotMetadata as ISnapshotMetadata, DocumentSnapshot, QueryDocumentSnapshot, OrderByDirection, WhereFilterOp, QueryListenOptions as IQueryListenOptions, Query, QuerySnapshot, DocumentChangeType, DocumentChange as IDocumentChange, CollectionReference, FieldValue, FieldPath, FirestoreErrorCode, FirestoreError as IFirestoreError } from "@firebase/firestore-types";
import { Settings as ClientSettings, DocumentReference, Transaction, WriteBatch, DocumentData, FieldPath, WhereFilterOp, OrderByDirection, QuerySnapshot, QueryListenOptions, DocumentListenOptions, UpdateData, SetOptions, SnapshotOptions, SnapshotMetadata } from "@firebase/firestore-types";
export interface IFirebaseFirestore {
    settings?: (settings: ClientSettings) => void;
    enablePersistence?: () => Promise<void>;
    collection: (collectionPath: string) => ICollectionReference;
    doc(documentPath: string): DocumentReference;
    getAll(...documentRef: DocumentReference[]): Promise<IDocumentSnapshot[]>;
    getCollections(): Promise<ICollectionReference[]>;
    runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>): Promise<T>;
    batch(): WriteBatch;
    enableNetwork?: () => Promise<void>;
    disableNetwork?: () => Promise<void>;
}
export interface ICollectionReference extends IQuery {
    readonly id: string;
    readonly parent: IDocumentReference | ICollectionReference | null;
    readonly path: string;
    doc(documentPath?: string): IDocumentReference;
    add(data: DocumentData): Promise<IDocumentReference>;
    isEqual?: (other: ICollectionReference) => boolean;
}
export interface IQuery {
    readonly firestore: IFirebaseFirestore;
    where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: any): IQuery;
    orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): IQuery;
    limit(limit: number): IQuery;
    startAt(snapshot: IDocumentSnapshot): IQuery;
    startAt(...fieldValues: any[]): IQuery;
    startAfter(snapshot: IDocumentSnapshot): IQuery;
    startAfter(...fieldValues: any[]): IQuery;
    endBefore(snapshot: IDocumentSnapshot): IQuery;
    endBefore(...fieldValues: any[]): IQuery;
    endAt(snapshot: IDocumentSnapshot): IQuery;
    endAt(...fieldValues: any[]): IQuery;
    isEqual?: (other: IQuery) => boolean;
    get(): Promise<QuerySnapshot>;
    onSnapshot(observer: {
        next?: (snapshot: QuerySnapshot) => void;
        error?: (error: Error) => void;
        complete?: () => void;
    }): () => void;
    onSnapshot(options: QueryListenOptions, observer: {
        next?: (snapshot: QuerySnapshot) => void;
        error?: (error: Error) => void;
        complete?: () => void;
    }): () => void;
    onSnapshot(onNext: (snapshot: QuerySnapshot) => void, onError?: (error: Error) => void, onCompletion?: () => void): () => void;
    onSnapshot(options: QueryListenOptions, onNext: (snapshot: QuerySnapshot) => void, onError?: (error: Error) => void, onCompletion?: () => void): () => void;
}
export interface IDocumentReference {
    readonly id: string;
    readonly firestore: IFirebaseFirestore;
    readonly parent: ICollectionReference;
    readonly path: string;
    collection(collectionPath: string): ICollectionReference;
    getCollections?: () => Promise<ICollectionReference[]>;
    isEqual?: (other: IDocumentReference) => boolean;
    create(data: DocumentData): Promise<IWriteResult>;
    set(data: DocumentData, options?: SetOptions): Promise<void | IWriteResult>;
    update(data: UpdateData): Promise<void | IWriteResult>;
    update(field: string | FieldPath, value: any, ...moreFieldsAndValues: any[]): Promise<void | IWriteResult>;
    update(data: UpdateData, precondition?: IPrecondition): Promise<IWriteResult>;
    delete(): Promise<void | IWriteResult>;
    delete(precondition?: IPrecondition): Promise<IWriteResult>;
    get(): Promise<IDocumentSnapshot>;
    onSnapshot(observer: {
        next?: (snapshot: IDocumentSnapshot) => void;
        error?: (error: any) => void;
        complete?: () => void;
    }): () => void;
    onSnapshot(options: DocumentListenOptions, observer: {
        next?: (snapshot: IDocumentSnapshot) => void;
        error?: (error: Error) => void;
        complete?: () => void;
    }): () => void;
    onSnapshot(onNext: (snapshot: IDocumentSnapshot) => void, onError?: (error: Error) => void, onCompletion?: () => void): () => void;
    onSnapshot(options: DocumentListenOptions, onNext: (snapshot: IDocumentSnapshot) => void, onError?: (error: Error) => void, onCompletion?: () => void): () => void;
}
export interface IWriteResult {
    readonly writeTime: string;
}
export interface IPrecondition {
    readonly lastUpdateTime?: string;
}
export declare type IDocumentSnapshot = IClientDocumentSnapshot | IAdminDocumentSnapshot;
export interface IAdminDocumentSnapshot {
    readonly exists: boolean;
    ref: any;
    readonly id: string;
    readonly createTime?: string;
    readonly updateTime?: string;
    readonly readTime: string;
    data(): DocumentData | undefined;
    get(fieldPath: string | FieldPath): any;
}
export interface IClientDocumentSnapshot {
    readonly exists: boolean;
    readonly ref: IDocumentReference;
    readonly id: string;
    readonly metadata: SnapshotMetadata;
    data(options?: SnapshotOptions): DocumentData | undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): any;
    isEqual(other: IDocumentSnapshot): boolean;
}
