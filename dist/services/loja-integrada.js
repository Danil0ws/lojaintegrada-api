"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _nodefetch = require('node-fetch'); var _nodefetch2 = _interopRequireDefault(_nodefetch);
var _url = require('url');


const ApiUrlProd = 'https://api.awsli.com.br/api/v1'
const ApiUrlTest = 'https://private-anon-f07889c886-lojaintegrada.apiary-mock.com/v1'
/**
 * Creates a new LojaIntegrada.
 * @class
 */
 class LojaIntegrada {
    
    
    
    
    /**
    * LojaIntegrada constructor
    * @constructor
    * @param {string} ApiKey Chave de Api
    * @param {string} AppKey Chave de Aplicacao
    * @param {boolean} DesBug Modo Produção ou Desenvolvimento
    * @return {class}
    */
    constructor(ApiKey, AppKey, DesBug = false) {
        this.ApiUrl = (DesBug == false) ? ApiUrlProd : ApiUrlTest
        this.ApiKey = (Array.isArray(ApiKey))? ApiKey[(Math.floor(Math.random() * ApiKey.length))] : ApiKey 
        this.AppKey = AppKey
        this.ApiParams = new (0, _url.URLSearchParams)({
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
     getProducts(limit = 20, offset = 0, description_html = false, ativo = true, data_type = '', data_filter = '__lt', data_value = '') { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams
                if (data_filter.length > 0) {
                    if (data_type == 'modificacao') { 
                        switch (data_filter) {
                            case '__lt':
                                addonsParams = new (0, _url.URLSearchParams)({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__lt: data_value
                                })
                                break;
                            case '__lte':
                                addonsParams = new (0, _url.URLSearchParams)({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__lte: data_value
                                })
                                break;
                            case '__gt':
                                addonsParams = new (0, _url.URLSearchParams)({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_modificacao__gt: data_value
                                })
                                break;
                            case '__gte':
                                addonsParams = new (0, _url.URLSearchParams)({
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
                                addonsParams = new (0, _url.URLSearchParams)({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__lt : data_value
                                })
                                break;
                            case '__lte':
                                addonsParams = new (0, _url.URLSearchParams)({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__lte: data_value
                                })
                                break;
                            case '__gt':
                                addonsParams = new (0, _url.URLSearchParams)({
                                    description_html: description_html.toString(),
                                    limit: limit.toString(),
                                    offset: offset.toString(),
                                    ativo: ativo.toString(),
                                    data_criacao__gt : data_value
                                })
                                break;
                            case '__gte':
                                addonsParams = new (0, _url.URLSearchParams)({
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
                    addonsParams = new (0, _url.URLSearchParams)({
                        description_html: description_html.toString(),
                        limit: limit.toString(),
                        offset: offset.toString()
                    })
                }
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/produto?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    // getProductById
     getProductById(ProductId) { 
        return new Promise(async (resolve, reject) => {
            try {
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/produto/${ProductId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then((result) => {
                        resolve(result)
                    })
                    .catch((err) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    // getProductBySKU
     getProductBySKU(ProducSKU) { 
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new (0, _url.URLSearchParams)({
                    sku: ProducSKU
                })
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/produto?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then((result) => {
                        resolve(result)
                    })
                    .catch((err) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    // getProductBySKU
     addProduct(ProductData) { 
        return new Promise(async (resolve, reject) => {
            try {
                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/produto?${this.ApiParams}`), {
                        method: 'POST',
                        body: JSON.stringify(ProductData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }
    // getProductBySKU
     editProduct(ProductId, ProductData) { 
        return new Promise(async (resolve, reject) => {
            try {
               
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/produto/${ProductId}?${this.ApiParams}`), {
                        method: 'POST',
                        body: JSON.stringify(ProductData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     getCategories(limit = 20, offset = 0) {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new (0, _url.URLSearchParams)({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/categoria?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
      getListCategories(CategoryIds) {
        return new Promise(async (resolve, reject) => {
            try {
                let CategoryIdsString = CategoryIds.join(';')
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/categoria/set/${CategoryIdsString}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     getCategory(CategoryId) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/categoria/${CategoryId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     addCategory(CategoryData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/categoria?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(CategoryData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     editCategory(CategoryId, CategoryData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/categoria/${CategoryId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(CategoryData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     getBrands(limit = 20, offset = 0) {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new (0, _url.URLSearchParams)({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/marca?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     getListBrands(BrandIds) {
        return new Promise(async (resolve, reject) => {
            try {
                let BrandIdsString = BrandIds.join(';')
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/marca/set/${BrandIdsString}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     getBrand(BrandId) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/marca/${BrandId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     addBrand(BrandData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/marca?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(BrandData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     editBrand(BrandId, BrandData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/marca/${BrandId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(BrandData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
      getGrids(limit = 20, offset = 0) {
        return new Promise(async (resolve, reject) => {
            try {
                let addonsParams = new (0, _url.URLSearchParams)({
                    limit: limit.toString(),
                    offset: offset.toString()
                })
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades?${this.ApiParams}&${addonsParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     getGridbyID(GridId) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades/${GridId}?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     addGrid(GridData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(GridData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     editGrid(GridId, GridData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades/${GridId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(GridData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
      getVariations(GridId) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades/${GridId}/variacao?${this.ApiParams}`), {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     addVariation(GridId, VariationData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades/${GridId}/variacao?${this.ApiParams}`), {
                    method: 'POST',
                    body: JSON.stringify(VariationData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
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
     editVariation(GridId, VariationId, VariationData) {
        return new Promise(async (resolve, reject) => {
            try {                
                await _nodefetch2.default.call(void 0, new (0, _url.URL)(`${this.ApiUrl}/grades/${GridId}/variacao/${VariationId}?${this.ApiParams}`), {
                    method: 'PUT',
                    body: JSON.stringify(VariationData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch((err) => {
                        new Error(err)
                    })
            } catch (error) {
                reject(error)
            }
        })
    }

} exports.default = LojaIntegrada;