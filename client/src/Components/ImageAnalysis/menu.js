import React from 'react';
import Card from './Card'
import './menucss.css'
import image1 from './women-doctor.jpg'
import image2 from './poumon-scan1.jpg'
import image3 from './mamo1.jpg'
import image4 from './mamo2.jpg'
import image5 from './mamo3.jpg'

const Home = (props) => {
    return (
/*<article class="br2 ba dark-gray b--black-10 mv5 w-200 w-100-m w-100-l mw9 center">  
        <div className='root-home'>
            <div className='card-container br2 shadow-6'>
                <Card 
                    title='X-ray de la poitrine' 
                    description='Diagnostiquer la poitrine d’un patient en utilisant l’intelligence artificielle.' 
                    imgSrc={image1}
                    link='/chestclassifier' />
                <Card 
                    title='X-ray des poumons' 
                    description='Diagnostiquer les poumons d’un patient en utilisant l’intelligence artificielle' 
                    imgSrc={image2}
                    link='/ctclassifier' />
            </div>
        </div>

      </article>  */
<actu class="page-footer font-small mdb-color darken-4 pt-4">

<div class="container">



 <div class="col-md-5 dib">
<a href="/covid_chest">
 <article class="br3 ba dark-gray b--black-10 mv6 w-100 shadow-5 w-80-m w-30-l mw7 center row d-flex justify-content-center">
 
   <img src={image1} class="db w-100 br2 br--top" />
  <div class="pa3 ph3-ns pb3-ns">
    <div class="dt w-100 mt1">
      <div class="dtc">
        <h1 class="pa3 f7 f2-ns mv0"><strong>Radiographie du thorax (Covid19) </strong></h1>
      </div>
    </div>
    <p class="pw3 h4 justify">
      Diagnostiquer le thorax d’un patient en utilisant l’intelligence artificielle.
    </p>
  </div>
  </article>
  </a>
  </div>




   <div class="col-md-5 dib">
<a href="/covid_ct">
 <article class="br3 ba dark-gray b--black-10 mv6 w-100 shadow-5 w-80-m w-30-l mw7 center row d-flex justify-content-center">
 
   <img src={image2} class="db w-100 br2 br--top" />
  <div class="pa3 ph3-ns pb3-ns">
    <div class="dt w-100 mt1">
      <div class="dtc">
        <h1 class="pa3 f7 f2-ns mv0"><strong>Diagnostic des poumons (Covid19)</strong></h1>
      </div>
    </div>
    <p class="pw3 h4 justify">
      Diagnostiquer les poumons d’un patient en utilisant l’intelligence artificielle.
    </p>
  </div>
  </article>
  </a>
  </div>




  <div class="col-md-5 dib">
<a href="/mamo2">
 <article class="br3 ba dark-gray b--black-10 mv6 w-100 shadow-5 w-80-m w-30-l mw7 center row d-flex justify-content-center">
 
   <img src={image5} class="db w-100 br2 br--top" />
  <div class="pa3 ph3-ns pb3-ns">
    <div class="dt w-100 mt1">
      <div class="dtc">
        <h1 class="pa3 f7 f2-ns mv0"><strong>Diagnostic du cancer du sein (Mamographie)</strong></h1>
      </div>
    </div>
    <p class="pw3 h4 justify">
    Diagnostiquer le cancer su sein en utilisant l’intelligence artificielle et la mamographie.
    </p>
  </div>
  </article>
  </a>
  </div>






     <div class="col-md-5 dib">
<a href="/mamo1">
 <article class="br3 ba dark-gray b--black-10 mv6 w-100 shadow-5 w-80-m w-30-l mw7 center row d-flex justify-content-center">
 
   <img src={image4} class="db w-100 br2 br--top" />
  <div class="pa3 ph3-ns pb3-ns">
    <div class="dt w-100 mt1">
      <div class="dtc">
        <h1 class="pa3 f7 f2-ns mv0"><strong>Diagnostic du cancer (Histopathologie mammaire) </strong></h1>
      </div>
    </div>
    <p class="pw3 h4 justify">
      Diagnostiquer le cancer su sein en utilisant l’intelligence artificielle.
    </p>
  </div>
  </article>
  </a>
  </div>






</div>
</actu>












    );
}

export default Home;