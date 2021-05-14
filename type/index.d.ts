interface productAddData {
  sku: string;
  nome: string;
  descricao_completa?: string ;
  ativo: boolean;
  destaque: boolean;
  tipo: 'normal' | 'atributo_opcao' | 'atributo';
  usado: false;
  categorias?: Array<string> | null;
}
interface productEditData {
  sku?: string;
  nome?: string;
  descricao_completa?: string ;
  ativo?: boolean;
  destaque?: boolean;
  tipo?: 'normal' | 'atributo_opcao' | 'atributo';
  usado?: false;
  categorias?: Array<string> | null;
}
interface couponAddData {
  aplicar_no_total: boolean;
  ativo: boolean;
  codigo: string;
  cumulativo: boolean;
  descricao?: number;
  quantidade: number;
  quantidade_por_cliente?: number;
  tipo: 'fixo' | 'atributo_opcao' | 'atributo';
  validade?: string;
  valor: string;
  valor_minimo?: string;
}
interface couponEditData {
  aplicar_no_total?: boolean;
  ativo: boolean;
  codigo?: string;
  cumulativo?: boolean;
  descricao?: number;
  quantidade?: number;
  quantidade_por_cliente?: number;
  tipo?: 'fixo' | 'atributo_opcao' | 'atributo';
  validade?: string;
  valor?: string;
  valor_minimo?: string;
}
interface categoryDataIds {
  join(arg0: string): string;
  [index: number]: any;
}
interface categoryAddData {
  nome: string;
  descricao?: string;
  categoria_pai?: string;
}
interface categoryEditData {
  nome?: string;
  descricao?: string;
  categoria_pai?: string;
}
interface brandDataIds {
  join(arg0: string): string;
  [index: number]: any;
}
interface brandAddData {
  nome: string;
  descricao?: string;
  apelido?: string;
}
interface brandEditData {
  nome?: string;
  descricao?: string;
  apelido?: string; // slug
}
interface gridDataIds {
  join(arg0: string): string;
  [index: number]: any;
}
interface gridAddData {
  nome: string;
  nome_visivel?: string;
}
interface gridEditData {
  nome?: string;
  nome_visivel?: string;
}
interface variationAddData {
  nome: string;
}
interface variationEditData {
  nome?: string;
}
interface stockEditData {
  gerenciado: boolean;
  quantidade: number;
  situacao_em_estoque: number;
  situacao_em_estoque: number;
}
interface stocksDataIds {
  join(arg0: string): string;
  [index: number]: any;
}
interface priceDataIds {
    join(arg0: string): string;
    [index: number]: any;
}
interface priceEditData {
  nome?: string;
  descricao?: string;
  categoria_pai?: string;
}
interface clientAddData {
  
}
interface clientEditData {
  
}

export function LojaIntegrada(string, string, boolean)


export function getProducts(): Promise<number?, number?, boolean?, boolean?, 'criacao' | 'modificacao', '__lt' | '__lte'  | '__gt' | '__gte', string>
export function getProductById(): Promise<number>
export function getProductBySKU():Promise<string>
export function addProduct(): Promise<productAddData[]>
export function editProduct(): Promise<number, productEditData[]>

export function getCategories(): Promise<number?, number?>
export function getListCategories(): Promise<categoryDataIds[]>
export function getCategoryById(): Promise<number>
export function addCategory(): Promise<categoryAddData[]>
export function editCategory(): Promise<number, categoryEditData[]>

export function getBrands(): Promise<number?, number?>
export function getListBrands(): Promise<brandDataIds[]>
export function getBrandById(): Promise<number>
export function addBrand(): Promise<brandAddData[]>
export function editBrand(): Promise<number, brandEditData[]>

export function getGrids(): Promise<number?, number?>
export function getGridById(): Promise<number>
export function addGrid(): Promise<gridAddData[]>
export function editGrid(): Promise<number, gridEditData[]>

export function getVariation(): Promise<number?, number?>
export function addVariation(): Promise<number, variationAddData[]>
export function editVariation(): Promise<number, variationEditData[]>

export function getStocks(): Promise<number?, number?>
export function getStockById(): Promise<number>
export function editStock(): Promise<number, stockEditData[]>

export function getPrices(): Promise<number?, number?>
export function getListPrices(): Promise<priceDataIds[]>
export function editPrice(): Promise<number, priceEditData[]>