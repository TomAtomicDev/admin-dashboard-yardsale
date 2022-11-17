const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  products: {
    getList: (limit, offset) => `${API}/${VERSION}/products?limit=${limit}&offset=${offset}`,
    postProducts: `${API}/${VERSION}/products`,
    getProduct: (id) => `${API}/${VERSION}/products/${id}`,
    putProduct: (id) => `${API}/${VERSION}/products/${id}`,
    deleteProduct: (id) => `${API}/${VERSION}/products/${id}`,
  },
  auth: {
    login: `${API}/${VERSION}/auth/login`,
    profile: `${API}/${VERSION}/auth/profile`,
  },
  users: {
    getList: (limit) => `${API}/${VERSION}/users?limit=${limit}`,
    postUser: `${API}/${VERSION}/users`,
    isAvailable: `${API}/${VERSION}/users/is-available`,
  },
  categories: {
    getList: (limit) => `${API}/${VERSION}/categories?limit=${limit}`,
    postCategory: `${API}/${VERSION}/categories`,
    getCategory: (id) => `${API}/${VERSION}/categories/${id}`,
    putCategory: (id) => `${API}/${VERSION}/categories/${id}`,
    getProductsByCategorie: (id) => `${API}/${VERSION}/categories/${id}/products`,
  },
  files: {
    upload: `${API}/${VERSION}/files/upload`,
    getFile: (filename) => `${API}/${VERSION}/files/${filename}`,
  },
};

export default endPoints;
