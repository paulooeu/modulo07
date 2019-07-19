import { all } from 'redux-saga/effects';
import carrinho from './carrinho/saga';

export default function* rootSaga() {
  return yield all([carrinho]);
}
