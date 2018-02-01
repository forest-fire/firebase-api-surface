import { FirebaseOptions as FirebaseClientOptions } from "@firebase/app-types";
import { IFirebaseDatabase } from "./rtdb";
import { FirebaseMessaging as FirebaseClientMessaging } from "./messaging";
import { FirebaseStorage as FirebaseClientStorage } from "./storage";
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
    access_token: string;
    expires_in: number;
}
export interface IInstanceId {
    app: IFirebaseApp;
    deleteInstanceId: (id: any) => Promise<void>;
}
export interface IFirebaseApp {
    name: string;
    options: FirebaseClientOptions | FirebaseAdminOptions;
    delete(): Promise<void>;
    instanceId?: () => IInstanceId;
    database(): IFirebaseDatabase;
    firestore?: () => any;
    messaging?: () => FirebaseClientMessaging | any;
    storage?: () => FirebaseClientStorage | any;
}
