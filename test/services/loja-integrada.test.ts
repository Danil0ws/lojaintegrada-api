import dotenv from 'dotenv'
// dotenv.config({ path: '../../test.env' })
dotenv.config()
import LojaIntegrada from '../../src/services/loja-integrada'

jest.setTimeout(30000)

describe('E2E LojaIntegrada', () => {
    const LI = new LojaIntegrada(`${process.env.APIKEY}`, `${process.env.APPKEY}`, false)
    describe('should Products', () => {
        it('should getProducts', () => {
            LI.getProducts(50, 1)
                .then(resp => {
                    expect(resp).toEqual(expect.objectContaining({
                        meta: [],
                        objects: []
                    }))
                }).catch(e => {
                    console.log(e)
                })
        })
        it('should get Product by Id', async () => {
            return LI.getProductById(101010)
                .catch(e => expect(e).toBeTruthy());
        });

        it('should get Product by SKU', async () => {
            return LI.getProductBySKU('JTC-TDV-CBS-2')
                .catch(e => expect(e).toBeTruthy());
        });

        // it()
    })
})