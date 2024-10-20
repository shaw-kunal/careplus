import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

const apikey = 'standard_13d321a99947e2911a387ac1be0ee081dee1558380643e1087352d3d8ca42e543265c4eae11803e9fab3e816b58ff334fb0013b101d6e8d95bf62e3c7471b1bd8719d5128eb3106b9d36666d39a1a4900374d578d7d630eb2772bc3b1b30b2646251e8163e1955245b7eb4805354dc27b336d14f6111cc79dc094662027b5f3b'

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('66efc894002d8f61e9d7')
.setKey(apikey);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
