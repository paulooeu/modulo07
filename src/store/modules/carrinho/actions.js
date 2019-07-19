export function adicionarCarrinhoRequest(id) {
  return {
    type: '@carrinho/CREATE_REQUEST',
    id,
  };
}
export function adicionarCarrinhoResponse(produto) {
  return {
    type: '@carrinho/CREATE_RESPONSE',
    produto,
  };
}

export function removerCarrinho(id) {
  return {
    type: '@carrinho/DELETE',
    id,
  };
}

export function updateCarrinhoRequest(id, quantidade) {
  return {
    type: '@carrinho/UPDATE_REQUEST',
    id,
    quantidade,
  };
}
export function updateCarrinhoResponse(id, quantidade) {
  return {
    type: '@carrinho/UPDATE_RESPONSE',
    id,
    quantidade,
  };
}
