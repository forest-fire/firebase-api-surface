export interface IThenableReference<T = any> extends IReference<T>, PromiseLike<IReference<T>> {
}
export declare type EventType = "value" | "child_moved" | "child_removed" | "child_added" | "child_changed";
export interface IFirebaseDatabase {
    app: any;
    ref(pathString?: string): IReference;
    refFromURL(url: string): IReference;
    goOffline(): void;
    goOnline(): void;
}
export interface IQuery<T = any> {
    off(eventType?: EventType, callback?: ISnapshotCallback, context?: Object): void;
    on(eventType: EventType, callback: (a: IDataSnapshot | null, b?: string) => any, cancelCallbackOrContext?: Object | null, context?: Object | null): (a: IDataSnapshot | null, b?: string) => any;
    once(eventType: EventType, userCallback?: ISnapshotCallback, cancelOrContext?: ((a: Error) => void) | Object, context?: Object): Promise<IDataSnapshot<T>>;
    limitToFirst(limit: number): IQuery<T>;
    limitToLast(limit: number): IQuery<T>;
    orderByChild(path: string): IQuery<T>;
    orderByKey(): IQuery<T>;
    orderByPriority(): IQuery<T>;
    orderByValue(): IQuery<T>;
    startAt(value?: number | string | boolean | null, name?: string | null): IQuery<T>;
    endAt(value: number | string | boolean | null, key?: string): IQuery;
    equalTo(value: number | string | boolean | null, name?: string): IQuery;
    toString(): string;
    toJSON(): Object;
    isEqual(other: IQuery): boolean;
}
export interface IReference<T = any> extends IQuery<T> {
    set(newVal: T, onComplete?: (a: Error | null) => void): Promise<void>;
    update(objectToMerge: Partial<T>, onComplete?: (a: Error | null) => void): Promise<void>;
    setWithPriority(newVal: T, newPriority: string | number | null, onComplete?: (a: Error | null) => void): Promise<any>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    transaction(transactionUpdate: (a: Partial<T>) => any, onComplete?: (a: Error | null, b: boolean, c: IDataSnapshot | null) => any, applyLocally?: boolean): Promise<ITransactionResult<T>>;
    update(values: Object, onComplete?: (a: Error | null) => any): Promise<any>;
    setPriority(priority: string | number | null, onComplete?: (a: Error | null) => void): Promise<void>;
    push(value?: any, onComplete?: (a: Error | null) => void): IThenableReference<IReference<T>>;
    onDisconnect(): IOnDisconnect<T>;
    readonly key: string | null;
    readonly parent: IReference | null;
    readonly root: IReference;
}
export interface ITransactionResult<T = any> {
    committed: boolean;
    snapshot: IDataSnapshot<T>;
    toJSON?: () => Object;
}
export interface IDataSnapshot<T = any> {
    readonly ref: IReference<T>;
    readonly key: string;
    child(childPathString: string): IDataSnapshot;
    exists(): boolean;
    forEach(action: (d: IDataSnapshot) => boolean): boolean;
    getPriority(): string | number | null;
    hasChild(childPathString: string): boolean;
    hasChildren(): boolean;
    numChildren(): number;
    toJSON(): Object | null;
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
