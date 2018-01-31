import { Reference } from "@firebase/storage-types";

export interface IReference extends Reference {
  getMetadata<T = any>(): Promise<T>;
  getDownloadURL(): Promise<string>;
}

export {
  FullMetadata as IFullMetadata,
  SettableMetadata as ISettableMetadata,
  UploadMetadata as IUploadMetadata,
  UploadTask as IUploadTask,
  UploadTaskSnapshot as IUploadTaskSnapshot,
  FirebaseStorage
} from "@firebase/storage-types";
