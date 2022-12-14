import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from "axios";
import Link from 'next/link';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var qs = require('qs');

export default function Home() {
  const [pokemons, setPokemons] = useState([])
  const [pokeDetails, setPokeDetails] = useState<Record<any, string | any>>({})

  const [show, setShow] = useState(false);

  const [comment, setComment] = useState("");


const onChange = (e:any) => {
  setComment(e.target.value,);
  };



  const handleClose = () => {
    setShow(false);
    setComment("")
  }
  const handleShow = async (pokeName:string) => {
    await axios.get("http://localhost:3000/favoris/"+pokeName)
      .then((res) => {
        setPokeDetails(res.data)
        setShow(true)

      })
  };


  const fetchPokemons = async () => {
    await axios.get("http://localhost:3000")
      .then((res) => {
        setPokemons(res.data.pokemon)
        console.log(res.data.pokemon)
      })
  }


  const addFavorites = async (data:any) => {
    var data = qs.stringify(data);
    var config = {
      method: 'post',
      url: 'http://localhost:3000/favoris',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      handleClose()
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  useEffect(() => {
    fetchPokemons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <div className={styles.container}>
      <Head>
        <title>MY Pokedex By Ismael</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container text-center mt-5 pt-5 ">
        <h1 className={styles.title + " my-5 pt-5"}>
          MY POKEDEX  - <Link href={"favoris"}>favoris</Link> 
        </h1>

        <div className="row">
          {pokemons.map((pokemon: any, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className='col-4 px-3 my-4  ' key={index}>
              {/* <Link href={`/pokemons/${pokemon.name}`}> */}
                <div className="card p-4 cursor-pointer"  onClick={()=> {
                  handleShow(pokemon.name)
                }} >
                  <h3>{pokemon.name}</h3>
                </div>

              {/* </Link> */}
            </div>
          ))}
        </div>

        <Modal show={show} onHide={handleClose}       size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Name :  {pokeDetails.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li>Level :  {pokeDetails.base_experience}</li>
              <li>hauteur :  {pokeDetails.height}</li>

            </ul>
          </Modal.Body>
          <Modal.Footer>
            <input type="text" className='form-control' onChange={e => onChange(e)}  placeholder='votre commentaire' />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={()=>{
              console.log( pokeDetails.sprites.other.dream_world)
              addFavorites({
                'name': pokeDetails.name,
                'level': pokeDetails.base_experience,
                'height': pokeDetails.height ,
                "image": pokeDetails.sprites.other.dream_world.front_default,
                "comment": comment
              })
            }}>
              Add To Favorites
            </Button>
          </Modal.Footer>
        </Modal>


      </main>
    </div>
  )
}
