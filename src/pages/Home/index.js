import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CarrinhoActions from '../../store/modules/carrinho/actions';

import { ProdutoList } from './styles';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const quantidade = useSelector(state =>
    state.carrinho.reduce((Totalquantidade, produto) => {
      Totalquantidade[produto.id] = produto.quantidade;

      return Totalquantidade;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('products');

      const data = response.data.map(produto => ({
        ...produto,
        priceFormatted: formatPrice(produto.price),
      }));
      setProdutos(data);
    }
    loadProdutos();
  }, []);

  function handleAddProduto(id) {
    dispatch(CarrinhoActions.adicionarCarrinhoRequest(id));
  }

  return (
    <ProdutoList>
      {produtos.map(produto => (
        <li key={produto.id}>
          <img src={produto.image} alt={produto.title} />
          <strong>{produto.title}</strong>
          <span>{produto.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduto(produto.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{' '}
              {quantidade[produto.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProdutoList>
  );
}
