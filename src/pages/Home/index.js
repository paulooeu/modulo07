import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import { ProdutoList } from './styles';

class Home extends Component {
  state = {
    produtos: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(produto => ({
      ...produto,
      priceFormatted: formatPrice(produto.price),
    }));
    this.setState({ produtos: data });
  }
  handleAddProduto = produto => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CARRINHO',
      produto,
    });
  };

  render() {
    const { produtos } = this.state;

    return (
      <ProdutoList>
        {produtos.map(produto => (
          <li key={produto.id}>
            <img src={produto.image} alt={produto.title} />
            <strong>{produto.title}</strong>
            <span>{produto.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduto(produto)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" /> 3
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProdutoList>
    );
  }
}
export default connect()(Home);
