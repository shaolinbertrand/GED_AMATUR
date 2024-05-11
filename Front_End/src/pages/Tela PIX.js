
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import '../styles/pages/listar.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

const listStyle = {
    boxShadow: '1px 3px 4px grey',
    borderRadius: '16px',
    margin:'10px',
    padding:'10px',
    background:"#ffd666"
     } 

const text = {
    fontWeight: "bold",
     textAlign:"center",
     fontSize: "0.8em",
     color: "#000000",
     marginLeft:'17px',
     marginRight:'17px',
     marginTop:'10px' 
    }    

     
 
function Adm(props){
        const [list, setList] = useState([]);
        useEffect(()=>{
            const options = {
                method: 'GET',
                url: 'https://api-pix.bb.com.br/pix/v2/pix',
                params: {
                  'gw-dev-app-key': 'e9592d76352e65a16fcd8e0787f940bb',
                  inicio: '2024-04-01T00:00:00.000Z',
                  fim: '2024-04-05T23:00:00.000Z'
                },
                headers: {
                  //cookie: '2e0e3f4453c76846fed2c2d099b8586d=804786f17a063e2c1c9d8e133d7b541f; 8569a51ef2f112382dc63b7c06364f8d=050b59072002b6986ac8b6e84356f0df',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer uQKVnMUcjirGyK65WUcyeaVcB0xxxgPOswaVoYZmq6tR_h5jYX_Wapp8HRPHgL9M1tkxBbB_7Ie8XUGT1T-ICw.1FZCRDq5HOdIR6lVdi-pL9Ns0A8zdv4PLDP-7kz1SGUsRfIzs3TQmKFfnqgjBQ9kwr2_EJegjfS1sWZWtnAT2qOBKT3wlIXoyr0n-K_cY58WlqtYP0sonBrWKNcQ8XJECcSIijNC7UBhdAPMYfAEibOmcrVeAazd-tbcsGg4qpyFrEhA-XuKY-ayDJ-nnDzy-Bd_QgZikNWGpRSz2uDP3kVREnCpzKwuA-6v3w8NUdeEzlCmobzlJrpivzGGyhveMHSir99wErdstOPFASDxmhGj06al-ZoALPxTuNhHaWRxXuxMtd0_DGmEchNFj9d1z1GbqEoKkaqJGwzLX7Ee5DXVQ0WnBzBnEuLcwnKUGt7d-12xgfhXCZiQg7JJhbYjdHHpULkmaj97natYeMEnoUxAswa-REHqabJ3u32tIT2DFoxAe1ESBgYrkYgJf6JqLUZ98VHBqTMzTobZkyKwSN_bBGxcCamTxkxyFBWmM9cAizxmbqPCKwMGLIvUi4N3MYuDsZTKPP_agU-PJ6upcOEGYra00A_lJmFAQ7wekjco0gvocRIJCa8HgZMF9_alLeqm4njC1kSNbui-CuSnKfbrr-9TS2wWBczPhYYEWtH7V0t0UH8cVwa1Qcgb4jQB4d7ckXMi0o4YTWKy5Yp1ZA0AtxJqR1aP_pfo1LxQCjCx8CcTrjYDXiwoqmOwRpBIe7vIBCvVvK7fyZZ5_i8MulbYcoK2RnIRK0FxIU35rbrw_G8MGzfzGbZ-7jqFM_ZYGdw9x3Peq3tUpwya6RgQVVVvWd2glr1iBioLNWoU8gCiXdYyg7rJ9Zz1tNOa7ChSnuRzBMvhuQP_tBH3HiAHBWKIsa-7x_Y1bMOqK7oXt7JlZ1meWfq2tGhI99r4yVUo5cdnpL9c59hoyHNK-BPLlnnPMWuF7DMyVxv56QBWpTSvTh5j_MDXmUKkaanIIbZ1C2AmWjaOSh_ObCbElV0B9BBQJyA2gtuTu6OIMdyOlfi8TFXueA8028l4WpJ1fbqjBuNY7ymwazxu8Shx3xRW606uPFqQors4jQeA3X9Cp64SEHpvoP72_loIedHfuddahFWv2siWaVaWM9361G2u7R1dvuNzk0NRjyvrz7BJFNI.HbXTBaZUyMLCIskv6UFjDNgcAX8F_HweIorGdxq_7M4-u-O9J0CUuUL5wCPUakRu3PGr1b7dE1xKl5prTRaamg'
                }
              };
              
              axios.request(options).then(function (response) {
                alert(response.data);
              }).catch(function (error) {
                console.error(error);
              });
        },[])
        console.log(props.id)
        return (
            <div id="page-list">
                <div className="list-form" >
                  <h2 >TELA PIX</h2> 
                        <div id="TableConsultaPix" className="tableConsultaPix">
                          <table border={1}>
                              <tr role = "row">
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Chave</th>
                                <th>ID</th>
                                <th>Data Hora</th>
                                <th>Valor</th>
                              </tr>
                            <tbody>
                              {list.map(PIX => (
                                <tr role="row">
                                  <td>{PIX.pagador.nome}</td>
                                  <td>{PIX.pagador.cpf}</td>
                                  <td>{PIX.chave}</td>
                                  <td>{PIX.id}</td>
                                  <td>{PIX.data}</td>
                                  <td>{PIX.valor}</td>
                                </tr>
                              ))}  
                            </tbody>
                          </table>
                       </div>                 
                  </div>
            </div>
        )   
        

};

export default Adm;