import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as CarrinhoActions from '../../store/modules/carrinho/actions';

import { formatPrice } from '../../util/format';

import { Container, ProdutoTabela, Total } from './styles';

export default function Carrinho() {
  const total = useSelector(state =>
    formatPrice(
      state.carrinho.reduce((total, produto) => {
        return total + produto.price * produto.quantidade;
      }, 0)
    )
  );

  const carrinho = useSelector(state =>
    state.carrinho.map(produto => ({
      ...produto,
      subTotal: formatPrice(produto.price * produto.quantidade),
    }))
  );

  const dispatch = useDispatch();

  function adicionarQuantidade(produto) {
    dispatch(
      CarrinhoActions.updateCarrinhoRequest(produto.id, produto.quantidade + 1)
    );
  }
  function removerQuantidade(produto) {
    dispatch(
      CarrinhoActions.updateCarrinhoRequest(produto.id, produto.quantidade - 1)
    );
  }
  return (
    <Container>
      <ProdutoTabela>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {carrinho.map(produto => (
            <tr>
              <td>
                <img src={produto.image} alt={produto.title} />
              </td>
              <td>
                <strong>{produto.title}</strong>
                <span>{produto.priceFormatted}</span>
              </td>

              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => removerQuantidade(produto)}
                    />
                  </button>

                  <input type="number" readOnly value={produto.quantidade} />

                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => adicionarQuantidade(produto)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{produto.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(CarrinhoActions.removerCarrinho(produto.id))
                  }
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProdutoTabela>
      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
