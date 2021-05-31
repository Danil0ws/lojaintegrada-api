import LojaIntegrada from './services/loja-integrada'
import dotenv from 'dotenv'

dotenv.config()

const LI = new LojaIntegrada(`${process.env.APIKEY}`, `${process.env.APPKEY}`)

LI.getShippings()
    .then((result:any) => {
        console.log(result)
    }).catch((err:any)  => {
        console.log(err)
    })  