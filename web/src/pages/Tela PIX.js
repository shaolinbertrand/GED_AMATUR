
import api from "../services/api";
import React, {useEffect, useState} from 'react'
import {BiArchive} from 'react-icons/bi';
import {BsWrench} from 'react-icons/bs'
import {BiPaperclip} from  'react-icons/bi';
import { Link } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import '../styles/pages/CriarUser.css';

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
        const [user, setList] = useState([]);
        useEffect(()=>{
            const data = null;

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                console.log(this.responseText);
                }
            });

            xhr.open("GET", "https://api-pix.bb.com.br/pix/v2/pix?gw-dev-app-key=e9592d76352e65a16fcd8e0787f940bb&inicio=2024-04-20T00%3A00%3A00.000Z&fim=2024-04-23T23%3A00%3A00.000Z");
            xhr.setRequestHeader("cookie", "2e0e3f4453c76846fed2c2d099b8586d=804786f17a063e2c1c9d8e133d7b541f");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer u8AmFNNWMks9rIauoPXAJ7Z7oBDoGbh1cEg-WPwChbRFxQdp5HiI7lS3c5cTfrvHOa3yp6BLYVcWrQMuUsJ-5g.d-daU4o2xGogV34Jb490_fyyOqJAY7VJqtuzJTZfl-Iou7Zo-qwJ2JiUnMAkKEUI1gtTh3OwHF7fZvHH54z56AEIt52D8KSlWOyJ3OPJE-jVNlZJ5Ksff-ksf6x4aJT72BHaKRZgMYnCuBGjeuW4H-uQ4j0GtL7ga_VBTnar2VaTzHolyF8cAChvG5sUhHRmbnocYkD79fnIkBvukqrOK5dwhwM1ke9TWoCIvM1APZohchzepfeW6rT-LxKrPK2v6-NTqyKfyv1CAvp5nQMqpuqCKVhN1zeQ8ieuU5W5t3nViWwzgyzZ47y7LNaTcC_k-O6Q6Ae0vSfGrNJzjc-fAkiDsD8IvqBEesfOx04Jf8aq0bwKI5seT74YnIFiev_sEc180A3vEzuCslI5gyRWLrkgXqfPQrRbMOBF8YqRXssuU4L6hbmwMAr-L1o0zPwaE8pt-XMqAYi10c1hUpSJJjjEhIIZ2LtlB66TChsjNmUqCfR0QaDWmnu0dVv_gTb6-oOu3GO36em-N1lceP6EYmzKXb6m_eoY3Xz-N1x-VALQHp71Qi8yPyHg5Zbz_n74q3iesoUYZJSF_CvUjYT11lLoXtCAB8u53PG432AMVzC1kDXpzYDXLHTuMCXpItx7Xd0wyWsAqXvyDjQjcUB-QjFUs9pf0eb7Sw4-4NQPrPlAwq5Hh6GpUD-jftPPIS4P5uBOvHPTdMEqTyH_hrf7otIhNMzW_bFpTbn3ZPh3N4kezc6jMDM0l7c1gzq_ElPq5RzJNc4LfkXV2_qS7AW0v0Kh0n00Cajt3IZ3g6DbVM52IZuHbtjF1-mFJXocHE6Twh8wH9cPKWx-pAi3839gO_viLVZFiW8Y8gBATLX57DeteR6Ix5IEsoGScLEXevfyv2I0r-loaSLVzzvSI4J7Bmg9hzxhXCbbZTVJGrFdrBEI-__-kNkde2bJCEpirJqg9yV8DpBTDHXwexFyUBvRZuGjMkn7HXUC2sXwWQ0uriluc-5J6A86x_8UJQOKmL_eDOKuw7N6wgQKignDvVl_kAIye2QMeqQqXN0UjIEi_jcynAqCUDnSKt2ZQdoI3HqwLbNwD0tMZ7QRNO848ebFbgHXXf4LPxXqtpjzUj6aduk.i9G2djwdZU0cUZgSfv75oOlOR_CMZwDtpBSApwb-RxTJWJcAkjzySbTxfVZx_KR6_qee52aDfYpmwYEjjTbiNw");

            xhr.send(data).then((todo)=> setList(todo.data));
        },[])
        console.log(props.id)
        return (
            
            <div id="page-list">
                <Sidebar/>
                <div className="list-form" >
                  <h2 >TELA PIX</h2>
                  <ul>  
                {list.map(PIX => (
                        <div  className="lista"  >
                           
                            <span className="nome">{PIX.pagador.nome}</span>
                            <span>
                            <ul>
                                <li><span className="nome">{PIX.valor}</span></li>
                                <li><span className="nome">{PIX.horario}</span></li>
                            </ul>
                            </span>
                        
                           
                       </div>
                       ))}                  
                </ul>
                  </div>
               
            </div>
        )   
        

};

export default Adm;