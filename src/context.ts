import { db } from './index';
import firebase from 'firebase';

export default (request:any) => ({
  db: db,
  firebase
});
