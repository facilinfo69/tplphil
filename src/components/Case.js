function Case(props) {
    let {creneau} = props;
    let tabCase = new Array();

    for (let index = 0; index < creneau.nbPersonnes; index++) {
        


        tabCase.push(null);
        
    }

    for (let index = 0; index < creneau.usersInscrit.length; index++) {
            
       tabCase.splice(index,1,creneau.usersInscrit[index]);
        
    }

    console.log(tabCase);
    


    return (
        <>
            <ul className="listeCase">
                <div className="detailsCase">
                  {tabCase.map((cases, index) => (
                    
                    <li  key={`${cases}-${index}`}>
                     

                     
                        {cases == null ? <div className="vide"></div> : <div className="rempli"></div>}

                       
                     
                    </li>
                   
                  ))}
                   </div>
                </ul>

        </>
    )
}

export default Case