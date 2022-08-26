import { db } from './index';
const firebase = require('firebase/compat/app');

export default () => ({
  db: db,
  firebase
});
