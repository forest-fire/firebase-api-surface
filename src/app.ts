import {
  FirebaseOptions as FirebaseClientOptions,
  FirebaseNamespace as IFirebaseNamespace
  // tslint:disable-next-line:no-implicit-dependencies
} from "@firebase/app-types";

import { IFirebaseDatabase } from "./rtdb";
// import { IFirebaseFirestore } from "./firestore";
// import { FirebaseMessaging as FirebaseClientMessaging } from "./messaging";
// import { FirebaseStorage as FirebaseClientStorage } from "./storage";

// tslint:disable-next-line:interface-name
export interface FirebaseAdminOptions {
  credential?: IAdminCredentialAccessor;
  databaseAuthVariableOverride?: Object;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
}

export interface IAdminCredentialAccessor {
  getAccessToken: () => IAdminCredential;
}

export interface IAdminCredential {
  /** The actual Google OAuth2 access token */
  access_token: string;
  /** The number of seconds from when the token was issued that it expires */
  expires_in: number;
}

export interface IInstanceId {
  app: IFirebaseApp;
  deleteInstanceId: (id: any) => Promise<void>;
}

export interface IFirebaseApp {
  /**
   * The (read-only) name (identifier) for this App. '[DEFAULT]' is the default
   * App.
   */
  name: string;

  /**
   * The (read-only) configuration options from the app initialization.
   */
  options: FirebaseClientOptions | FirebaseAdminOptions;

  /**
   * Make the given App unusable and free resources.
   */
  delete(): Promise<void>;

  /** this method is provided only on the admin API */
  instanceId?: () => IInstanceId;

  /** returns the real-time database API */
  database(): IFirebaseDatabase;
  /** returns the firestore database API */
  firestore?: () => any;
  // firestore?: () => IFirebaseFirestore;
  /** returns the messaging API */
  messaging?: () => any;
  /** returns the storage API */
  storage?: () => any;
}
