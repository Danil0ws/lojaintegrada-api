import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'url'
import type {   
    categoryAddData,
    categoryEditData,
    categoryDataIds,
    brandEditData,
    brandDataIds,
    brandAddData,
    gridAddData,
    gridEditData,
    variationAddData,
    variationEditData,
    priceDataIds,
    priceEditData,
    stockEditData,
    stocksDataIds,
    productAddData,
    productEditData,
    productImageEditData,
    productImageAddData,
    seoEditData,
    seoAddData,
    clientEditData,
    clientAddData,
    situationsEditData,
    ordersFilterData
} from '../../type'

const ApiUrlProd:string = 'https://api.awsli.com.br/api/v1'
const ApiUrlTest:string = 'https://private-anon-f07889c886-lojaintegrada.apiary-mock.com/v1'
/**
 * Creates a new LojaIntegrada.
 * @class
 */
export default class LojaIntegrada {
    ApiUrl: string
    ApiKey: string
    AppKey: string
    ApiParams: object
    /**
    * LojaIntegrada
    * @param {string} ApiKey Chave de Api
    * @param {string} AppKey Chave de Aplicacao
    * @param {boolean} DesBug Modo Produção ou Desenvolvimento
    * @example
    * const LI = new LojaIntegrada('ApiKey', 'AppKey')
    */
    constructor(ApiKey: string, AppKey: string, DesBug: boolean = false) {
        this.ApiUrl = (DesBug == false) ? ApiUrlProd : ApiUrlTest
        this.ApiKey = (Array.isArray(ApiKey))? ApiKey[(Math.floor(Math.random() * ApiKey.length))] : ApiKey 
        this.AppKey = AppKey
        this.ApiParams = new URLSearchParams({
            'chave_aplicacao': this.AppKey,
            'chave_api': this.ApiKey,
            'format': 'json'
        })            
    }

    private Requestfy(Url:string, method:string, headers: object): Promise<object>  {
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(new URL(Url), {
                    method: method,
                    headers: headers
                })
                .then((response: { json: () => any }) => response.json())
                .then(function (result: object | PromiseLike<object>) {
                    resolve(result)
                })
                .catch((err: string | undefined) => {
                    new Error(err)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Category's

    /**
     * Get All Categories
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getCategories(limit: number = 20, offset: number = 0): Promise<object> {
        let addonsParams = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString()
        })
        return this.Requestfy(
            `${this.ApiUrl}/categoria?${this.ApiParams}&${addonsParams}`,
            'GET',
            {
                'Content-Type': 'application/json'
            }
        )
    }
    /**
     * Get List Categories by Id
     * @param {categoryDataIds} CategoryIds
     * @return {Promise<object>} 
     */
    public getListCategories(CategoryIds:categoryDataIds): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let CategoryIdsString:string = CategoryIds.join(';')
                await fetch(new URL(`${this.ApiUrl}/categoria/set/${CategoryIdsString}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Category by ID
    * @param {number} CategoryId
    * @return {Promise<object>} 
    */
    public getCategory(CategoryId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/categoria/${CategoryId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Add New Category
    * @param {categoryAddData} CategoryData
    * @return {Promise<object>} 
    */
    public addCategory(CategoryData:categoryAddData): Promise<object>  {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/categoria?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(CategoryData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Category
    * @param {number} CategoryId
    * @param {categoryEditData} CategoryData
    * @return {Promise<object>} 
    */
    public editCategory(CategoryId:number, CategoryData:categoryEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/categoria/${CategoryId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(CategoryData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Brand's

    /**
    * Get All Brands
    * @param {number} limit
    * @param {number} offset
    * @return {Promise<object>} 
    */
    public getBrands(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/marca?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get For List Brands
     * @param {number} BrandIds
     * @return {Promise<object>} 
     */
    public getListBrands(BrandIds:brandDataIds): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let BrandIdsString:string = BrandIds.join(';')
                await fetch(new URL(`${this.ApiUrl}/marca/set/${BrandIdsString}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Brand by ID
    * Shows details Brand
    *
    * @param {number} BrandId
    * @return {Promise<object>} 
    */
    public getBrand(BrandId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/marca/${BrandId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Add New Brand
    * @param brandAddData BrandData
    * @return {Promise<object>} 
    */
    public addBrand(BrandData:brandAddData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/marca?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(BrandData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Brand
    * @param {number} BrandId
    * @param {brandEditData} BrandData
    * @return {Promise<object>} 
    */
    public editBrand(BrandId:number, BrandData:brandEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/marca/${BrandId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(BrandData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Grid's

    /**
    * Get All Grids
    * @param {number} limit
    * @param {number} offset
    * @return {Promise<object>} 
    */
    public getGrids(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/grades?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Get Grid by ID
    * @param {number} GridId
    * @return {Promise<object>} 
    */
    public getGridbyID(GridId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Add New Grid
    * @param {gridAddData} GridData
    * @return {Promise<object>} 
    */
    public addGrid(GridData:gridAddData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(GridData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Grid
    * @param {number} GridId
    * @param {gridEditData} GridData
    * @return {Promise<object>} 
    */
    public editGrid(GridId:number, GridData:gridEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(GridData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Variation's

    /**
     * Get All Variations
     * @param {number} GridId
     * @return {Promise<object>} 
     */
    public getVariations(GridId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}/variacao?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Get Variation by ID
    * @param {number} VariationId
    * @return {Promise<object>} 
    */
    /**
    * Add New Variation
    * @param {variationAddData} VariationData
    * @return {Promise<object>} 
    */
    public addVariation(GridId:number, VariationData:variationAddData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}/variacao?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(VariationData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Variation
    * 
    * @param {number} GridId
    * @param {number} VariationId
    * @param {variationEditData} VariationData
    * @return {Promise<object>} 
    */
    public editVariation(GridId:number, VariationId:number, VariationData:variationEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}/variacao/${VariationId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(VariationData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Stock's

    /**
    * Get All Stocks
    * @param {number} limit
    * @param {number} offset
    * @return {Promise<object>} 
    */
    public getStocks(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/produto_estoque?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Get Stock by ID
    * @param {number} StockId
    * @return {Promise<object>} 
    */
    public getStockbyID(StockId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_estoque/${StockId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get List Stock by Id
     * @param {stocksDataIds} StocksIds
     * @return {Promise<object>} 
     */
    public getListStocks(StocksIds:stocksDataIds): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let StocksIdsString:string = StocksIds.join(';')
                await fetch(new URL(`${this.ApiUrl}/produto_estoque/set/${StocksIdsString}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }  
    /**
    * Edit Stock
    * @param {number} StockId
    * @param {stockEditData} StockData
    * @return {Promise<object>} 
    */
    public editStock(StockId:number, StockData:stockEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_estoque/${StockId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(StockData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    

    // Price's

    /**
     * Get All Prices
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getPrices(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/produto_preco?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get List Prices by Id
     * @param {priceDataIds} PriceIds
     * @return {Promise<object>} 
     */
    public getListPrices(PriceIds:priceDataIds): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let PriceIdsString:string = PriceIds.join(';')
                await fetch(new URL(`${this.ApiUrl}/produto_preco/set/${PriceIdsString}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Price by ID
    * @param {number} PriceId
    * @return {Promise<object>} 
    */
    public getPrice(PriceId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_preco/${PriceId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Price
    * @param {number} PriceId
    * @param {priceEditData} PriceData
    * @return {Promise<object>} 
    */
    public editPrice(PriceId:number, PriceData:priceEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_preco/${PriceId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(PriceData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Product's

    /**
     * Get All Products
     * @param {number} limit
     * @param {number} offset
     * @param {boolean} description_html [Para retornar a descrição é necessário passar: true]
     * @param {boolean} ativo
     * @return {Promise<object>} 
     */
    public getProducts(limit:number = 20, offset:number = 0, description_html:boolean = false, ativo:boolean = true): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    description_html: description_html.toString(),
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/produto?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get Products by Date
     * @param {number} limit
     * @param {number} offset
     * @param {boolean} description_html [Para retornar a descrição é necessário passar: true]
     * @param {boolean} ativo
     * @param {'criacao' | 'modificacao'} data_type
     * @param {'__lt' | '__lte'  | '__gt' | '__gte'} data_filter
     * @param {string} data_value
     * @return {Promise<object>} 
     */
    public getProductsbyDate(limit:number = 20, offset:number = 0, description_html:boolean = false, ativo:boolean = true, data_type: 'criacao' | 'modificacao' | '' = '', data_filter:'__lt' | '__lte'  | '__gt' | '__gte' = '__lt', data_value:string = ''): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams
                if (data_filter.length > 0) {
                    if (data_type == 'modificacao') { 
                        switch (data_filter) {
                            case '__lt':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__lt: data_value
                                })
                                break;
                            case '__lte':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__lte: data_value
                                })
                                break;
                            case '__gt':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__gt: data_value
                                })
                                break;
                            case '__gte':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__gte: data_value
                                })
                                break;
                        }
                    }
                    else {
                        switch (data_filter) {
                            case '__lt':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__lt : data_value
                                })
                                break;
                            case '__lte':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__lte: data_value
                                })
                                break;
                            case '__gt':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__gt : data_value
                                })
                                break;
                            case '__gte':
                                addonsParams = new URLSearchParams({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__gte : data_value
                                })
                                break;
                        }
                    }                    
                }
                else {
                    addonsParams = new URLSearchParams({
                        description_html: description_html.toString(),
                        limit: limit.toString(),
                        offset: offset.toString()
                    })
                }
                await fetch(new URL(`${this.ApiUrl}/produto?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get Product by Id
     * @param {number} ProductId
     * @return {Promise<object>} 
     */    
    public getProductById(ProductId:number): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(new URL(`${this.ApiUrl}/produto/${ProductId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then((result: object | PromiseLike<object>) => {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get Product by SKU
     * @param {string} ProducSKU
     * @return {Promise<object>} 
     */
    public getProductBySKU(ProducSKU:string): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    sku: ProducSKU
                })
                await fetch(new URL(`${this.ApiUrl}/produto?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then((result: object | PromiseLike<object>) => {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Add New Product
     * @param {productAddData} ProductData
     * @return {Promise<object>} 
     */
    public addProduct(ProductData:productAddData): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                
                await fetch(new URL(`${this.ApiUrl}/produto?${this.ApiParams}`), {
                        method: 'POST',
                        body: JSON.stringify(ProductData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Edit Product
     * @param {number} ProductId
     * @param {productEditData} ProductData
     * @return {Promise<object>} 
     */
    public editProduct(ProductId:number, ProductData:productEditData): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
               
                await fetch(new URL(`${this.ApiUrl}/produto/${ProductId}?${this.ApiParams}`), {
                        method: 'POST',
                        body: JSON.stringify(ProductData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Product Image's

    /**
     * Get All Product Images
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getProductImages(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/produto_imagem?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Product Image by ID
    * @param {number} ProductImageId
    * @return {Promise<object>} 
    */
    public getProductImage(ProductImageId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_imagem/${ProductImageId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Add Product Image
    * @param {number} ProductImageId
    * @param {productImageEditData} ProductImageData
    * @return {Promise<object>} 
    */
    public addProductImage(ProductImageId:number, ProductImageData:productImageAddData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_imagem/${ProductImageId}?${this.ApiParams}`), {
                    method: 'post',
                    body: JSON.stringify(ProductImageData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Product Image
    * @param {number} ProductImageId
    * @param {productImageEditData} ProductImageData
    * @return {Promise<object>} 
    */
    public editProductImage(ProductImageId:number, ProductImageData:productImageEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_imagem/${ProductImageId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(ProductImageData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Seo's

    /**
     * Get All Seos
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getSeos(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/produto_imagem?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Seo by ID
    * @param {number} SeoId
    * @return {Promise<object>} 
    */
    public getSeo(SeoId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_imagem/${SeoId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Add Seo
    * @param {number} SeoId
    * @param {seoEditData} SeoData
    * @return {Promise<object>} 
    */
    public addSeo(SeoId:number, SeoData:seoAddData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_imagem/${SeoId}?${this.ApiParams}`), {
                    method: 'post',
                    body: JSON.stringify(SeoData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Seo
    * @param {number} SeoId
    * @param {seoEditData} SeoData
    * @return {Promise<object>} 
    */
    public editSeo(SeoId:number, SeoData:seoEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/produto_imagem/${SeoId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(SeoData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Client's

    /**
     * Get All Clients
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getClients(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/cliente?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Client by ID
    * @param {number} ClientId
    * @return {Promise<object>} 
    */
    public getClient(ClientId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/cliente/${ClientId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Add Client
    * @param {number} ClientId
    * @param {clientEditData} ClientData
    * @return {Promise<object>} 
    */
    public addClient(ClientId:number, ClientData:clientAddData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/cliente/${ClientId}?${this.ApiParams}`), {
                    method: 'post',
                    body: JSON.stringify(ClientData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
    * Edit Client
    * @param {number} ClientId
    * @param {clientEditData} ClientData
    * @return {Promise<object>} 
    */
    public editClient(ClientId:number, ClientData:clientEditData): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/cliente/${ClientId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(ClientData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Group's

    /**
     * Get All Groups
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getGroups(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/grupo?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Group by ID
    * @param {number} GroupId
    * @return {Promise<object>} 
    */
    public getGroup(GroupId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grupo/${GroupId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Bank's

    /**
     * Get All Banks
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getBanks(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/banco?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Bank by ID
    * @param {number} BankId
    * @return {Promise<object>} 
    */
    public getBank(BankId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/banco/${BankId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Payment's

    /**
     * Get All Payments
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getPayments(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/pagamento?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Payment by ID
    * @param {number} PaymentId
    * @return {Promise<object>} 
    */
    public getPayment(PaymentId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/pagamento/${PaymentId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Shipping's

    /**
     * Get All Shippings
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getShippings(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/envio?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }    
    /**
    * Get Shipping by ID
    * @param {number} ShippingId
    * @return {Promise<object>} 
    */
    public getShipping(ShippingId:number): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/envio/${ShippingId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Situation's

    /**
     * Get All Situations
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getSituations(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/situacao?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    /**
     * Get Situations by Order Id
     * @param {number} OrderId
     * @return {Promise<object>} 
     */    
    public getSituationsByOrdersId(OrderId:number): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(new URL(`${this.ApiUrl}/situacao/pedido/${OrderId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then((result: object | PromiseLike<object>) => {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    } 
    /**
     * Edit Situations by Order Id
     * @param {number} OrderId
     * @param {situationsEditData} SituationsData
     * @return {Promise<object>} 
     */    
    public editSituationsByOrdersId(OrderId:number, SituationsData:situationsEditData): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(new URL(`${this.ApiUrl}/situacao/pedido/${OrderId}?${this.ApiParams}`), {
                        method: 'PUT',
                        body: JSON.stringify(SituationsData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then((result: object | PromiseLike<object>) => {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    } 

    // Historical Situation's
    /**
     * 
     * Get All Historical Situations
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getHistoricalSituations(limit:number = 20, offset:number = 0): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/situacao?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Get Historical Situations by Order Id
     * @param {number} OrderId
     * @return {Promise<object>} 
     */    
    public getHistoricalSituationsByOrderId(OrderId:number): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(new URL(`${this.ApiUrl}/situacao_historico/search/?numero=${OrderId}&${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then((result: object | PromiseLike<object>) => {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Order's

    /**
     * Get All Orders
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getOrders(limit:number = 20, offset:number = 0): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/pedido/search/?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Get All Orders by Filter
     * @param {number} limit
     * @param {number} offset
     *  @param {ordersFilterData} OrdersFilterData
     * @return {Promise<object>} 
     */
    public getOrdersbyFilter(limit:number = 20, offset:number = 0, OrdersFilterData:ordersFilterData): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                let KeysData = Object.keys(OrdersFilterData);
                KeysData.map((filter: string) => {
                    addonsParams.append(filter, OrdersFilterData[filter].toString())
                })
                await fetch(new URL(`${this.ApiUrl}/pedido/search/?${this.ApiParams}&${addonsParams.toString()}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Get All Orders by Date
     * @param {number} limit
     * @param {number} offset
     * @return {Promise<object>} 
     */
    public getOrdersbyDate(limit:number = 20, offset:number = 0, data_type: 'atualizado' | 'criado' | 'criado_antes' | '' = '', data_value:string = ''): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams;
                if (data_type.length > 0) {
                        switch (data_type) {
                            case 'atualizado':
                                addonsParams = new URLSearchParams({
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    since_atualizado: data_value
                                })
                                break;
                            case 'criado':
                                addonsParams = new URLSearchParams({
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    since_criado: data_value
                                })
                                break;
                            case 'criado_antes':
                                addonsParams = new URLSearchParams({
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    until_criado: data_value
                                })
                                break;
                            
                        }
                }
                else {
                    addonsParams = new URLSearchParams({
                        limit: limit.toString(),
                        offset: offset.toString()
                    })
                }
                await fetch(new URL(`${this.ApiUrl}/pedido/search/?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Get All Orders by Client Id
     * @param {number} limit
     * @param {number} offset
     * @param {number} ClientId
     * @return {Promise<object>} 
     */
    public getOrdersbyClientId(limit:number = 20, offset:number = 0, ClientId:number): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString(),
                    cliente_id: ClientId.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/pedido/search/?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Get All Orders by Payments Id
     * @param {number} limit
     * @param {number} offset
     * @param {number} PaymentsId
     * @return {Promise<object>} 
     */
     public getOrdersbyPaymentsId(limit:number = 20, offset:number = 0, PaymentsId:number): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString(),
                    pagamento_id: PaymentsId.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/pedido/search/?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Get All Orders by Start Order Id
     * @param {number} limit
     * @param {number} offset
     * @param {number} OrderId
     * @return {Promise<object>} 
     */
     public getOrdersbyStartOrdertId(limit:number = 20, offset:number = 0, OrderId:number): Promise<object> { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString(),
                    since_numero: OrderId.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/pedido/search/?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: object | PromiseLike<object>) {
                        resolve(result)
                    })
                    .catch((err: string | undefined) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    
}