import LojaIntegrada from './services/loja-integrada'
import dotenv from 'dotenv'

dotenv.config({ path: './test.env' })

const LI = new LojaIntegrada(`${process.env.APIKEY}`, `${process.env.APPKEY}`, true)

LI.getProducts(10, 0, true, true)
    .then((result:any) => {
        console.log(result)
    }).catch((err:any)  => {
        console.log(err)
    })