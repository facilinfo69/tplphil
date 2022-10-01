
import { useEffect, useState } from "react";
import Case from "./Case";
import '../styles/Journee.css'

function Journees() {
  let [retour, setRetour] = useState(0);
  let [journees, setJournees] = useState(null);
  let [creneaux, setCreneaux] = useState(null);


  // recupere tous les post sera lancé à chaque fois que la variable retour sera mis à jour cad à chaque click sur le coeur dans le composant Like.
  useEffect(() => {

    let promesseJournees = recupererJournees();
    promesseJournees
      .then(function (valeur) {

        setJournees(valeur.journees);

      });

    let promesseCreneaux = recupererCreneaux();
    promesseCreneaux
      .then(function (valeur) {

        setCreneaux(valeur.creneaux);

      });


  }, [retour])

  console.log("journeeBdd", journees);
  console.log("creneauxBdd", creneaux);

  if (journees != null && creneaux != null) {
    journees.forEach(journee => {
      journee.creneauDetails = [];
      journee.creneaux.forEach(idcreneau => {
        let resultat = creneaux.find(el => el._id === idcreneau);
        journee.creneauDetails.push(resultat);
        console.log("resultat", resultat);
      })


    });

    return (
      <>
        {<ul className="journees">
          {journees.map((jour, index) => (
            <li key={jour._id}>
              <div className='journee'>
                <div className="intituleJournee">{jour.intitule}</div>

                <ul className="listeCreneaux">
                <div className="detailsCrenaux">
                  {jour.creneauDetails.map((cren, index) => (
                    
                    <li  key={cren._id}>
                      <div>
                        <span>{cren.intitule}</span>
                        <div><Case creneau={cren} /></div>
                      </div>
                    </li>
                   
                  ))}
                   </div>
                </ul>

              </div>
            </li>
          ))}
        </ul>}
      </>
    )
  } else {
    return (<div>loading</div>)
  }



  //fonction qui récupére tous les posts : objet Posts, admin true or false decodé
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

  //fonction qui récupére tous les journées : objet Journées, admin true or false decodé
  async function recupererCreneaux() {
    return fetch(`http://localhost:3000/api/creneau/`, {
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
}



export default Journees
