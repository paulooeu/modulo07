import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { adicionarCarrinhoResponse, updateCarrinhoResponse } from './actions';
import { toast } from 'react-toastify';

function* adicioarCarrinho({ id }) {
  const produtoExiste = yield select(state =>
    state.carrinho.find(p => p.id === id)
  );
  const estoque = yield call(api.get, `/stock/${id}`);

  const quantidadeEstoque = estoque.data.amount;
  const estoqueAtual = produtoExiste ? produtoExiste.quantidade : 0;

  const quantidade = estoqueAtual + 1;

  if (quantidade > quantidadeEstoque) {
    toast.error('Quantidade solicitada fora do estoque');

    return;
  }

  if (produtoExiste) {
    const quantidade = produtoExiste.quantidade + 1;
    yield put(updateCarrinhoResponse(id, quantidade));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      quantidade: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(adicionarCarrinhoResponse(data));

    history.push('/carrinho');
  }
}

function* updateQuantidade({ id, quantidade }) {
  if (quantidade <= 0) return;

  const estoque = yield call(api.get, `/stock/${id}`);
  const quantidadeEstoque = estoque.data.amount;

  if (quantidade > quantidadeEstoque) {
    toast.error('Quantidade solicitada fora do estoque');

    return;
  }
  yield put(updateCarrinhoResponse(id, quantidade));
}
export default all([
  /**Não permite que o usuario clique varias vezes */
  takeLatest('@carrinho/CREATE_REQUEST', adicioarCarrinho),
  takeLatest('@carrinho/UPDATE_REQUEST', updateQuantidade),
]);
