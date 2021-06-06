declare class LojaIntegrada {
    constructor(ApiKey: string, AppKey: string, DesBug: boolean);
    getCategories(limit?:number, offset?:number): void;
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
situacao_sem_estoque: number;
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

type ProductType = 'normal' | 'atributo_opcao' | 'atributo'

interface productAddData {
sku: string;
nome: string;
descricao_completa?: string ;
ativo: boolean;
destaque: boolean;
tipo: ProductType;
usado: false;
categorias?: Array<string> | null;
}
interface productEditData {
sku?: string;
nome?: string;
descricao_completa?: string ;
ativo?: boolean;
destaque?: boolean;
tipo?: ProductType;
usado?: false;
categorias?: Array<string> | null;
}

type CouponType = 'fixo' | 'atributo_opcao' | 'atributo'

interface couponAddData {
aplicar_no_total: boolean;
ativo: boolean;
codigo: string;
cumulativo: boolean;
descricao?: number;
quantidade: number;
quantidade_por_cliente?: number;
tipo: CouponType;
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
tipo?: CouponType;
validade?: string;
valor?: string;
valor_minimo?: string;
}
type SituationsType = 'aguardando_pagamento' |  'em_producao' | 'pagamento_devolvido'  |  'pagamento_em_analise' | 'pedido_chargeback' |  'pagamento_em_disputa'  | 'pedido_cancelado' | 'pedido_efetuado' | 'pedido_em_separacao' | 'pedido_entregue' | 'pedido_enviado' | 'pedido_pago' | 'pronto_para_retirada'
interface situationsEditData {
    codigo: SituationsType
}
interface ordersFilterData {
    since_numero?: date;
    since_atualizado?: date;
    cliente_id?: number;
    pagamento_id?: number;
    situacao_id?: number;
    since_criado?: date;
    until_criado?: date;
}


interface productImageAddData {

}
interface productImageEditData {

}
interface seoAddData {

}
interface seoEditData {

}
interface clientAddData {

}
interface clientEditData {

}

export function LojaIntegrada(string, string, boolean)

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

type ProductsbyDateType = 'criacao' | 'modificacao'
type ProductsbyDateValueType = '__lt' | '__lte' | '__gt' | '__gte'

export function getProducts(): Promise<number?, number?, boolean?, boolean?>
export function getProductsbyDate(): Promise<number?, number?, boolean?, boolean?, ProductsbyDateType?, ProductsbyDateValueType?, string?>
export function getProductById(): Promise<number>
export function getProductBySKU():Promise<string>
export function addProduct(): Promise<productAddData[]>
export function editProduct(): Promise<number, productEditData[]>

export function getProductImages(): Promise<number?, number?>
export function getProductImageById(): Promise<number>
export function addProductImage(): Promise<number, productImageAddData[]>
export function editProductImage(): Promise<number, productImageEditData[]>

export function getSeos(): Promise<number?, number?>
export function getSeoById(): Promise<number>
export function addSeo(): Promise<number, seoAddData[]>
export function editSeo(): Promise<number, seoEditData[]>

export function getClients(): Promise<number?, number?>
export function getClientById(): Promise<number>
export function addClient(): Promise<number, clientAddData[]>
export function editClient(): Promise<number, clientEditData[]>

export function getGroups(): Promise<number?, number?>
export function getGroupById(): Promise<number>

export function getBanks(): Promise<number?, number?>
export function getBankById(): Promise<number>
    
export function getPayments(): Promise<number?, number?>
export function getPaymentById(): Promise<number>
  
export function getShippings(): Promise<number?, number?>
export function getShippingById(): Promise<number>
    
export function getSituations(): Promise<number?, number?>
export function getSituationsByOrderId(): Promise<number>
export function editSituationsByOrderId(): Promise<number, situationsEditData[]>

export function getHistoricalSituations(): Promise<number?, number?>
export function getHistoricalSituationsByOrderId(): Promise<number>

type OrdersbyDateType = 'atualizado' | 'criado' | 'criado_antes'

export function getOrders(): Promise<number?, number?>
export function getOrdersbyDate():  Promise<number?, number?, OrdersbyDateType>