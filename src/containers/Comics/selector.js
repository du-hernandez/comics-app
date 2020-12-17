import { createSelector } from 'reselect';

const selectComics = state => state.comics;

export const selectUpdatedComis = () => (
  createSelector(selectComics, comics => comics)
)
