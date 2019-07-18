export default function carrinho(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CARRINHO':
      return [...state, action.produto];
    default:
      return state;
  }
}
