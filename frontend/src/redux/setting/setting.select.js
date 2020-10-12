import { createSelector } from "reselect";

const selectSettings = (state) => state.mainSettings;

export const selectCreatingCreator = createSelector(
   [selectSettings],
   (settings) => settings.creatingCreator
);
