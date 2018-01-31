import { FirebaseApp } from "@firebase/app-types";
export type EventType =
  | "value"
  | "child_moved"
  | "child_removed"
  | "child_added"
  | "child_changed";

export interface IFirebaseDatabase {
  /**  */
  readonly app: FirebaseApp;
  /** Returns a reference to the root or the path specified in opt_pathString. */
  ref(pathString?: string): Reference;
  /**
   * Returns a reference to the root or the path specified in url.
   * We throw a exception if the url is not in the same domain as the
   * current repo.
   */
  refFromURL(url: string): Reference;
  /** Disconnects from the server (all Database operations will be completed offline). */
  goOffline(): void;
  /** Reconnects to the server and synchronizes the offline Database state with the server state. */
  goOnline(): void;
}

export interface Query<T = any> {
  off(
    eventType?: EventType,
    callback?: ISnapshotCallback,
    context?: Object
  ): void;
  /** Attaches a listener, waits for the first event, and then removes the listener */
  once(
    eventType: EventType,
    userCallback?: ISnapshotCallback,
    cancelOrContext?: ((a: Error) => void) | Object,
    context?: Object
  ): Promise<DataSnapshot<T>>;
  /** Set a limit and anchor it to the start of the window. */
  limitToFirst(limit: number): Query<T>;
  /** Set a limit and anchor it to the end of the window. */
  limitToLast(limit: number): Query<T>;
  /** Given a child path, return a new query ordered by the specified grandchild path. */
  orderByChild(path: string): Query<T>;
  /** Return a new query ordered by the KeyIndex */
  orderByKey(): Query<T>;
  /** Return a new query ordered by the PriorityIndex */
  orderByPriority(): Query<T>;
  /** Return a new query ordered by the ValueIndex */
  orderByValue(): Query<T>;
  startAt(
    value?: number | string | boolean | null,
    name?: string | null
  ): Query<T>;
  endAt(
    value?: number | string | boolean | null,
    name?: string | null
  ): Query<T>;
  /**
   * Load the selection of children with exactly the specified value, and, optionally,
   * the specified name.
   */
  equalTo(value: number | string | boolean | null, name?: string): Query;
  /** URL for this location. */
  toString(): string;
  toJSON(): string;
  /** Return true if this query and the provided query are equivalent; otherwise, return false. */
  isEqual(other: Query): boolean;
}

export interface Reference<T = any> extends Query {
  /** Writes data to a Database location */
  set(newVal: T, onComplete?: (a: Error | null) => void): Promise<void>;
  /** Write/update 1:M values to the Database */
  update(
    objectToMerge: Partial<T>,
    onComplete?: (a: Error | null) => void
  ): Promise<void>;
  /** Like set() but also specifies the priority for that data */
  setWithPriority(
    newVal: T,
    newPriority: string | number | null,
    onComplete?: (a: Error | null) => void
  ): Promise<any>;
  /** Removes the data at this Database location. Any data at child locations will also be deleted.*/
  remove(onComplete?: (a: Error | null) => void): Promise<void>;
  /** Atomically modifies the data at this location */
  transaction(
    transactionUpdate: (a: Partial<T>) => Partial<T>,
    onComplete?: (
      a: Error | null,
      b: boolean,
      c: DataSnapshot<T> | null
    ) => void,
    applyLocally?: boolean
  ): Promise<TransactionResult<T>>;
  /** Sets a priority for the data at this Database location. */
  setPriority(
    priority: string | number | null,
    onComplete?: (a: Error | null) => void
  ): Promise<void>;
  /** Generates a new child location using a unique key and returns its Reference. */
  push(value?: any, onComplete?: (a: Error | null) => void): Reference<T>;
  /** Returns an OnDisconnect object - see Enabling Offline Capabilities in JavaScript for more information on how to use it. */
  onDisconnect(): OnDisconnect<T>;
  readonly key: string | null;
  readonly parent: Reference | null;
  readonly root: Reference;
}

export interface TransactionResult<T = any> {
  committed: boolean;
  snapshot: DataSnapshot<T>;
  toJSON(): object;
}

export interface DataSnapshot<T = any> {
  /** The Reference for the location that generated this DataSnapshot. */
  readonly ref: Reference<T>;
  /** The key (last part of the path) of the location of this DataSnapshot. */
  readonly key: string;

  /** Gets another DataSnapshot for the location at the specified relative path. */
  child<T = any>(childPathString: string): DataSnapshot<T>;
  /** Returns true if this DataSnapshot contains any data. It is slightly more efficient than using snapshot.val() !== null. */
  exists(): boolean;
  /** Enumerates the top-level children in the DataSnapshot. */
  forEach(action: (d: DataSnapshot) => void): boolean;
  /** Gets the priority value of the data in this DataSnapshot. */
  getPriority(): string | number | null;
  /** Returns true if the specified child path has (non-null) data. */
  hasChild(childPathString: string): boolean;
  /** Returns whether or not the DataSnapshot has any non-null child properties. */
  hasChildren(): boolean;
  /** Returns the number of child properties of this DataSnapshot. */
  numChildren(): number;
  /** Returns a JSON-serializable representation of this object. */
  toJSON(): any;
  /** Extracts a JavaScript value from a DataSnapshot. */
  val(): T;
}

export interface OnDisconnect<T = any> {
  cancel(onComplete?: (a: Error | null) => void): Promise<void>;
  remove(onComplete?: (a: Error | null) => void): Promise<void>;
  set(value: T, onComplete?: (a: Error | null) => void): Promise<void>;
  setWithPriority(
    value: T,
    priority: number | string | null,
    onComplete?: (a: Error | null) => void
  ): Promise<void>;
  update(
    objectToMerge: Partial<T>,
    onComplete?: (a: Error | null) => void
  ): Promise<void>;
}

export interface ISnapshotCallback<T = any> {
  (a: DataSnapshot<T>, b?: string): any;
}
