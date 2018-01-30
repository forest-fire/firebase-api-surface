import { FirebaseApp } from "@firebase/app-types";
export declare type RTDBEventType = "value" | "child_moved" | "child_removed" | "child_added" | "child_changed";
export interface IRTDBDatabase {
    readonly app: FirebaseApp;
    ref(pathString?: string): IRTDBReference;
    refFromURL(url: string): IRTDBReference;
    goOffline(): void;
    goOnline(): void;
}
export interface IRTDBQuery<T = any> {
    off(eventType?: string, callback?: ISnapshotCallback, context?: Object): void;
    once(eventType: string, userCallback?: ISnapshotCallback, cancelOrContext?: ((a: Error) => void) | Object, context?: Object): Promise<IRTDBDataSnapshot<T>>;
    limitToFirst(limit: number): IRTDBQuery<T>;
    limitToLast(limit: number): IRTDBQuery<T>;
    orderByChild(path: string): IRTDBQuery<T>;
    orderByKey(): IRTDBQuery<T>;
    orderByPriority(): IRTDBQuery<T>;
    orderByValue(): IRTDBQuery<T>;
    startAt(value?: number | string | boolean | null, name?: string | null): IRTDBQuery<T>;
    endAt(value?: number | string | boolean | null, name?: string | null): IRTDBQuery<T>;
    equalTo(value: number | string | boolean | null, name?: string): IRTDBQuery;
    toString(): string;
    toJSON(): string;
    isEqual(other: IRTDBQuery): boolean;
}
export interface IRTDBReference<T = any> extends IRTDBQuery {
    set(newVal: T, onComplete?: (a: Error | null) => void): Promise<void>;
    update(objectToMerge: Partial<T>, onComplete?: (a: Error | null) => void): Promise<void>;
    setWithPriority(newVal: T, newPriority: string | number | null, onComplete?: (a: Error | null) => void): Promise<any>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    transaction(transactionUpdate: (a: Partial<T>) => Partial<T>, onComplete?: (a: Error | null, b: boolean, c: IRTDBDataSnapshot<T> | null) => void, applyLocally?: boolean): Promise<IRTDBTransactionResult<T>>;
    setPriority(priority: string | number | null, onComplete?: (a: Error | null) => void): Promise<void>;
    push(value?: any, onComplete?: (a: Error | null) => void): IRTDBReference<T>;
    onDisconnect(): IRTDBOnDisconnect<T>;
    readonly key: string | null;
    readonly parent: IRTDBReference | null;
    readonly root: IRTDBReference;
}
export interface IRTDBTransactionResult<T = any> {
    committed: boolean;
    snapshot: IRTDBDataSnapshot<T>;
    toJSON(): object;
}
export interface IRTDBDataSnapshot<T = any> {
    readonly ref: IRTDBReference<T>;
    readonly key: string;
    child<T = any>(childPathString: string): IRTDBDataSnapshot<T>;
    exists(): boolean;
    forEach(action: (d: IRTDBDataSnapshot) => void): boolean;
    getPriority(): string | number | null;
    hasChild(childPathString: string): boolean;
    hasChildren(): boolean;
    numChildren(): number;
    toJSON(): any;
    val(): T;
}
export interface IRTDBOnDisconnect<T = any> {
    cancel(onComplete?: (a: Error | null) => void): Promise<void>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    set(value: T, onComplete?: (a: Error | null) => void): Promise<void>;
    setWithPriority(value: T, priority: number | string | null, onComplete?: (a: Error | null) => void): Promise<void>;
    update(objectToMerge: Partial<T>, onComplete?: (a: Error | null) => void): Promise<void>;
}
export interface ISnapshotCallback<T = any> {
    (a: IRTDBDataSnapshot<T>, b?: string): any;
}
