import fetch from 'node-fetch'
import axios from 'axios'
import { URL, URLSearchParams } from 'url'
import type { productAddData, productEditData, categoryAddData, categoryEditData, categoryDataIds, brandEditData, brandDataIds, brandAddData, gridAddData, gridEditData, variationAddData, variationEditData } from '../../type/services/loja-integrada'

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
    * LojaIntegrada constructor
    * @constructor
    * @param {string} ApiKey Chave de Api
    * @param {string} AppKey Chave de Aplicacao
    * @param {boolean} DesBug Chave de Aplicacao
    * @return {class}
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

    /**
     * Get All Products
     * @param {number} limit
     * @param {number} offset
     * @param {boolean} description_html [Para retornar a descrição é necessário passar: true]
     * @param {boolean} ativo
     * @param {'criacao' | 'modificacao'} data_type
     * @param {'__lt' | '__lte'  | '__gt' | '__gte'} data_filter
     * @param {string} data_value
     * @return {Promise<object>} 
     */
    public getProducts(limit:number = 20, offset:number = 0, description_html:boolean = false, ativo:boolean = true, data_type: 'criacao' | 'modificacao' | '' = '', data_filter:'__lt' | '__lte'  | '__gt' | '__gte' = '__lt', data_value:string = ''): Promise<object> { 
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
                    .then((response: { json: () => object }) => response.json())
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
    // getProductById
    public getProductById(ProductId:number) { 
        return new Promise(async (resolve, reject) => {
            try {
                await fetch(new URL(`${this.ApiUrl}/produto/${ProductId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then((result: unknown) => {
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
    // getProductBySKU
    public getProductBySKU(ProducSKU:string) { 
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
                    .then((result: unknown) => {
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
    // getProductBySKU
    public addProduct(ProductData:productAddData) { 
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
                    .then(function (result: unknown) {
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
    // getProductBySKU
    public editProduct(ProductId:number, ProductData:productEditData) { 
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
                    .then(function (result: unknown) {
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
     * @return {Promise} Promise object json
     */
    public getCategories(limit:number = 20, offset:number = 0): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new URLSearchParams({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await fetch(new URL(`${this.ApiUrl}/categoria?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: any) {
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
     * Get For List Categories
     * Shows details
     * 
     * @return {Promise} Promise object json
     */
     public getListCategories(CategoryIds:categoryDataIds) {
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
                    .then(function (result: unknown) {
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
    * Shows details Category
    *
    * @param {number} CategoryId
    * @return {Promise} Promise object json
    */
    public getCategory(CategoryId:number) {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/categoria/${CategoryId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: unknown) {
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
    * Add Category
    * 
    * @param categoryAddData CategoryData
    * @return {Promise} Promise object json
    */
    public addCategory(CategoryData:categoryAddData) {
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
                    .then(function (result: unknown) {
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
    * 
    * @param {number} CategoryId
    * @param categoryEditData CategoryData
    * @return {Promise} Promise object json
    */
    public editCategory(CategoryId:number, CategoryData:categoryEditData) {
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
                    .then(function (result: unknown) {
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
    * @return {Promise} Promise object json
    */
    public getBrands(limit:number = 20, offset:number = 0): Promise<any> {
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
                    .then(function (result: any) {
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
     * @return {Promise} Promise object json
     */
    public getListBrands(BrandIds:brandDataIds) {
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
                    .then(function (result: unknown) {
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
    * @return {Promise} Promise object json
    */
    public getBrand(BrandId:number) {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/marca/${BrandId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: unknown) {
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
    * Add Brand
    * @param brandAddData BrandData
    * @return {Promise} Promise object json
    */
    public addBrand(BrandData:brandAddData) {
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
                    .then(function (result: unknown) {
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
    * @param brandEditData BrandData
    * @return {Promise} Promise object json
    */
    public editBrand(BrandId:number, BrandData:brandEditData) {
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
                    .then(function (result: unknown) {
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
    * @return {Promise} Promise object json
    */
     public getGrids(limit:number = 20, offset:number = 0): Promise<any> {
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
                    .then(function (result: any) {
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
    * @return {Promise} Promise object json
    */
    public getGridbyID(GridId:number) {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: unknown) {
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
    * Add Grid
    * @param gridAddData GridData
    * @return {Promise} Promise object json
    */
    public addGrid(GridData:gridAddData) {
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
                    .then(function (result: unknown) {
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
    * @param gridEditData GridData
    * @return {Promise} Promise object json
    */
    public editGrid(GridId:number, GridData:gridEditData) {
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
                    .then(function (result: unknown) {
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
     * Shows details
     *  
     * @param {number} GridId
     * @return {Promise} Promise object json
     */
     public getVariations(GridId:number) {
        return new Promise(async (resolve, reject) => {
            try {                
                await fetch(new URL(`${this.ApiUrl}/grades/${GridId}/variacao?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response: { json: () => any }) => response.json())
                    .then(function (result: unknown) {
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
    * Shows details Variation
    *
    * @param {number} VariationId
    * @return {Promise} Promise object json
    */
    /**
    * Add Variation
    * 
    * @param variationAddData VariationData
    * @return {Promise} Promise object json
    */
    public addVariation(GridId:number, VariationData:variationAddData) {
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
                    .then(function (result: unknown) {
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
    * @param variationEditData VariationData
    * @return {Promise} Promise object json
    */
    public editVariation(GridId:number, VariationId:number, VariationData:variationEditData) {
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
                    .then(function (result: unknown) {
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