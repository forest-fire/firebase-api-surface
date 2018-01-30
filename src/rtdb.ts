import { FirebaseApp } from "@firebase/app-types";

export type RTDBEventType =
  | "value"
  | "child_moved"
  | "child_removed"
  | "child_added"
  | "child_changed";

export interface IRTDBDatabase {
  /**  */
  readonly app: FirebaseApp;
  /** Returns a reference to the root or the path specified in opt_pathString. */
  ref(pathString?: string): IRTDBReference;
  /**
   * Returns a reference to the root or the path specified in url.
   * We throw a exception if the url is not in the same domain as the
   * current repo.
   */
  refFromURL(url: string): IRTDBReference;
  /** Disconnects from the server (all Database operations will be completed offline). */
  goOffline(): void;
  /** Reconnects to the server and synchronizes the offline Database state with the server state. */
  goOnline(): void;
}

export interface IRTDBQuery<T = any> {
  off(eventType?: string, callback?: ISnapshotCallback, context?: Object): void;
  /** Attaches a listener, waits for the first event, and then removes the listener */
  once(
    eventType: string,
    userCallback?: ISnapshotCallback,
    cancelOrContext?: ((a: Error) => void) | Object,
    context?: Object
  ): Promise<IRTDBDataSnapshot<T>>;
  /** Set a limit and anchor it to the start of the window. */
  limitToFirst(limit: number): IRTDBQuery<T>;
  /** Set a limit and anchor it to the end of the window. */
  limitToLast(limit: number): IRTDBQuery<T>;
  /** Given a child path, return a new query ordered by the specified grandchild path. */
  orderByChild(path: string): IRTDBQuery<T>;
  /** Return a new query ordered by the KeyIndex */
  orderByKey(): IRTDBQuery<T>;
  /** Return a new query ordered by the PriorityIndex */
  orderByPriority(): IRTDBQuery<T>;
  /** Return a new query ordered by the ValueIndex */
  orderByValue(): IRTDBQuery<T>;
  startAt(
    value?: number | string | boolean | null,
    name?: string | null
  ): IRTDBQuery<T>;
  endAt(
    value?: number | string | boolean | null,
    name?: string | null
  ): IRTDBQuery<T>;
  /**
   * Load the selection of children with exactly the specified value, and, optionally,
   * the specified name.
   */
  equalTo(value: number | string | boolean | null, name?: string): IRTDBQuery;
  /** URL for this location. */
  toString(): string;
  toJSON(): string;
  /** Return true if this query and the provided query are equivalent; otherwise, return false. */
  isEqual(other: IRTDBQuery): boolean;
}

export interface IRTDBReference<T = any> extends IRTDBQuery {
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
      c: IRTDBDataSnapshot<T> | null
    ) => void,
    applyLocally?: boolean
  ): Promise<IRTDBTransactionResult<T>>;
  /** Sets a priority for the data at this Database location. */
  setPriority(
    priority: string | number | null,
    onComplete?: (a: Error | null) => void
  ): Promise<void>;
  /** Generates a new child location using a unique key and returns its Reference. */
  push(value?: any, onComplete?: (a: Error | null) => void): IRTDBReference<T>;
  /** Returns an OnDisconnect object - see Enabling Offline Capabilities in JavaScript for more information on how to use it. */
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
  /** The Reference for the location that generated this DataSnapshot. */
  readonly ref: IRTDBReference<T>;
  /** The key (last part of the path) of the location of this DataSnapshot. */
  readonly key: string;

  /** Gets another DataSnapshot for the location at the specified relative path. */
  child<T = any>(childPathString: string): IRTDBDataSnapshot<T>;
  /** Returns true if this DataSnapshot contains any data. It is slightly more efficient than using snapshot.val() !== null. */
  exists(): boolean;
  /** Enumerates the top-level children in the DataSnapshot. */
  forEach(action: (d: IRTDBDataSnapshot) => void): boolean;
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

export interface IRTDBOnDisconnect<T = any> {
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
  (a: IRTDBDataSnapshot<T>, b?: string): any;
}
