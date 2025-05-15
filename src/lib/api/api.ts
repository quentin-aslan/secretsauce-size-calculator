import type { Brand } from '$lib/types/brand';
import type { Category } from '$lib/types/category';
import type {Size} from "$lib/types/size";

interface FetchBrandsResponse {
  brands: Brand[];
}

interface FetchCategoriesResponse {
  brandId: string,
  categories: Category[];
}

interface FetchSizesResponse {
  sizes: Size[];
}

const API_TOKEN = 'cXVlbnRpbjo3N2NhZDM0Mi0zYTIxLTRkMWEtOWFiMC1lMDdmYWQzOGY1YWU=';
const BASE_URL = 'https://size-calculator-api.sspinc.io';

async function fetchWithAuth<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Basic ${API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBrands(brandPrefix: string): Promise<Brand[]> {
  const brandsFromApi = await fetchWithAuth<FetchBrandsResponse>(BASE_URL + '/brands?' + new URLSearchParams({
    name_prefix: brandPrefix
  }));

  // Make sure the function returns valid data
  return brandsFromApi?.brands.map(brand => ({
    id: brand.id ?? '',
    name: brand.name ?? ''
  })) ?? []
}

export async function fetchCategories(brandId: string): Promise<Category[]> {
  const categoriesFromApi = await fetchWithAuth<FetchCategoriesResponse>(BASE_URL + '/categories?' +
    new URLSearchParams({ brand_id: brandId }));

  // Make sure the function returns valid data
  return categoriesFromApi?.categories.map(category => ({
    id: category.id ?? '',
    name: category.name ?? ''
  })) ?? []
}

export async function fetchSizes(brandId: string, categoryId: string, measurement: number): Promise<Size[]> {
  const sizeFromApi = await fetchWithAuth<FetchSizesResponse>(BASE_URL + '/sizes?' +
      new URLSearchParams({ brand_id: brandId, category_id: categoryId, measurement: measurement.toString() }));

  // Make sure the function returns valid data
  return sizeFromApi?.sizes.map(size => ({
    label: size.label ?? ''
  })) ?? []
}

