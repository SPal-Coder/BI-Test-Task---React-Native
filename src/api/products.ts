const BASE_URL = 'https://dummyjson.com';

export const fetchAllProducts = async (
  limit: number,
  skip: number
) => {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&skip=${skip}`
  );

  if (!response.ok) {
    throw new Error('API Error');
  }

  return response.json();
};
