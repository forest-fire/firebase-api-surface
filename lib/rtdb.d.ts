import { FirebaseApp } from "@firebase/app-types";
export declare type EventType = "value" | "child_moved" | "child_removed" | "child_added" | "child_changed";
export interface IFirebaseDatabase {
    readonly app: FirebaseApp;
    ref(pathString?: string): IReference;
    refFromURL(url: string): IReference;
    goOffline(): void;
    goOnline(): void;
}
export interface IQuery<T = any> {
    off(eventType?: EventType, callback?: ISnapshotCallback, context?: Object): void;
    once(eventType: EventType, userCallback?: ISnapshotCallback, cancelOrContext?: ((a: Error) => void) | Object, context?: Object): Promise<IDataSnapshot<T>>;
    limitToFirst(limit: number): IQuery<T>;
    limitToLast(limit: number): IQuery<T>;
    orderByChild(path: string): IQuery<T>;
    orderByKey(): IQuery<T>;
    orderByPriority(): IQuery<T>;
    orderByValue(): IQuery<T>;
    startAt(value?: number | string | boolean | null, name?: string | null): IQuery<T>;
    endAt(value?: number | string | boolean | null, name?: string | null): IQuery<T>;
    equalTo(value: number | string | boolean | null, name?: string): IQuery;
    toString(): string;
    toJSON(): string;
    isEqual(other: IQuery): boolean;
}
export interface IReference<T = any> extends IQuery {
    set(newVal: T, onComplete?: (a: Error | null) => void): Promise<void>;
    update(objectToMerge: Partial<T>, onComplete?: (a: Error | null) => void): Promise<void>;
    setWithPriority(newVal: T, newPriority: string | number | null, onComplete?: (a: Error | null) => void): Promise<any>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    transaction(transactionUpdate: (a: Partial<T>) => Partial<T>, onComplete?: (a: Error | null, b: boolean, c: IDataSnapshot<T> | null) => void, applyLocally?: boolean): Promise<ITransactionResult<T>>;
    setPriority(priority: string | number | null, onComplete?: (a: Error | null) => void): Promise<void>;
    push(value?: any, onComplete?: (a: Error | null) => void): IReference<T>;
    onDisconnect(): IOnDisconnect<T>;
    readonly key: string | null;
    readonly parent: IReference | null;
    readonly root: IReference;
}
export interface ITransactionResult<T = any> {
    committed: boolean;
    snapshot: IDataSnapshot<T>;
    toJSON(): object;
}
export interface IDataSnapshot<T = any> {
    readonly ref: IReference<T>;
    readonly key: string;
    child<T = any>(childPathString: string): IDataSnapshot<T>;
    exists(): boolean;
    forEach(action: (d: IDataSnapshot) => void): boolean;
    getPriority(): string | number | null;
    hasChild(childPathString: string): boolean;
    hasChildren(): boolean;
    numChildren(): number;
    toJSON(): any;
    val(): T;
}
export interface IOnDisconnect<T = any> {
    cancel(onComplete?: (a: Error | null) => void): Promise<void>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    set(value: T, onComplete?: (a: Error | null) => void): Promise<void>;
    setWithPriority(value: T, priority: number | string | null, onComplete?: (a: Error | null) => void): Promise<void>;
    update(objectToMerge: Partial<T>, onComplete?: (a: Error | null) => void): Promise<void>;
}
export interface ISnapshotCallback<T = any> {
    (a: IDataSnapshot<T>, b?: string): any;
}
