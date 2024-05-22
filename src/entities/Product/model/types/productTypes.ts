interface ProductSchema {
  products: Product[];
  error?: string;
  isLoading: boolean;
}

interface GetProdactResponse {
  results: ProductResponse[];
}
type ProductResponse = {
  id: string;
  masterData: {
    staged: {
      description: {
        'en-US'?: string;
      };
      name: {
        'en-US'?: string;
      };
      masterVariant: {
        images: Images[];
      };
    };
  };
};
type Images = {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
};

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
}

export { ProductSchema, GetProdactResponse, Product, Images, ProductResponse };
