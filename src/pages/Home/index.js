import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CarrinhoActions from '../../store/modules/carrinho/actions';
import { bindActionCreators } from 'redux';

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

  handleAddProduto = id => {
    const { adicionarCarrinhoRequest } = this.props;
    adicionarCarrinhoRequest(id);
  };

  render() {
    const { produtos } = this.state;
    const { quantidade } = this.props;

    return (
      <ProdutoList>
        {produtos.map(produto => (
          <li key={produto.id}>
            <img src={produto.image} alt={produto.title} />
            <strong>{produto.title}</strong>
            <span>{produto.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduto(produto.id)}
            >
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
}
const mapStateToProps = state => ({
  quantidade: state.carrinho.reduce((quantidade, produto) => {
    quantidade[produto.id] = produto.quantidade;
    return quantidade;
  }, {}),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CarrinhoActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
