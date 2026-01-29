import data from '../data/products.json';

const PAGE_SIZE = 10;

export const getProducts = (page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  return data.products.slice(start, start + PAGE_SIZE);
};
