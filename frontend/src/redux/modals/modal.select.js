import { createSelector } from "reselect";

const selectModal = (state) => state.modal;

export const selectShow = createSelector([selectModal], (cart) => cart.show);
