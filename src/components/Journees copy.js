
import { useEffect, useState } from "react";
import Like from "./Like";
import Creneau from "./Creneau";
import '../styles/Posts.css'

function Journees() {
  let [journees, setJournees] = useState(null);
  let [retour, setRetour] = useState(0);
  let [adminBd, setAdmin] = useState('');
  let [creneau, setCreneau] = useState(null);

  // recupere tous les post sera lancé à chaque fois que la variable retour sera mis à jour cad à chaque click sur le coeur dans le composant Like.
  useEffect(() => {
    let promesseJournees = recupererJournees();
    promesseJournees
      .then(function (valeur) {
        setJournees(valeur.journees);
        setAdmin(valeur.admin);
      });
  }, [retour])

  //fonction qui récupére tous les journées : objet Journées, admin true or false decodé
  async function recupererJournees() {
    return fetch("http://localhost:3000/api/journee", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token') + ' ' + localStorage.getItem('admin')
      }
    })
      .then(function (res) {
        if (res.ok) { return res.json(); }
      })
      .then(function (value) {
        return value;
      })
      .catch(function (err) {
        // Une erreur est survenue
      });
  }


  //en attente du chargement : à prévoir un loading plus design !
  if (journees == null) {
    return (<div>loading</div>)
  } else {
    //classé les posts par date antéchronologique (du plus récent au plus ancien)
    // journees.sort(function (a, b) {
    //   return new Date(b.datePost) - new Date(a.datePost)
    // });

    journees.forEach(journee => {
      let admin = 'false';
      //verfier si il peut modifier et supprimer soit utilisateur a créé le post, soit administrateur
      if (adminBd === true) {
        admin = true;
      } else {
        admin = false;
      }

      journee.admin = admin;





    });

    console.log(journees);


    return (

      <>
        <ul className="gpm-posts">
          {journees.map((journee, index) => (

            <li key={journee._id}>
              <div className='gpm-card-post'>
                <div className="gpm-card titre">{journee.intitule}</div>
              </div>

              <ul>
                {creneaux.map((creneau) => (
                  <li key={cat}> <Creneau retour={retour} setRetour={setRetour} id={journee.creneaux} /></li>
                ))}
              </ul>



              <div className='bouton'>
                {/* composant Like coeur pour aimer et bouton modifier/supprimer si admin ou utilisateur qui a créé le post */}
                <Creneau retour={retour} setRetour={setRetour} id={journee.creneaux} />
              </div>


              <a className="bouton-ancre" href="#"><i className="fa-solid fa-circle-up"></i></a>

            </li>

          ))}
        </ul>
      </>)
  }
}


export default Journees
