import LojaIntegrada from './services/loja-integrada'
import dotenv from 'dotenv'

dotenv.config()
// dotenv.config({ path: './test.env' })

const LI = new LojaIntegrada(`${process.env.APIKEY}`, `${process.env.APPKEY}`)
// const LI = new LojaIntegrada(`${process.env.APIKEY}`, `${process.env.APPKEY}`, true)



LI.getProducts(10, 0, true, true, 'criacao', '__lt', '2021-05-05')
    .then((result:any) => {
        console.log(result)
    }).catch((err:any)  => {
        console.log(err)
    })  

// LI.addProduct(
//         {
//             sku: 'ddd',
//             nome: 'sandbox',
//             ativo: true,
//             destaque: false,
//             tipo: 'normal',
//             usado: false
//         }
//     )
//     .then(result => {
//         console.log(result)
//     }).catch(err => {
//         console.log(err)
//     })

// LI.addCoupon(
//         {
//             aplicar_no_total: false,
//             ativo: false,
//             codigo: "CUPOMTESTE12",
//             cumulativo: false,
//             descricao: "CUPOMTESTE12",
//             quantidade: 1,
//             quantidade_por_cliente: 1,
//             tipo: "fixo",
//             validade: "2020-10-20",
//             valor: "70.00"
//         }
//     )
//     .then(result => {
//         console.log(result)
//     }).catch(err => {
//         console.log(err)
//     });