import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { heroImages } from '../../helpers/heroImages';
import { getHeroesById } from '../../selectors/getHeroesById';




export const HeroScreen = ({history}) => {

    //hook que extrae parametros que vengan por la url
   const {heroeId} = useParams();

   const hero = useMemo(() => getHeroesById(heroeId), [heroeId])
    
   //Si el url no existe me redirecciona a Marvel.
   if( !hero ) {
       return <Redirect to="/" />
   }

   const handleReturn = () =>{
       //Perimite regresar atras en la navegación
       //la condicion dice que si ingresa directo con el link y quiere regresar atras lo regrese a la pag principal
       if(history.length <= 2) {
           history.push('/');
       }else {
           history.goBack();
       }
   }

   //Desestructuro lo que viene en hero
   const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
   } = hero;


    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    src={heroImages(`./${ heroeId }.jpg`).default}
                    alt={superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b> {alter_ego}</li>
                    <li className="list-group-item"><b>Publisher:</b> {publisher}</li>
                    <li className="list-group-item"><b>First appaearance:</b> {first_appearance}</li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>
                <button 
                    className="btn btn-outline-info"
                    //Invoco la funcion para que cuando haga click regrese atras en la navegacion
                    onClick= { handleReturn }
                >
                    Return
                </button>
            </div>
            
        </div>
    )
}
