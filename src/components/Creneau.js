
import { useEffect, useState } from "react";
import '../styles/Posts.css'

function Creneau(props) {
  let { retour, setRetour, id } = props;
  let [creneautest, setCreneautest] = useState(null);
  let creneaux = new Array();
 

  id.forEach(creneau => {
   
    let promesseCreneau = recupererCreneau(creneau);
    promesseCreneau
      .then(function (valeur) {

       
        creneaux.push(valeur);
      });

  });

 





  //fonction qui récupére tous les journées : objet Journées, admin true or false decodé
  async function recupererCreneau(id) {
    return fetch(`http://localhost:3000/api/creneau/${id}`, {
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

  console.log("creneaux", creneaux);

  return (
    <>
      <ul className="gpm-card auteur">

        {creneaux.map((test, index) => (

          <li key={test._id}>

            <div className="gpm-card contenu">
              <span>{test.nbPersonnes}</span>
            </div>

          </li>

        ))}
      </ul>
    </>
  )
}


export default Creneau
