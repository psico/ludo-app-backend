import { db } from './index';
const firebase = require('firebase/compat/app');

export default (request:any) => ({
  db: db,
  firebase
});
