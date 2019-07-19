import produce from 'immer';

export default function carrinho(state = [], action) {
  switch (action.type) {
    case '@carrinho/CREATE_RESPONSE':
      return produce(state, draft => {
        const { produto } = action;
        draft.push(produto);
      });

    case '@carrinho/DELETE':
      return produce(state, draft => {
        const prdutoIndex = draft.findIndex(p => p.id === action.id);
        if (prdutoIndex >= 0) {
          draft.splice(prdutoIndex, 1);
        }
      });

    case '@carrinho/UPDATE_RESPONSE': {
      return produce(state, draft => {
        const prdutoIndex = draft.findIndex(p => p.id === action.id);
        if (prdutoIndex >= 0) {
          draft[prdutoIndex].quantidade = Number(action.quantidade);
        }
      });
    }
    default:
      return state;
  }
}
