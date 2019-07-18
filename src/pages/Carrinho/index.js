import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProdutoTabela, Total } from './styles';

export default function Carrinho() {
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
          <tr>
            <td>
              <img
                src="https://http2.mlstatic.com/tenis-masculino-sapatenis-yzy-yeezy-barato-lancamento-2018-D_NQ_NP_720818-MLB28835041479_112018-Q.jpg"
                alt="Tênis"
              />
            </td>
            <td>
              <strong>Tenis</strong>
              <span>R$129,90</span>
            </td>

            <td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline size={20} color="#7159c1" />
                </button>

                <input type="number" readOnly value={2} />

                <button type="button">
                  <MdAddCircleOutline size={20} color="#7159c1" />
                </button>
              </div>
            </td>
            <td>
              <strong>R$258,80</strong>
            </td>
            <td>
              <button type="button">
                <MdDelete size={20} color="#7159c1" />
              </button>
            </td>
          </tr>
        </tbody>
      </ProdutoTabela>
      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong>R$1920,28</strong>
        </Total>
      </footer>
    </Container>
  );
}
