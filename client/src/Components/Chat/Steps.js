import React from 'react';
import FetchLocation from "../FetchLocation";
import Hi from "../Hi";
import isAuthenticated, {getName} from "../../service/AuthService";
import DisplayFetchedLocation from "../DisplayFetchedLocation";
import DisplayUserEnteredCountryStateLocation from "../DisplayUserEnteredCountryStateLocation";
import DisplayUserEnteredLocation from "../DisplayUserEnteredLocation";
import DisplayFetchedCountryStateLocation from "../DisplayFetchedCountryStateLocation";
import axios from 'axios';
import QuestionAuthChecker from "../QuestionAuthChecker";
import sympt from './sympt.png';
import prev from './prev.png';
import CountrySearch from "../CountrySearch";
import DisplayCountryData from "../DisplayCountryData";



// const getCountryData = (countryName, steps) => {
//   let countryData = [...data].filter(s => s.Country_Region.toLowerCase() === countryName.toLowerCase());
//   return {
//     stateCount: countryData.length,
//     countryName: countryName,
//     info: countryData
//   };
// };

// const formatCountryData = (data) => {
//   console.log(data);
//   return `La dernière mise à jour a été effectuée le ${data.Last_Update}. Il ya  ${data.Confirmed} cas confirmés, ${data.Deaths} morts, ${data.Recovered} guéris et ${data.Active} cas actifs au ${data.Country_Region}.`;
// };

const trackBinaryQuestionAnswer = (value, questionIndex, steps, valueToReturn) => {
  if (isAuthenticated()) {
    console.log(value, questionIndex, steps, valueToReturn);
    const data = {
      question: steps[questionIndex].message,
      answer: value
    };
    axios.post('/api/question-answers', data, {headers: {Authorization: window.localStorage.getItem('authToken')}})
      .then(res => {
        console.log(res.data);
      }).catch(e => console.log(e));
  } else {
    window.location = '/auth/login';
  }
  return valueToReturn;
};

const trackResultQuestionAnswer = (value, question, valueToReturn) => {
  if (isAuthenticated()) {
    const data = {
      question: question,
      answer: value
    };
    axios.post('/api/question-answers', data, {headers: {Authorization: window.localStorage.getItem('authToken')}})
      .then(res => {
        console.log(res.data);
      }).catch(e => console.log(e));
  } else {
    window.location = '/auth/login';
  }
  return valueToReturn;
};


// const displayCountryInfo = (countryName, steps) => {
//   console.log(countryName, steps)
//   let countryData = getCountryData(countryName, steps);
//   if (countryData.stateCount === 0) {
//     return 'Pays introuvable. Veuillez saisir un nom de pays valide ...'
//   } else if (countryData.stateCount !== 1) {
//     return `Veuillez saisir le nom de votre état dans ${countryData.countryName}`;
//   }
//   return formatCountryData(countryData.info[0]);
// };

// const displayStateInfo = (stateName, steps) => {
//   let countryName = steps["12"].value;
//   let countryData = getCountryData(countryName, steps);
//   console.log(countryData);
//   let allStates = countryData.info.filter(state => state.Province_State.toLowerCase() === stateName.toLowerCase());
//   const currentState = allStates.pop();
//   let stateData = allStates.reduce((prev, cur) => {
//     return {
//       ...cur, Confirmed: cur.Confirmed + prev.Confirmed,
//       Recovered: cur.Recovered + prev.Recovered,
//       Active: cur.Active + prev.Active,
//       Deaths: cur.Deaths + prev.Deaths
//     }
//   }, currentState);
//   stateData = [stateData];
//   console.log(stateData);
//   if (stateData.length >= 1) {
//     return formatCountryData(stateData[0]);
//   }
//   return `Etat non trouvé ! Essayer encore...`;
// };

// const decideNextStepAfterCountry = (value, steps, index) => {
//   let countryName = steps[index].value;
//   let countryData = getCountryData(countryName, steps);
//   if (countryData.stateCount > 1) {
//     return 'fetchStateName';
//   } else if (countryData.stateCount === 1) {
//     return '13';
//   }
//   return '11';
// };

// const decideNextStepAfterState = (value, steps) => {
//   let stateName = steps["fetchStateName"].value;
//   let countryName = steps["12"].value;
//   let countryData = getCountryData(countryName, steps);
//   let stateData = countryData.info.filter(state => state.Province_State.toLowerCase() === stateName.toLowerCase());
//   if (stateData.length === 0) {
//     return '11';
//   } else {
//     return '13';
//   }
// };



const steps = [
  {
    id: '0',
    component: <Hi/>,
  },

    {
      id: '1',
      message: 'Comment puis-je vous appeler ?',
      trigger: '2',
    },

    {
      id: '2',
      user: true,
      trigger: '3',
    },

{
      id: '3',
      message: 'Salut {previousValue}, Enchanté de vous connaitre !',
      trigger: '4',
    },

  {
    id: 'loggedInGreeting',
    message: ({previousValue, steps}) => `Enchanté de vous connaitre, ${getName()} !`,
    trigger: '4',
  },

    {
    id: '4',
    message: 'Veuillez cliquer sur l\'une des options suivante 👩‍⚕ :',
    trigger: '5',
  },


{
        id: '5',
        options: [

          { value: 1, label: 'Informations sur le coronavirus' , trigger: 'corona-menu' },
          { value: 2, label: 'Informations sur le cancer du sein' , trigger: 'cancer-sein-menu' },
        ],
},



{
        id: 'cancer-sein-menu',
        options: [

          { value: 1, label: 'Qu’est-ce que le cancer du sein?' , trigger: 'definition' },
          { value: 2, label: 'Type de cancer du sein' , trigger: 'typecancersein' },
          { value: 3, label: 'Les Symptomes du cancer du sein' , trigger: 'sympcancersein' },
          { value: 4, label: 'Depistage du cancer du sein' , trigger: 'depistcancersein' },
          { value: 5, label: 'Les causes du cancer du sein' , trigger: 'causecancersein' },

        ],
},





{
        id: 'corona-menu',
        options: [

          { value: 1, label: 'Informations sur le coronavirus au Gabon' , trigger: 'actugabon' },
          { value: 2, label: 'Questions fréquentes à propos du coronavirus' , trigger: 'Question-Covid' },
          { value: 3, label: 'Nombre de personnes infectées dans mon pays et dans le monde entier', trigger: '4001' },
          { value: 4, label: '🆘 Passer un dépistage en ligne 🆘', trigger: '16' },
          { value: 5, label: '💟 Evaluer votre taux de survie au Covid-19 💟', trigger: 'survi' },
        ],
},






{
        id: 'actugabon',
        options: [
          { value: 1, label: 'Informations sur le dépistage du coronavirus au Gabon' , trigger: 'depistage' },
          { value: 2, label: 'Retour au menu principal' , trigger: '5' },
        ],
},













{
        id: 'depistage',
        options: [
          { value: 1, label: 'Date du démarrage du dépistage' , trigger: 'depistage1' },
          { value: 2, label: 'Les villes dans lesquelles auront lieu le dépistage', trigger: 'depistage2' },
          { value: 3, label: 'Personnes éligibles au dépistage', trigger: 'depistage3' },
          { value: 4, label: 'A quoi consiste le dépistage ?', trigger: 'depistage4' },
          { value: 5, label: 'A quand les resultats du dépistage ?', trigger: 'depistage5' },
          { value: 6, label: 'Retour au menu information' , trigger: 'actugabon' },
          { value: 7, label: 'Retour au menu principal' , trigger: '5' },
        ],
},


   {
    id: 'suitedepist',
    message: 'Voulez vous en savoir plus à propos du dépistage ou revenir au menu principal',
    trigger: 'suite2depist',
  },


  {
        id: 'suite2depist',
        options: [
          { value: 1, label: 'Dépistage' , trigger: 'depistage' },
          { value: 2, label: 'Menu principal', trigger: '5' },
          ],
  },



    {
      id: 'depistage1',
      message: 'Le 17 Avril 2020',
      trigger: 'suitedepist',
    },







    {
    id: 'depistage2',
    component: (
     <div className='response'>

       <strong>Le dépistage aura lieu à Libreville et à Bitam</strong>
       <p>
       <strong>Sites de dépistage a Libreville :</strong> 
       <ul>
         <li>Les CHU</li>
         <li>Les hôpitaux d’instruction des armées</li>
         <li>Le centre d’action sanitaire et sociale et les infirmeries militaires.</li>
       </ul> 
       </p>
       <p>A ces structures sanitaires publiques, s’ajoutent huit (8) unités de dépistage mobiles et quinze (15) établissements sanitaires privés identifiés pour une meilleure couverture du grand Libreville.</p>


       <p><strong>Sites de dépistage a Bitam :</strong></p>
       <p>Concernant la ville de Bitam, le Centre médical est retenu pour le dépistage et d’autres sites pourront être ouverts en cas de nécessité.</p>
      
     </div>
      ),
    trigger: 'suitedepist',
  },


  {
    id: 'depistage3',
    component: (
     <div className='response'>

       <strong>Personnes éligibles au dépistage : </strong>
       <p>
        
        <ul>
          <li>Toutes les personnes ayant effectué un voyage à l’étranger entre le 1er et le 19 mars 2020</li>
          <li>Toutes les personnes ayant été en contact avec un sujet atteint du Covid-19 </li>
          <li>Les professionnels de santé</li>
          <li>Toutes personnes présentant une comorbidité telle que : l’hypertension artérielle, le diabète, l’insuffisance rénale et respiratoire, la drépanocytose, le VIH, l’hépatite, l’obésité…</li>
          <li>Toutes les personnes présentant une toux sèche, une fièvre, un mal de gorge, des difficultés respiratoires, de la fatigue et des céphalées</li>
          <li>Les personnes du troisième âge</li>
          <li>Les commerçants</li>
          <li>Les personnels des forces de défense et de sécurité</li>
          <li>Les transporteurs</li>
        </ul>

       </p>

       <p>En vue de se conformer aux mesures de confinement décidées par le gouvernement, il est recommandé aux intéressés d’appeler au 1410, le numéro vert gratuit, pour la prise de rendez-vous. Cette procédure a l’avantage de gérer les afflux importants que risquera de susciter l’opération de dépistage massif au niveau des différents sites retenus.</p>

     </div>
      ),
    trigger: 'suitedepist',
  },



    {
      id: 'depistage4',
      message: 'Le dépistage consiste à faire un prélèvement à l’aide d’une tige flexible dans le nez et la gorge du patient.',
      trigger: 'suitedepist',
    },


      {
      id: 'depistage5',
      message: 'Les résultats sont rendus dans les 24 à 48 heures par les équipes médicales des sites agréés.',
      trigger: 'suitedepist5',
    },




    {
      id: 'suitedepist5',
      message: 'En cas de résultat négatif, un second prélèvement est recommandé 14 jours plus tard.',
      trigger: 'suitedepist6',
    },

    {
      id: 'suitedepist6',
      message: 'Dans le cas où le résultat se révèle positif, le patient sera orienté dans une structure sanitaire agréée pour une prise en charge médicale.',
      trigger: 'suitedepist',
    },























{
        id: 'Question-Covid',
        options: [

          { value: 1, label: 'Qu’est ce que le Corona Virus ?' , trigger: '6' },
          { value: 2, label: 'Qu’est-ce que la COVID-19 ?', trigger: '7' },
          { value: 3, label: 'Quels sont les symptômes de la COVID-19 ?', trigger: '8' },
          { value: 4, label: 'Comment la COVID-19 se propage-t-elle ?', trigger: '9' },
          { value: 5, label: 'Comment puis-je me protéger et éviter que la maladie ne se propage ?', trigger: '10' },
          { value: 6, label: 'Le COVID-19 peut-il se transmettre par les excréments, les animaux sauvages ou les animaux domestiques ?' , trigger: 'Q1' },
          { value: 7, label: 'Le COVID-19 peut-il se transmettre par des surfaces infectées ou des emballages provenant de zones infectées ?', trigger: 'Q2' },
          { value: 8, label: 'Que dois-je faire si j’ai visité une zone où le COVID-19 se propage ?', trigger: 'Q3' },
          { value: 9, label: 'Quelles sont les options de traitement pour le COVID-19 (y compris les médicaments, les vaccins, les thérapies) ?', trigger: 'Q4' },
          { value: 10, label: 'Dois-je porter un masque pour me protéger ?', trigger: 'Q5' },
          { value: 11, label: 'Y a-t-il des choses que je ne devrais pas faire ?', trigger: 'Q6' },
          { value: 12, label: 'Retour au menu question' , trigger: 'Question-Covid' },
          { value: 13, label: 'Retour au menu principal' , trigger: '5' },
        ],
      },






  {
    id: 'Q1',
    component: (
     <div className='response'>

       <strong>🚽 Puis-je contracter la COVID-19 par contact avec les matières fécales d’une personne malade ?</strong>
       <p>Le risque de contracter la COVID-19 par contact avec les matières fécales d’une personne infectée paraît faible. Les premières investigations semblent indiquer que le virus peut être présent dans les matières fécales dans certains cas, mais la flambée ne se propage pas principalement par cette voie. L’OMS examine les travaux de recherche en cours sur la manière dont la COVID-19 se propage et elle continuera à communiquer les nouveaux résultats. Cependant, comme le risque existe, c’est une raison supplémentaire de se laver les mains régulièrement, après être allé aux toilettes et avant de manger.</p> 
     
       <strong>🐾 Les êtres humains peuvent-ils contracter la COVID-19 à partir d’une source animale ?</strong>
       <p>Les coronavirus sont une grande famille de virus couramment présents chez les chauves-souris et chez d’autres animaux. Occasionnellement ces virus infectent des êtres humains qui peuvent à leur tour propager l’infection. Ainsi, le SARS-CoV est associé aux civettes tandis que le MERS-CoV est transmis par les dromadaires. Les sources animales éventuelles de la COVID-19 n’ont pas encore été confirmées.</p> 
       <p>Pour se protéger, par exemple lorsque l’on va sur des marchés d’animaux vivants, il faut éviter le contact direct avec les animaux et les surfaces en contact avec les animaux et toujours respecter les règles relatives à la sécurité sanitaire des aliments. Il faut manipuler la viande crue, le lait et les abats avec précaution pour éviter de contaminer les aliments qui ne sont pas destinés à être cuits et il faut s’abstenir de consommer des produits d’origine animale crus ou mal cuits.</p>

       <strong>🐶 Mon animal domestique peut-il me transmettre la COVID-19 ?</strong>
       <p>Il y a eu un cas d’infection chez un chien à Hong Kong mais, à ce jour, rien ne prouve que les animaux de compagnie, tels que les chiens ou les chats, peuvent transmettre la COVID-19. La maladie se transmet principalement par les gouttelettes expulsées par les personnes infectées quand elles toussent, éternuent ou parlent. Pour vous protéger, lavez-vous les mains fréquemment et soigneusement.</p>
     </div>
      ),
    trigger: 'suite',
  },







  {
    id: 'Q2',
    component: (
     <div className='response'>

       <strong>Combien de temps le virus peut-il survivre sur les surfaces ?</strong>
       <p>On ne sait pas avec certitude combien de temps le virus responsable de la COVID-19 survit sur les surfaces mais il semble qu’il se comporte comme les autres coronavirus. Les études (et les informations préliminaires sur la COVID-19) tendent à montrer que les coronavirus peuvent persister sur les surfaces quelques heures à plusieurs jours. Ceci peut dépendre de différents paramètres (p. ex. le type de surface, la température ou l’humidité ambiante).</p>
       <p>Si vous pensez qu’une surface peut être infectée, nettoyez-la avec un désinfectant ordinaire pour tuer le virus, vous protéger et protéger les autres. Lavez-vous les mains avec une solution hydroalcoolique ou à l’eau et au savon. Évitez de vous toucher les yeux, la bouche ou le nez.</p>

       <strong>📦 Est-il sans danger de recevoir un colis d’une région où la COVID-19 a été signalée ?</strong>
       <p>Oui. La probabilité qu’une personne infectée contamine des marchandises est faible, tout comme le risque de contracter le virus responsable de la COVID-19 par contact avec un colis qui a été déplacé, qui a voyagé et qui a été exposé à différentes conditions et températures.</p>
    </div>
      ),
    trigger: 'suite',
  },







    {
    id: 'Q3',
    component: (
     <div className='response'>

       <strong>Que dois-je faire si j’ai visité une zone où la COVID-19 se propage ?</strong>
       <p>Si vous vous êtes récemment rendu (au cours des 14 derniers jours) dans des régions où la COVID-19 se propage, suivez les instructions décrites à la question 15. (Comment puis-je me protéger et éviter que la maladie ne se propage ?) et suivez les conseils présentés ci-dessus (Mesures de protection pour tous)</p>
       <p><strong>Si vous commencez à vous sentir mal et même si vous n’avez que des symptômes bénins (céphalées, légère fièvre (à partir de 37,3 °C) et écoulement nasal modéré), restez chez vous jusqu’à la guérison. </strong></p>
       

       <p>Si vous avez absolument besoin que quelqu’un vienne vous ravitailler ou si vous devez sortir, par exemple pour acheter à manger, portez un masque pour éviter d’infecter d’autres personnes.</p>
      
       <p>Pourquoi?</p>
       <p>Éviter d’entrer en contact avec d’autres personnes et de se rendre dans des établissements de santé permettra à ces établissements de fonctionner plus efficacement et vous protègera, ainsi que les autres personnes, de la COVID-19 et d’autres maladies virales.</p>
    
        
       <p><strong>🤒 En cas de fièvre, de toux et de difficultés respiratoires, consultez un médecin sans tarder, car il peut s’agir d’une infection respiratoire ou d’une autre affection grave. Appelez votre médecin et indiquez-lui si vous avez récemment voyagé ou été en contact avec des voyageurs.</strong></p>

       <p>Pourquoi?</p>
       <p>Si vous l’appelez, votre médecin pourra vous orienter rapidement vers l’établissement de santé le plus adapté. En outre, cela vous protègera et évitera la propagation de la COVID-19 et d’autres maladies virales.</p>
    </div>
      ),
    trigger: 'suite',
  },




  {
    id: 'Q4',
    component: (
     <div className='response'>

       <strong>Quelles sont les options de traitement pour la COVID-19 (y compris les médicaments, les vaccins, les thérapies) ?</strong>
       <p>💊 *Les antibiotiques sont-ils efficaces pour prévenir ou traiter la COVID-19 ? *
Non, les antibiotiques n’agissent pas contre les virus, mais seulement contre les infections bactériennes. La COVID-19 étant due à un virus, les antibiotiques sont inefficaces. Ils ne doivent pas être utilisés comme moyen de prévention ou de traitement de la COVID-19. Ils doivent être utilisés seulement sur prescription médicale pour traiter une infection bactérienne.</p>

      
      <strong>Existe-t-il des médicaments ou des thérapies permettant de prévenir ou de guérir la COVID-19 ?</strong>
      
      <p>Certains remèdes occidentaux, traditionnels ou domestiques peuvent apporter du confort et soulager les symptômes de la COVID-19 mais rien ne prouve que les médicaments actuels permettent de prévenir ou de guérir la maladie. L’OMS ne recommande de prendre aucun médicament, y compris les antibiotiques, en automédication pour prévenir ou guérir la COVID-19. Cependant, plusieurs essais cliniques de médicaments occidentaux ou traditionnels sont en cours. L’OMS fournira des informations actualisées dès que les résultats des essais cliniques seront disponibles.</p>


       <strong>💉 Existe-t-il un vaccin, un médicament ou un traitement contre la COVID-19 ?</strong>
       <p>Pas encore. Jusqu'à présent, il n'existe aucun vaccin et aucun médicament antiviral spécifique pour prévenir ou guérir la COVID-2019. Cependant, les personnes concernées devraient recevoir des soins pour soulager les symptômes. Les personnes gravement malades doivent être hospitalisées. La plupart des patients se rétablissent grâce aux soins de soutien.</p>
       <p>Des vaccins possibles et certains traitements médicamenteux spécifiques sont à l'étude. Ils sont testés dans le cadre d'essais cliniques. L'OMS coordonne ses efforts pour mettre au point des vaccins et des médicaments pour prévenir et traiter la COVID-19.</p>
       <p>La meilleure façon de se protéger et de protéger les autres contre la COVID-19 est de se laver fréquemment les mains, de se couvrir la bouche avec le pli du coude ou avec un mouchoir et de se tenir à une distance d’au moins un mètre de toute personne qui tousse ou qui éternue.</p>
     </div>
      ),
    trigger: 'suite',
  },












    {
    id: 'Q5',
    component: (
     <div className='response'>

       <strong>😷 Dois-je porter un masque pour me protéger ?</strong>
       <p>Il ne faut porter un masque que si on présente des symptômes de la COVID-19 (en particulier, la toux) ou si on s’occupe de quelqu’un susceptible d’être atteint de la maladie. Les masques jetables sont à usage unique. Si vous portez un masque alors que vous n’êtes pas malade ou que vous ne vous occupez pas de quelqu’un qui est malade, c’est du gaspillage. Comme il y a une pénurie mondiale de masques, l’OMS conseille de les utiliser avec parcimonie.</p>
       
      <p>L’OMS recommande de faire un usage rationnel des masques médicaux afin d’éviter le gaspillage de ressources précieuses et l’utilisation abusive (voir Conseils relatifs au port du masque).</p>


      <p>La meilleure façon de se protéger et de protéger les autres contre la COVID-19 est de se laver fréquemment les mains, de se couvrir la bouche avec le pli du coude ou avec un mouchoir et de se tenir à une distance d’au moins un mètre de toute personne qui tousse ou qui éternue. Pour plus d’informations, consulter les mesures de protection de base contre le nouveau coronavirus.</p>

       <strong>🗑 Comment mettre, utiliser, enlever et éliminer un masque ?</strong>

       <p>
       <ul>
           <li>Ne pas oublier que seuls les agents de santé, les personnes qui s’occupent de malades et les personnes qui présentent des symptômes respiratoires (fièvre et toux) doivent porter un masque</li>
           <li>Avant de mettre un masque, se laver les mains avec une solution hydroalcoolique ou à l’eau et au savon.</li>  
           <li>Vérifier que le masque n’est ni déchiré ni troué.</li>  
           <li>Orienter le masque dans le bon sens (bande métallique vers le haut).</li> 
           <li>Vérifier que la face colorée du masque est placée vers l’extérieur.</li>
           <li>Placer le masque sur le visage. Pincer la bande métallique ou le bord dur du masque afin qu’il épouse la forme du nez</li>
           <li>Tirer le bas du masque pour recouvrir la bouche et le menton.</li>
           <li>Après usage, retirer le masque, enlever les élastiques de derrière les oreilles tout en éloignant le masque du visage et des vêtements afin d’éviter de toucher des parties du masque éventuellement contaminées.</li>
           <li>Jeter le masque dans une poubelle fermée immédiatement après usage.</li>
           <li>Après avoir touché ou jeté le masque, se laver les mains avec une solution hydroalcoolique ou à l’eau et au savon si elles sont visiblement souillées.</li>
       </ul>
       </p>
       
     </div>
      ),
    trigger: 'suite',
  },






  {
    id: 'Q6',
    component: (
     <div className='response'>

       <strong>Y a-t-il des choses à ne pas faire ?</strong>
       <p>Les mesures ci-après NE SONT PAS efficaces contre la COVID-19 et peuvent même être dangereuses :</p>

      <p>
       <ul>
           <li>🚭 Fumer</li>
           <li>😷 Porter plusieurs masques</li>
           <li>💊 Prendre des antibiotiques</li>
       </ul>
       </p>
       <p>En tout état de cause, en cas de fièvre, de toux et de difficultés respiratoires, consulter un médecin sans tarder afin de limiter le risque de voir l’infection s’aggraver et lui indiquer si vous avez effectué des voyages récemment.</p>
     </div>
      ),
    trigger: 'suite',
  },














    {
    id: 'suite',
    message: 'Voulez vous poursuivre avec les questions ou revenir au menu principal',
    trigger: 'suite2',
  },


  {
        id: 'suite2',
        options: [
          { value: 1, label: 'Menu principal' , trigger: '5' },
          { value: 2, label: 'Plus de questions', trigger: 'Question-Covid' },
          ],
      },








    {
    id: 'suitec',
    message: 'Voulez vous poursuivre avec les questions ou revenir au menu principal',
    trigger: 'suitec2',
  },


  {
        id: 'suitec2',
        options: [
          { value: 1, label: 'Menu principal' , trigger: '5' },
          { value: 2, label: 'Plus de questions', trigger: 'cancer-sein-menu' },
          ],
      },












  {
    id: 'definition',
    component: (
        <div className="response"> {'Le cancer du sein est une tumeur maligne de la glande mammaire. Autrement dit, c\'est un cancer qui naît dans les unités cellulaires dont la fonction est de sécréter le lait, les unités ducto-lobulaires du sein, essentiellement chez la femme. 8 cancers du sein sur 10 se déclarent après 50 ans.'} </div>
      ),
    trigger: 'suitec',
  },






  {
    id: 'typecancersein',
    component: (
     <div className='response'>
       <p><strong>Afin de planifier le traitement optimal et d’augmenter les chances de réussite face à la maladie, il est important de définir le type de cancer du sein dont vous êtes atteint. La classification de votre cancer du sein se fera selon deux étapes, en déterminant le type de tumeur (dépendant de la région du sein atteinte) et en définissant le sous-type (c’est-à-dire le type de mutation à l’origine de la tumeur).</strong></p>
       <strong>Le carcinome canalaire in situ (CCIS)</strong>
       <p>Ce type de tumeur atteint les canaux lactifères du sein, c’est-à-dire les canaux qui transportent le lait depuis les glandes mammaires jusqu’au mamelon. Ce type de cancer est dit précoce car il est limité au sein lors du diagnostic.</p> 
     
       <strong>Le carcinome canalaire infiltrant (CCI)</strong>
       <p>Comme le CCIS, ce type de tumeur atteint les canaux lactifères mais il est plus invasif, c’est-à-dire qu’il va se propager et s’étendre jusqu’aux tissus mammaires. Il s’agit du cancer du sein le plus commun.</p> 
       
       <strong>Le carcinome lobulaire in situ (CLIS) </strong>
       <p>Des cellules anormales vont se développer dans les glandes mammaires qui produisent le lait dans le sein. Il ne s’agit pas d’une tumeur, mais ce type d’altération augmente les risques de développer un cancer par la suite.</p>

       <strong>Le carcinome lobulaire infiltrant (CLI) </strong>
       <p>Ce type de cancer est plus rare, il débute dans les glandes mammaires puis se propage aux autres tissus du sein.</p>

       <strong>Le cancer inflammatoire du sein </strong>
       <p>Il s’agit d’une forme rare de cancer du sein. Les symptômes sont généralement un sein rouge et enflé. Ce type de cancer est plutôt agressif et semble se développer de manière assez rapide, mais il reste rare.</p>
     </div>
      ),
    trigger: 'suitec',
  },










  {
    id: 'sympcancersein',
    component: (
     <div className='response'>
       <p><strong>On appelle symptômes d’une maladie, toute manifestation anormale provoquée par cette maladie. Les symptômes listés ci-dessous ne signifient pas nécessairement qu’il s’agit d’un cancer du sein. Mais si c’est le cas, il est important de le détecter le plus tôt possible. Il est donc recommandé de demander un avis médical dès que l’on repère une anomalie. Il ne faut pas attendre et ne négliger aucun signe inhabituel.</strong></p>
       <strong>UNE BOULE DANS UN SEIN</strong>
       <p>Une boule ou une masse dans un sein est le signe d’un cancer du sein le plus couramment observé. Cette masse, en général non douloureuse, est le plus souvent de consistance dure et présente des contours irréguliers. Elle apparaît par ailleurs comme « fixée » dans le sein.</p> 
     
       <strong>DES GANGLIONS DURS AU NIVEAU DE L’AISSELLE (SOUS LE BRAS)</strong>
       <p>Une ou plusieurs masse(s) dures à l'aisselle signifient parfois qu’un cancer du sein s’est propagé aux ganglions axillaires. Les ganglions restent toutefois indolores.</p> 
       
       <strong>DES MODIFICATIONS DE LA PEAU DU SEIN ET DU MAMELON</strong>
       <p>
       <ul>
           <li>Une modification de la peau : rétraction, rougeur, œdème ou aspect de peau d’orange ;</li>
           <li>une modification du mamelon ou de l’aréole (zone qui entoure le mamelon) : rétraction, changement de coloration, suintement ou écoulement</li>
           <li>des changements de forme de vos seins.</li>
       </ul>
       </p>

       <strong>UN CHANGEMENT DE LA TAILLE OU DE LA FORME DU SEIN</strong>
       <p>Une rougeur, un œdème et une chaleur importante au niveau du sein peuvent être le signe d'un cancer du sein inflammatoire.</p>

       <strong>LES AUTRES SYMPTÔMES</strong>
       <p>Si le cancer n’est pas diagnostiqué dès l’apparition des premiers symptômes, la tumeur peut grossir et se propager vers d'autres parties du corps, entraînant ainsi d’autres symptômes dits plus tardifs, tels que :</p>
      <p>
       <ul>
           <li>des douleurs osseuses ;</li>
           <li>des nausées, une perte d'appétit, une perte de poids et une jaunisse ;</li>
           <li>un essoufflement, une toux et une accumulation de liquide autour des poumons (épanchement pleural) ;</li>
           <li>des maux de tête, une vision double et une faiblesse musculaire.</li>
       </ul>
       </p>

     </div>
      ),
    trigger: 'suitec',
  },















    {
    id: 'depistcancersein',
    component: (
     <div className='response'>
       <p>Un examen clinique de vos seins (palpation) par un professionnel de santé est recommandé tous les ans dès l’âge de 25 ans.</p>

       <p>Si vous avez entre 50 et 74 ans et que vous n’avez ni symptôme, ni facteur de risque autre que votre âge, une mammographie tous les deux ans, complétée si nécessaire par une échographie, est recommandée. Dans la cadre du programme de dépistage organisé du cancer du sein, une deuxième lecture systématique des mammographies jugées normales est assurée, par sécurité, par un second radiologue expérimenté. Comme tout acte médical, le dépistage a des bénéfices mais aussi des limites. Il est important de s'informer avant de décider en connaissance de cause de réaliser un dépistage.</p> 
     
       <p>En cas de risque plus élevé, d’autres modalités de surveillance peuvent vous être proposées. Ce dossier d’information sur les modalités de dépistage et de suivi du cancer du sein ne remplace pas une consultation médicale avec un professionnel de santé qualifié.</p> 
       

     </div>
      ),
    trigger: 'suitec',
  },



















  {
    id: 'causecancersein',
    component: (
     <div className='response'>
       <p><strong>Le cancer du sein est une maladie multifactorielle. Cela signifie que plusieurs facteurs influent sur le risque de sa survenue. On parle de facteurs de risque.</strong></p>
       <p>On connaît aujourd'hui un certain nombre de facteurs de risque du cancer du sein même s’il existe encore des incertitudes quant à l’implication et au poids de plusieurs de ces facteurs.</p>
       <p>Une personne qui possède un ou plusieurs facteurs de risque peut ne jamais développer de cancer. Inversement, il est possible qu’une personne n'ayant aucun facteur de risque soit atteinte de ce cancer.</p> 
     
       <p>On distingue :</p> 
       
       <p>
       <ul>
           <li><strong>Les facteurs de risque lié à l’âge.</strong> En effet, près de 80% des cancers du sein se développent après 50 ans.</li>
           <li><strong>Les facteurs de risque liés à nos modes de vie</strong> tels que la consommation d’alcool et de tabac, un surpoids ou encore pas ou peu d’activité physique peuvent favoriser l’apparition d’un cancer du sein.</li>
           <li><strong>Les facteurs de risque liés à certains antécédents médicaux personnels et familiaux</strong></li>
       </ul>
       </p>

     <p>Outre le sexe (plus de 99% des cancers du sein touchent les femmes), les quatre principaux facteurs de risque de cancer du sein sont :</p>
     <p>
       <ul>
           <li>L'âge ;</li>
           <li>Les antécédents personnels de maladie (par exemple cancer du sein, de l'ovaire et/ou de l'endomètre) ;</li>
           <li>Les antécédents familiaux de cancers (sein, ovaire, ...) ;</li>
           <li>Les prédispositions génétiques au cancer du sein.</li>
       </ul>
       </p>

       <p>D’autres facteurs ont également été identifiés, ce sont :</p>
      <p>
       <ul>
           <li>Certains traitements hormonaux de la ménopause;</li>
           <li>La consommation de tabac;</li>
           <li>La consommation d’alcool et le surpoids;</li>
           <li>Peu ou pas d'activité physique.</li>
       </ul>
       </p>

     </div>
      ),
    trigger: 'suitec',
  },




























    {
    id: '4001',
    message: 'Veuillez saisir le nom de votre pays sur la barre de recherche suivante :',
    trigger: 'fetchCountryInputFromUser',
  },






  {
    id: '6',
    component: (
        <div className="response"> {'Les coronavirus forment une vaste famille de virus qui peuvent être pathogènes chez l’homme et chez l’animal. On sait que, chez l’être humain, plusieurs coronavirus peuvent entraîner des infections respiratoires dont les manifestations vont du simple rhume à des maladies plus graves comme le syndrome respiratoire du Moyen-Orient (MERS) et le syndrome respiratoire aigu sévère (SRAS). Le dernier coronavirus qui a été découvert est responsable de la maladie à coronavirus 2019 (COVID-19). '} </div>
      ),
    trigger: 'suite',
  },

  {
    id: '7',
    component: (
        <div className="response"> {'La COVID-19 est la maladie infectieuse causée par le dernier coronavirus qui a été découvert. Ce nouveau virus et cette maladie étaient inconnus avant l’apparition de la flambée à Wuhan (Chine) en décembre 2019.'}</div>
      ),
    trigger: 'suite',
  },

  {
    id: '8',
    component: (
        <div className="response"><p> Les symptômes les plus courants de la COVID-19 sont la fièvre, la fatigue et une toux sèche. Certains patients présentent des douleurs, une congestion nasale, un écoulement nasal, des maux de gorge ou une diarrhée. Ces symptômes sont généralement bénins et apparaissent de manière progressive. Certaines personnes, bien qu’infectées, ne présentent aucun symptôme et se sentent bien. La plupart (environ 80 %) des personnes guérissent sans avoir besoin de traitement particulier. Environ une personne sur six contractant la maladie présente des symptômes plus graves, notamment une dyspnée. Les personnes âgées et celles qui ont d’autres problèmes de santé (hypertension artérielle, problèmes cardiaques ou diabète) ont plus de risques de présenter des symptômes graves. Toute personne qui a de la fièvre, qui tousse et qui a des difficultés à respirer doit consulter un médecin.</p>
        <p className='chat'>
            <img src={sympt} alt="sympt"/>
         </p>
        </div>

      ),
    trigger: 'suite',
  },

  {
    id: '9',
    component: (
        <div className='response'><p>La COVID-19 est transmise par des personnes porteuses du virus. La maladie peut se transmettre d’une personne à l’autre par le biais de gouttelettes respiratoires expulsées par le nez ou par la bouche lorsqu’une personne tousse ou éternue. Ces gouttelettes peuvent se retrouver sur des objets ou des surfaces autour de la personne en question. On peut alors contracter la COVID-19 si on touche ces objets ou ces surfaces et si on se touche ensuite les yeux, le nez ou la bouche. Il est également possible de contracter la COVID-19 en inhalant des gouttelettes d’une personne malade qui vient de tousser ou d’éternuer. C’est pourquoi il est important de se tenir à plus d’un mètre d’une personne malade.

L’OMS examine les travaux de recherche en cours sur la manière dont la COVID-19 se propage et elle continuera à communiquer les résultats actualisés.</p>


        <p>
            <ul>
              <li>Le virus responsable de la COVID-19 est-il transmissible par voie aérienne ?</li>
            </ul>
        Les études menées à ce jour semblent indiquer que le virus responsable de la COVID-19 est principalement transmissible par contact avec des gouttelettes respiratoires, plutôt que par voie aérienne. Voir la réponse à la question précédente, « Comment le COVID-19 se propage-t-elle ? »
         </p>


        <p>
            <ul>
              <li>Peut-on contracter la COVID-19 au contact d’une personne qui ne présente aucun symptôme ?</li>
            </ul>
        La maladie se propage principalement par les gouttelettes respiratoires expulsées par les personnes qui toussent. Le risque de contracter la COVID-19 au contact d’une personne qui ne présente aucun symptôme est très faible. Cependant, beaucoup de personnes atteintes ne présentent que des symptômes discrets. C’est particulièrement vrai aux premiers stades de la maladie. Il est donc possible de contracter la COVID-19 au contact d’une personne qui n’a, par exemple, qu’une toux légère mais qui ne se sent pas malade.
         </p>


         <p>
            <ul>
              <li>Puis-je contracter la COVID-19 par contact avec les matières fécales d’une personne malade ?</li>
            </ul>
        Le risque de contracter la COVID-19 par contact avec les matières fécales d’une personne infectée paraît faible. Les premières investigations semblent indiquer que le virus peut être présent dans les matières fécales dans certains cas, mais la flambée ne se propage pas principalement par cette voie.
         </p>

        </div>


      ),
    trigger: 'suite',
  },


  {
    id: '10',
     component: (
        <div className='response'>
        <p>
            <ul>
              <li>Se laver fréquemment et soigneusement les mains avec une solution hydroalcoolique ou à l’eau et au savon.</li>
              <li>Maintenir une distance d’au moins un mètre avec les autres personnes qui toussent ou qui éternuent.</li>
              <li>Éviter de se toucher les yeux, le nez et la bouche.</li>
              <li>Veillez à respecter les règles d’hygiène respiratoire et à ce que les personnes autour de vous en fassent autant. En cas de toux ou d’éternuement, il faut se couvrir la bouche et le nez avec le pli du coude, ou avec un mouchoir et jeter le mouchoir immédiatement après.</li>
              <li>Si vous ne vous sentez pas bien, restez chez vous. En cas de fièvre, de toux et de dyspnée, consultez un médecin après l’avoir appelé. Suivez les instructions des autorités sanitaires locales.</li>
            </ul>
         </p>

        <p className='chat'>
            <img  src={prev} alt="prev"/>
         </p>
        </div>


      ),
    trigger: 'suite',
  },










{
     id: 'survi',
    message: 'Avant de commencer veuillez noter qu’il ne s’agit que d’une estimation et non d’une évaluation absolue des effets que la maladie covid-19 pourrait avoir sur vous. Avez vous compris ?',
    trigger: '18sur',
  },

  {
        id: '18sur',
        options: [
          { value: 1, label: 'Oui' , trigger: 'suivi01' },
          { value: 2, label: 'Non ', trigger: '13' },
        ],
  },


 {
     id: 'suivi01',
    message: 'Choisissez votre tranche d’âge:',
    trigger: 'survimenu',
  },


{
        id: 'survimenu',
        options: [
      {value: '<18', label: '<18', trigger: 'survi18' },
      {value: '18-39', label: '18-39', trigger: 'survi39' },
      {value: '40-59', label: '40-59', trigger: 'survi59' },
      {value: '60-79', label: '60-79', trigger: 'survi79' },
      {value: '>80', label: '>80', trigger: 'survi89' },
    ],
  },



















//====================MAN AGE 18====================================//

{
     id: 'survi18',
    message: 'Quel est votre genre ?',
    trigger: 'survi18T',
  },

  {
        id: 'survi18T',
        options: [
          { value: 'M', label: 'M' , trigger: 'survi18M1' },
          { value: 'F', label: 'F ', trigger: 'Fsurvi18M1' },
        ],
  },


 {
     id: 'survi18M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'survi18T11',
  },

  {
        id: 'survi18T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18M2' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO1' },
        ],
  },




   {
     id: 'survi18M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi18M22',
  },

  {
        id: 'survi18M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18M3' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO2' },
        ],
  },

  {
     id: 'survi18M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi18M33',
  },

  {
        id: 'survi18M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18M4' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO3' },
        ],
  },


  {
     id: 'survi18M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18M44',
  },

  {
        id: 'survi18M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18M5' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO4' },
        ],
  },


  {
     id: 'survi18M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18M55',
  },

  {
        id: 'survi18M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18M6' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO5' },
        ],
  },



  {
    id: 'survi18M6',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>11,09%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi18MNO5',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,48%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi18MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO402m',
  },

  {
        id: 'survi18MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO402m02' },
        ],
  },



  {
    id: 'survi18MNO402m01',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,34%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi18MNO402m02',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,73%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'survi18MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO3002',
  },

  {
        id: 'survi18MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO30022' },
        ],
  },


  {
     id: 'survi18MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO3002102',
  },

  {
        id: 'survi18MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO30021022' },
        ],
  },



  {
    id: 'survi18MNO30021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,29%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi18MNO30021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,63%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'survi18MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO3002203',
  },

  {
        id: 'survi18MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO300220302' },
        ],
  },



  {
    id: 'survi18MNO300220301',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,49%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi18MNO300220302',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,88%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'survi18MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi18MNO202c',
  },

  {
        id: 'survi18MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO20202' },
        ],
  },


  {
     id: 'survi18MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO2020102',
  },

  {
        id: 'survi18MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO20201022' },
        ],
  },


  {
     id: 'survi18MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO2020102102',
  },

  {
        id: 'survi18MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO20201021022' },
        ],
  },



  {
    id: 'survi18MNO20201021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>8,89%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi18MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,28%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'survi18MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO20201022002',
  },

  {
        id: 'survi18MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO202010220022' },
        ],
  },



  {
    id: 'survi18MNO202010220021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,14%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi18MNO202010220022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,58%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'survi18MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO2020202',
  },

  {
        id: 'survi18MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO20202022' },
        ],
  },


  {
     id: 'survi18MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO2020202102',
  },

  {
        id: 'survi18MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO20202021022' },
        ],
  },



  {
    id: 'survi18MNO20202021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,03%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi18MNO20202021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,28%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'survi18MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO2020202202',
  },

  {
        id: 'survi18MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO20202022021b' },
        ],
  },



  {
    id: 'survi18MNO20202022021c',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,29%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi18MNO20202022021b',
    component: (
     <div className='response green'>

      
       <p>Vous avez <strong>3,67%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'survi18MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi18MNO11',
  },

  {
        id: 'survi18MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO112' },
        ],
  },

  {
     id: 'survi18MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi18MNO11102',
  },

  {
        id: 'survi18MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO111022' },
        ],
  },


  {
     id: 'survi18MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO11102102',
  },


  {
        id: 'survi18MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO1110210212' },
        ],
  },


  {
     id: 'survi18MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO11102102102',
  },

  {
        id: 'survi18MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO111021021022' },
        ],
  },



  {
    id: 'survi18MNO111021021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7.78%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi18MNO111021021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6.16%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'survi18MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO111021021202',
  },

  {
        id: 'survi18MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO1110210212022' },
        ],
  },



  {
    id: 'survi18MNO1110210212021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6.02%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi18MNO1110210212022',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4.41%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'survi18MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO11102202',
  },


  {
        id: 'survi18MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO111022022' },
        ],
  },


  {
     id: 'survi18MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO11102202102',
  },

  {
        id: 'survi18MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO111022021022' },
        ],
  },



  {
    id: 'survi18MNO111022021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.91%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'survi18MNO111022021022',
    component: (
     <div className='response green'>

       <strong>Sans danger majeur</strong>
       <p>Vous avez <strong>4.30%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'survi18MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO11102202202',
  },

  {
        id: 'survi18MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO111022022022' },
        ],
  },



  {
    id: 'survi18MNO111022022021',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>4.16%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi18MNO111022022022',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>2.55%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'survi18MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi18MNO1122',
  },

  {
        id: 'survi18MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO11222' },
        ],
  },


  {
     id: 'survi18MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO1122102',
  },


  {
        id: 'survi18MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'survi18MNO11221022' },
        ],
  },


  {
     id: 'survi18MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO1122102101',
  },

  {
        id: 'survi18MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO11221021012' },
        ],
  },



  {
    id: 'survi18MNO11221021011',
    component: (
     <div className='response green'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.56%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi18MNO11221021012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>3.95%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi18MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO1122102201',
  },

  {
        id: 'survi18MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO11221022012' },
        ],
  },



  {
    id: 'survi18MNO11221022011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>3.81%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi18MNO11221022012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>2.20%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'survi18MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi18MNO1122201',
  },


  {
        id: 'survi18MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'survi18MNO11222012' },
        ],
  },


  {
     id: 'survi18MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO1122201101',
  },

  {
        id: 'survi18MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO11222011012' },
        ],
  },



  {
    id: 'survi18MNO11222011011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>3.71%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'survi18MNO11222011012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.10%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'survi18MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi18MNO1122201201',
  },

  {
        id: 'survi18MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi18MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'survi18MNO11222012012' },
        ],
  },



  {
    id: 'survi18MNO11222012011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>1.96%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi18MNO11222012012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>0.35%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



















//====================FEMME  AGE 18====================================//



 {
     id: 'Fsurvi18M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'fsurvi18T11',
  },

  {
        id: 'fsurvi18T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18M2' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO1' },
        ],
  },




   {
     id: 'fsurvi18M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi18M22',
  },

  {
        id: 'fsurvi18M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18M3' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO2' },
        ],
  },

  {
     id: 'fsurvi18M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi18M33',
  },

  {
        id: 'fsurvi18M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18M4' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO3' },
        ],
  },


  {
     id: 'fsurvi18M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18M44',
  },

  {
        id: 'fsurvi18M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18M5' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO4' },
        ],
  },


  {
     id: 'fsurvi18M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18M55',
  },

  {
        id: 'fsurvi18M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18M6' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO5' },
        ],
  },



  {
    id: 'fsurvi18M6',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,45%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi18MNO5',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,37%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi18MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO402m',
  },

  {
        id: 'fsurvi18MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO402m02' },
        ],
  },



  {
    id: 'fsurvi18MNO402m01',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,27%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi18MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,19%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'fsurvi18MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO3002',
  },

  {
        id: 'fsurvi18MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO30022' },
        ],
  },


  {
     id: 'fsurvi18MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO3002102',
  },

  {
        id: 'fsurvi18MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO30021022' },
        ],
  },



  {
    id: 'fsurvi18MNO30021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,20%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi18MNO30021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,12%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'fsurvi18MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO3002203',
  },

  {
        id: 'fsurvi18MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO300220302' },
        ],
  },



  {
    id: 'fsurvi18MNO300220301',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,03%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi18MNO300220302',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>3,88%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'fsurvi18MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi18MNO202c',
  },

  {
        id: 'fsurvi18MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO20202' },
        ],
  },


  {
     id: 'fsurvi18MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO2020102',
  },

  {
        id: 'fsurvi18MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO20201022' },
        ],
  },


  {
     id: 'fsurvi18MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO2020102102',
  },

  {
        id: 'fsurvi18MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO20201021022' },
        ],
  },



  {
    id: 'fsurvi18MNO20201021021',
    component: (
     <div className='response orange'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>5,97%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi18MNO20201021022',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4,89%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











{
     id: 'fsurvi18MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO20201022002',
  },

  {
        id: 'fsurvi18MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO202010220022' },
        ],
  },



  {
    id: 'fsurvi18MNO202010220021',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4,79%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi18MNO202010220022',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>3,71%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'fsurvi18MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO2020202',
  },

  {
        id: 'fsurvi18MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO20202022' },
        ],
  },


  {
     id: 'fsurvi18MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO2020202102',
  },

  {
        id: 'fsurvi18MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO20202021022' },
        ],
  },



  {
    id: 'fsurvi18MNO20202021021',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4,72%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi18MNO20202021022',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>3,64%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'fsurvi18MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO2020202202',
  },

  {
        id: 'fsurvi18MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO20202022021b' },
        ],
  },



  {
    id: 'fsurvi18MNO20202022021c',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>3,55%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi18MNO20202022021b',
    component: (
     <div className='response green'>

       <strong>Vous devriez aller bien</strong>
       <p>Vous avez <strong>2,47%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'fsurvi18MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi18MNO11',
  },

  {
        id: 'fsurvi18MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO112' },
        ],
  },

  {
     id: 'fsurvi18MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi18MNO11102',
  },

  {
        id: 'fsurvi18MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO111022' },
        ],
  },


  {
     id: 'fsurvi18MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO11102102',
  },


  {
        id: 'fsurvi18MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO1110210212' },
        ],
  },


  {
     id: 'fsurvi18MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO11102102102',
  },

  {
        id: 'fsurvi18MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO111021021022' },
        ],
  },



  {
    id: 'fsurvi18MNO111021021021',
    component: (
     <div className='response green'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.28%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi18MNO111021021022',
    component: (
     <div className='response green'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>4.16%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'fsurvi18MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO111021021202',
  },

  {
        id: 'fsurvi18MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO1110210212022' },
        ],
  },



  {
    id: 'fsurvi18MNO1110210212021',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4.02%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi18MNO1110210212022',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.96%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'fsurvi18MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO11102202',
  },


  {
        id: 'fsurvi18MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO111022022' },
        ],
  },


  {
     id: 'fsurvi18MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO11102202102',
  },

  {
        id: 'fsurvi18MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO111022021022' },
        ],
  },



  {
    id: 'fsurvi18MNO111022021021',
    component: (
     <div className='response green'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>3.97%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'fsurvi18MNO111022021022',
    component: (
     <div className='response green'>

       <strong>Sans danger majeur</strong>
       <p>Vous avez <strong>2.89%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'fsurvi18MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO11102202202',
  },

  {
        id: 'fsurvi18MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO111022022022' },
        ],
  },



  {
    id: 'fsurvi18MNO111022022021',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>2.80%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi18MNO111022022022',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>1.72%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'fsurvi18MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi18MNO1122',
  },

  {
        id: 'fsurvi18MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO11222' },
        ],
  },


  {
     id: 'fsurvi18MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO1122102',
  },


  {
        id: 'fsurvi18MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi18MNO11221022' },
        ],
  },


  {
     id: 'fsurvi18MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO1122102101',
  },

  {
        id: 'fsurvi18MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO11221021012' },
        ],
  },



  {
    id: 'fsurvi18MNO11221021011',
    component: (
     <div className='response green'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>3.74%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi18MNO11221021012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>2.66%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi18MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO1122102201',
  },

  {
        id: 'fsurvi18MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO11221022012' },
        ],
  },



  {
    id: 'fsurvi18MNO11221022011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>2.51%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi18MNO11221022012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>1.48%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'fsurvi18MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi18MNO1122201',
  },


  {
        id: 'fsurvi18MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi18MNO11222012' },
        ],
  },


  {
     id: 'fsurvi18MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO1122201101',
  },

  {
        id: 'fsurvi18MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO11222011012' },
        ],
  },



  {
    id: 'fsurvi18MNO11222011011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.49%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'fsurvi18MNO11222011012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>1.41%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'fsurvi18MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi18MNO1122201201',
  },

  {
        id: 'fsurvi18MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi18MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi18MNO11222012012' },
        ],
  },



  {
    id: 'fsurvi18MNO11222012011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>1.36%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi18MNO11222012012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>0.24%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },







































































//====================MAN AGE 39====================================//



{
     id: 'survi39',
    message: 'Quel est votre genre ?',
    trigger: 'survi39T',
  },

  {
        id: 'survi39T',
        options: [
          { value: 'M', label: 'M' , trigger: 'survi39M1' },
          { value: 'F', label: 'F ', trigger: 'fsurvi39M1' },
        ],
  },


 {
     id: 'survi39M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'survi39T11',
  },

  {
        id: 'survi39T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39M2' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO1' },
        ],
  },




   {
     id: 'survi39M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi39M22',
  },

  {
        id: 'survi39M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39M3' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO2' },
        ],
  },

  {
     id: 'survi39M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi39M33',
  },

  {
        id: 'survi39M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39M4' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO3' },
        ],
  },


  {
     id: 'survi39M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39M44',
  },

  {
        id: 'survi39M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39M5' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO4' },
        ],
  },


  {
     id: 'survi39M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39M55',
  },

  {
        id: 'survi39M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39M6' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO5' },
        ],
  },



  {
    id: 'survi39M6',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>14,27%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi39MNO5',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>12,20%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi39MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO402m',
  },

  {
        id: 'survi39MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO402m02' },
        ],
  },



  {
    id: 'survi39MNO402m01',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>12,02%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi39MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,95%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'survi39MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO3002',
  },

  {
        id: 'survi39MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO30022' },
        ],
  },


  {
     id: 'survi39MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO3002102',
  },

  {
        id: 'survi39MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO30021022' },
        ],
  },



  {
    id: 'survi39MNO30021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>11,88%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi39MNO30021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,81%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'survi39MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO3002203',
  },

  {
        id: 'survi39MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO300220302' },
        ],
  },



  {
    id: 'survi39MNO300220301',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,63%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi39MNO300220302',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,56%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'survi39MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi39MNO202c',
  },

  {
        id: 'survi39MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO20202' },
        ],
  },


  {
     id: 'survi39MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO2020102',
  },

  {
        id: 'survi39MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO20201022' },
        ],
  },


  {
     id: 'survi39MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO2020102102',
  },

  {
        id: 'survi39MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO20201021022' },
        ],
  },



  {
    id: 'survi39MNO20201021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>11,43%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi39MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,36%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'survi39MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO20201022002',
  },

  {
        id: 'survi39MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO202010220022' },
        ],
  },



  {
    id: 'survi39MNO202010220021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,18%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi39MNO202010220022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,11%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'survi39MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO2020202',
  },

  {
        id: 'survi39MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO20202022' },
        ],
  },


  {
     id: 'survi39MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO2020202102',
  },

  {
        id: 'survi39MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO20202021022' },
        ],
  },



  {
    id: 'survi39MNO20202021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,04%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi39MNO20202021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,97%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'survi39MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO2020202202',
  },

  {
        id: 'survi39MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO20202022021b' },
        ],
  },



  {
    id: 'survi39MNO20202022021c',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,79%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi39MNO20202022021b',
    component: (
     <div className='response green'>

       <strong>Vous devriez aller bien</strong>
       <p>Vous avez <strong>4,72%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'survi39MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi39MNO11',
  },

  {
        id: 'survi39MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO112' },
        ],
  },

  {
     id: 'survi39MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi39MNO11102',
  },

  {
        id: 'survi39MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO111022' },
        ],
  },


  {
     id: 'survi39MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO11102102',
  },


  {
        id: 'survi39MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO1110210212' },
        ],
  },


  {
     id: 'survi39MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO11102102102',
  },

  {
        id: 'survi39MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO111021021022' },
        ],
  },



  {
    id: 'survi39MNO111021021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9.99%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi39MNO111021021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7.92%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'survi39MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO111021021202',
  },

  {
        id: 'survi39MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO1110210212022' },
        ],
  },



  {
    id: 'survi39MNO1110210212021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7.74%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi39MNO1110210212022',
    component: (
     <div className='response orange'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>5.67%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'survi39MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO11102202',
  },


  {
        id: 'survi39MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO111022022' },
        ],
  },


  {
     id: 'survi39MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO11102202102',
  },

  {
        id: 'survi39MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO111022021022' },
        ],
  },



  {
    id: 'survi39MNO111022021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7.60%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'survi39MNO111022021022',
    component: (
     <div className='response orange'>

       <strong>Sans danger majeur</strong>
       <p>Vous avez <strong>5.54%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'survi39MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO11102202202',
  },

  {
        id: 'survi39MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO111022022022' },
        ],
  },



  {
    id: 'survi39MNO111022022021',
    component: (
     <div className='response orange'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>5.35%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi39MNO111022022022',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>3.29%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'survi39MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi39MNO1122',
  },

  {
        id: 'survi39MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO11222' },
        ],
  },


  {
     id: 'survi39MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO1122102',
  },


  {
        id: 'survi39MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'survi39MNO11221022' },
        ],
  },


  {
     id: 'survi39MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO1122102101',
  },

  {
        id: 'survi39MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO11221021012' },
        ],
  },



  {
    id: 'survi39MNO11221021011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7.15%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi39MNO11221021012',
    component: (
     <div className='response orange'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>5.08%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi39MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO1122102201',
  },

  {
        id: 'survi39MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO11221022012' },
        ],
  },



  {
    id: 'survi39MNO11221022011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>4.90%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi39MNO11221022012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>2.83%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'survi39MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO1122201',
  },


  {
        id: 'survi39MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'survi39MNO11222012' },
        ],
  },


  {
     id: 'survi39MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO1122201101',
  },

  {
        id: 'survi39MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO11222011012' },
        ],
  },



  {
    id: 'survi39MNO11222011011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4.77%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'survi39MNO11222011012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.70%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'survi39MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi39MNO1122201201',
  },

  {
        id: 'survi39MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi39MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'survi39MNO11222012012' },
        ],
  },



  {
    id: 'survi39MNO11222012011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.52%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi39MNO11222012012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>0.45%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },









































//====================FEMME AGE 39====================================//



 {
     id: 'fsurvi39M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'fsurvi39T11',
  },

  {
        id: 'fsurvi39T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39M2' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO1' },
        ],
  },




   {
     id: 'fsurvi39M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi39M22',
  },

  {
        id: 'fsurvi39M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39M3' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO2' },
        ],
  },

  {
     id: 'fsurvi39M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi39M33',
  },

  {
        id: 'fsurvi39M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39M4' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO3' },
        ],
  },


  {
     id: 'fsurvi39M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39M44',
  },

  {
        id: 'fsurvi39M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39M5' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO4' },
        ],
  },


  {
     id: 'fsurvi39M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39M55',
  },

  {
        id: 'fsurvi39M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39M6' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO5' },
        ],
  },



  {
    id: 'fsurvi39M6',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>10,62%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi39MNO5',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>9,08%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








 {
     id: 'fsurvi39MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO402m',
  },

  {
        id: 'fsurvi39MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO402m02' },
        ],
  },



  {
    id: 'fsurvi39MNO402m01',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>8,94%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi39MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,40%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'fsurvi39MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO3002',
  },

  {
        id: 'fsurvi39MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO30022' },
        ],
  },


  {
     id: 'fsurvi39MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO3002102',
  },

  {
        id: 'fsurvi39MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO30021022' },
        ],
  },



  {
    id: 'fsurvi39MNO30021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>8,88%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi39MNO30021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,30%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },









 {
     id: 'fsurvi39MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO3002203',
  },

  {
        id: 'fsurvi39MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO300220302' },
        ],
  },



  {
    id: 'fsurvi39MNO300220301',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7,17%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi39MNO300220302',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,63%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'fsurvi39MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi39MNO202c',
  },

  {
        id: 'fsurvi39MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO20202' },
        ],
  },


  {
     id: 'fsurvi39MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO2020102',
  },

  {
        id: 'fsurvi39MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO20201022' },
        ],
  },


  {
     id: 'fsurvi39MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO2020102102',
  },

  {
        id: 'fsurvi39MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO20201021022' },
        ],
  },



  {
    id: 'fsurvi39MNO20201021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>8,51%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi39MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,97%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'fsurvi39MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO20201022002',
  },

  {
        id: 'fsurvi39MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO202010220022' },
        ],
  },



  {
    id: 'fsurvi39MNO202010220021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,83%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi39MNO202010220022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,29%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'fsurvi39MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO2020202',
  },

  {
        id: 'fsurvi39MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO20202022' },
        ],
  },


  {
     id: 'fsurvi39MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO2020202102',
  },

  {
        id: 'fsurvi39MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO20202021022' },
        ],
  },



  {
    id: 'fsurvi39MNO20202021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>6,73%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi39MNO20202021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,19%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'fsurvi39MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO2020202202',
  },

  {
        id: 'fsurvi39MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO20202022021b' },
        ],
  },



  {
    id: 'fsurvi39MNO20202022021c',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5,06%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi39MNO20202022021b',
    component: (
     <div className='response green'>

       <strong>Vous devriez aller bien</strong>
       <p>Vous avez <strong>3,52%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'fsurvi39MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi39MNO11',
  },

  {
        id: 'fsurvi39MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO112' },
        ],
  },

  {
     id: 'fsurvi39MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi39MNO11102',
  },

  {
        id: 'fsurvi39MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO111022' },
        ],
  },


  {
     id: 'fsurvi39MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO11102102',
  },


  {
        id: 'fsurvi39MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO1110210212' },
        ],
  },


  {
     id: 'fsurvi39MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO11102102102',
  },

  {
        id: 'fsurvi39MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO111021021022' },
        ],
  },



  {
    id: 'fsurvi39MNO111021021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>7.44%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi39MNO111021021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.92%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











  {
     id: 'fsurvi39MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO111021021202',
  },

  {
        id: 'fsurvi39MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO1110210212022' },
        ],
  },



  {
    id: 'fsurvi39MNO1110210212021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.74%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi39MNO1110210212022',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>4.22%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'fsurvi39MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO11102202',
  },


  {
        id: 'fsurvi39MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO111022022' },
        ],
  },


  {
     id: 'fsurvi39MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO11102202102',
  },

  {
        id: 'fsurvi39MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO111022021022' },
        ],
  },



  {
    id: 'fsurvi39MNO111022021021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.66%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'fsurvi39MNO111022021022',
    component: (
     <div className='response green'>

       <strong>Sans danger majeur</strong>
       <p>Vous avez <strong>4.12%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'fsurvi39MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO11102202202',
  },

  {
        id: 'fsurvi39MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO111022022022' },
        ],
  },



  {
    id: 'fsurvi39MNO111022022021',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>3.99%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi39MNO111022022022',
    component: (
     <div className='response green'>

       <strong>Votre situation est contrôlable</strong>
       <p>Vous avez <strong>2.49%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'fsurvi39MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi39MNO1122',
  },

  {
        id: 'fsurvi39MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO11222' },
        ],
  },


  {
     id: 'fsurvi39MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO1122102',
  },


  {
        id: 'fsurvi39MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi39MNO11221022' },
        ],
  },


  {
     id: 'fsurvi39MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO1122102101',
  },

  {
        id: 'fsurvi39MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO11221021012' },
        ],
  },



  {
    id: 'fsurvi39MNO11221021011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>5.33%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi39MNO11221021012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>3.79%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },









 {
     id: 'fsurvi39MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO1122102201',
  },

  {
        id: 'fsurvi39MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO11221022012' },
        ],
  },



  {
    id: 'fsurvi39MNO11221022011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>3.65%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi39MNO11221022012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas si grave.</strong>
       <p>Vous avez <strong>2.11%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'fsurvi39MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO1122201',
  },


  {
        id: 'fsurvi39MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi39MNO11222012' },
        ],
  },


  {
     id: 'fsurvi39MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO1122201101',
  },

  {
        id: 'fsurvi39MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO11222011012' },
        ],
  },



  {
    id: 'fsurvi39MNO11222011011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>3.55%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'fsurvi39MNO11222011012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.01%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'fsurvi39MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi39MNO1122201201',
  },

  {
        id: 'fsurvi39MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi39MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi39MNO11222012012' },
        ],
  },



  {
    id: 'fsurvi39MNO11222012011',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>1.88%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi39MNO11222012012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>0.33%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },




















































//====================MAN AGE 59====================================//



{
     id: 'survi59',
    message: 'Quel est votre genre ?',
    trigger: 'survi59T',
  },

  {
        id: 'survi59T',
        options: [
          { value: 'M', label: 'M' , trigger: 'survi59M1' },
          { value: 'F', label: 'F ', trigger: 'fsurvi59M1' },
        ],
  },


 {
     id: 'survi59M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'survi59T11',
  },

  {
        id: 'survi59T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59M2' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO1' },
        ],
  },




   {
     id: 'survi59M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi59M22',
  },

  {
        id: 'survi59M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59M3' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO2' },
        ],
  },

  {
     id: 'survi59M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi59M33',
  },

  {
        id: 'survi59M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59M4' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO3' },
        ],
  },


  {
     id: 'survi59M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59M44',
  },

  {
        id: 'survi59M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59M5' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO4' },
        ],
  },


  {
     id: 'survi59M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59M55',
  },

  {
        id: 'survi59M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59M6' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO5' },
        ],
  },



  {
    id: 'survi59M6',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>84,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi59MNO5',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>71,81%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi59MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO402m',
  },

  {
        id: 'survi59MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO402m02' },
        ],
  },



  {
    id: 'survi59MNO402m01',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>70,75%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi59MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>58,56%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'survi59MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59MNO3002',
  },

  {
        id: 'survi59MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO30022' },
        ],
  },


  {
     id: 'survi59MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO3002102',
  },

  {
        id: 'survi59MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO30021022' },
        ],
  },



  {
    id: 'survi59MNO30021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>69,96%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi59MNO30021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>57,77%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'survi59MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO3002203',
  },

  {
        id: 'survi59MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO300220302' },
        ],
  },



  {
    id: 'survi59MNO300220301',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>56,71%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi59MNO300220302',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>44,52%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'survi59MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi59MNO202c',
  },

  {
        id: 'survi59MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO20202' },
        ],
  },


  {
     id: 'survi59MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59MNO2020102',
  },

  {
        id: 'survi59MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO20201022' },
        ],
  },


  {
     id: 'survi59MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO2020102102',
  },

  {
        id: 'survi59MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO20201021022' },
        ],
  },



  {
    id: 'survi59MNO20201021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>67,31%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi59MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>55,12%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'survi59MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO20201022002',
  },

  {
        id: 'survi59MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO202010220022' },
        ],
  },



  {
    id: 'survi59MNO202010220021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>54,06%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi59MNO202010220022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>41,87%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'survi59MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59MNO2020202',
  },

  {
        id: 'survi59MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO20202022' },
        ],
  },


  {
     id: 'survi59MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO2020202102',
  },

  {
        id: 'survi59MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO20202021022' },
        ],
  },



  {
    id: 'survi59MNO20202021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>53,26%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi59MNO20202021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>41,07%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'survi59MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO2020202202',
  },

  {
        id: 'survi59MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO20202022021b' },
        ],
  },



  {
    id: 'survi59MNO20202022021c',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>40,02%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi59MNO20202022021b',
    component: (
     <div className='response green'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>27,82%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'survi59MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi59MNO11',
  },

  {
        id: 'survi59MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO112' },
        ],
  },

  {
     id: 'survi59MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi59MNO11102',
  },

  {
        id: 'survi59MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO111022' },
        ],
  },


  {
     id: 'survi59MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59MNO11102102',
  },


  {
        id: 'survi59MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO1110210212' },
        ],
  },


  {
     id: 'survi59MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO11102102102',
  },

  {
        id: 'survi59MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO111021021022' },
        ],
  },



  {
    id: 'survi59MNO111021021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>58.83%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi59MNO111021021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>46.64%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'survi59MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO111021021202',
  },

  {
        id: 'survi59MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO1110210212022' },
        ],
  },



  {
    id: 'survi59MNO1110210212021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>45.58%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi59MNO1110210212022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>33.39%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'survi59MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59MNO11102202',
  },


  {
        id: 'survi59MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO111022022' },
        ],
  },


  {
     id: 'survi59MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO11102202102',
  },

  {
        id: 'survi59MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO111022021022' },
        ],
  },



  {
    id: 'survi59MNO111022021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>44.78%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'survi59MNO111022021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>32.59%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'survi59MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO11102202202',
  },

  {
        id: 'survi59MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO111022022022' },
        ],
  },



  {
    id: 'survi59MNO111022022021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>31.53%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi59MNO111022022022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>19.34%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'survi59MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi59MNO1122',
  },

  {
        id: 'survi59MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO11222' },
        ],
  },


  {
     id: 'survi59MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi39MNO1122102',
  },


  {
        id: 'survi59MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'survi59MNO11221022' },
        ],
  },


  {
     id: 'survi59MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO1122102101',
  },

  {
        id: 'survi59MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO11221021012' },
        ],
  },



  {
    id: 'survi59MNO11221021011',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>42.13%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi59MNO11221021012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>29.95%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi59MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO1122102201',
  },

  {
        id: 'survi59MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO11221022012' },
        ],
  },



  {
    id: 'survi59MNO11221022011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>28.88%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi59MNO11221022012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>16.70%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'survi59MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi59MNO1122201',
  },


  {
        id: 'survi59MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'survi59MNO11222012' },
        ],
  },


  {
     id: 'survi59MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO1122201101',
  },

  {
        id: 'survi59MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO11222011012' },
        ],
  },



  {
    id: 'survi59MNO11222011011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>28.09%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'survi59MNO11222011012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>15.90%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'survi59MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi59MNO1122201201',
  },

  {
        id: 'survi59MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi59MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'survi59MNO11222012012' },
        ],
  },



  {
    id: 'survi59MNO11222012011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>14.84%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi59MNO11222012012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.65%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },
















































//====================FEMME AGE 59====================================//




 {
     id: 'fsurvi59M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'fsurvi59T11',
  },

  {
        id: 'fsurvi59T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59M2' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO1' },
        ],
  },




   {
     id: 'fsurvi59M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi59M22',
  },

  {
        id: 'fsurvi59M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59M3' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO2' },
        ],
  },

  {
     id: 'fsurvi59M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi59M33',
  },

  {
        id: 'fsurvi59M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59M4' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO3' },
        ],
  },


  {
     id: 'fsurvi59M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59M44',
  },

  {
        id: 'fsurvi59M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59M5' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO4' },
        ],
  },


  {
     id: 'fsurvi59M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59M55',
  },

  {
        id: 'fsurvi59M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59M6' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO5' },
        ],
  },



  {
    id: 'fsurvi59M6',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>80,36%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi59MNO5',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>68,71%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi59MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO402m',
  },

  {
        id: 'fsurvi59MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO402m02' },
        ],
  },



  {
    id: 'fsurvi59MNO402m01',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>67,68%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi59MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>56,02%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'fsurvi59MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59MNO3002',
  },

  {
        id: 'fsurvi59MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO30022' },
        ],
  },


  {
     id: 'fsurvi59MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO3002102',
  },

  {
        id: 'fsurvi59MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO30021022' },
        ],
  },



  {
    id: 'fsurvi59MNO30021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>66,96%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi59MNO30021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>55,27%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'fsurvi59MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO3002203',
  },

  {
        id: 'fsurvi59MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO300220302' },
        ],
  },



  {
    id: 'fsurvi59MNO300220301',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>54,25%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi59MNO300220302',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>42,52%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'fsurvi59MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi59MNO202c',
  },

  {
        id: 'fsurvi59MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO20202' },
        ],
  },


  {
     id: 'fsurvi59MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59MNO2020102',
  },

  {
        id: 'fsurvi59MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO20201022' },
        ],
  },


  {
     id: 'fsurvi59MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO2020102102',
  },

  {
        id: 'fsurvi59MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO20201021022' },
        ],
  },



  {
    id: 'fsurvi59MNO20201021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>64,39%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi59MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>52,12%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'fsurvi59MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO20201022002',
  },

  {
        id: 'fsurvi59MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO202010220022' },
        ],
  },



  {
    id: 'fsurvi59MNO202010220021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>51,71%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi59MNO202010220022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>40,05%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'fsurvi59MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59MNO2020202',
  },

  {
        id: 'fsurvi59MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO20202022' },
        ],
  },


  {
     id: 'fsurvi59MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO2020202102',
  },

  {
        id: 'fsurvi59MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO20202021022' },
        ],
  },



  {
    id: 'fsurvi59MNO20202021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>50,95%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi59MNO20202021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>39,29%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'fsurvi59MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO2020202202',
  },

  {
        id: 'fsurvi59MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO20202022021b' },
        ],
  },



  {
    id: 'fsurvi59MNO20202022021c',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>38,28%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi59MNO20202022021b',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>26,62%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




















   {
     id: 'fsurvi59MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi59MNO11',
  },

  {
        id: 'fsurvi59MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO112' },
        ],
  },

  {
     id: 'fsurvi59MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi59MNO11102',
  },

  {
        id: 'fsurvi59MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO111022' },
        ],
  },


  {
     id: 'fsurvi59MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59MNO11102102',
  },


  {
        id: 'fsurvi59MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO1110210212' },
        ],
  },


  {
     id: 'fsurvi59MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO11102102102',
  },

  {
        id: 'fsurvi59MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO111021021022' },
        ],
  },



  {
    id: 'fsurvi59MNO111021021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>56.28%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi59MNO111021021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>44.62%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },






  {
     id: 'fsurvi59MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO111021021202',
  },

  {
        id: 'fsurvi59MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO1110210212022' },
        ],
  },



  {
    id: 'fsurvi59MNO1110210212021',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>43.60%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi59MNO1110210212022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>31.94%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },










 {
     id: 'fsurvi59MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59MNO11102202',
  },


  {
        id: 'fsurvi59MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO111022022' },
        ],
  },


  {
     id: 'fsurvi59MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO11102202102',
  },

  {
        id: 'fsurvi59MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO111022021022' },
        ],
  },



  {
    id: 'fsurvi59MNO111022021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est délicate</strong>
       <p>Vous avez <strong>42.84%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'fsurvi59MNO111022021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est délicate</strong>
       <p>Vous avez <strong>31.19%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'fsurvi59MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO11102202202',
  },

  {
        id: 'fsurvi59MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO111022022022' },
        ],
  },



  {
    id: 'fsurvi59MNO111022022021',
    component: (
     <div className='response red'>

       <strong>Votre situation est délicate</strong>
       <p>Vous avez <strong>30.17%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi59MNO111022022022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>18.51%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },












{
     id: 'fsurvi59MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi59MNO1122',
  },

  {
        id: 'fsurvi59MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO11222' },
        ],
  },


  {
     id: 'fsurvi59MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi39MNO1122102',
  },


  {
        id: 'fsurvi59MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi59MNO11221022' },
        ],
  },


  {
     id: 'fsurvi59MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO1122102101',
  },

  {
        id: 'fsurvi59MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO11221021012' },
        ],
  },



  {
    id: 'fsurvi59MNO11221021011',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>40.31%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi59MNO11221021012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>28.65%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },










 {
     id: 'fsurvi59MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO1122102201',
  },

  {
        id: 'fsurvi59MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO11221022012' },
        ],
  },



  {
    id: 'fsurvi59MNO11221022011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>27.63%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi59MNO11221022012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>15.97%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















   {
     id: 'fsurvi59MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi59MNO1122201',
  },


  {
        id: 'fsurvi59MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi59MNO11222012' },
        ],
  },


  {
     id: 'fsurvi59MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO1122201101',
  },

  {
        id: 'fsurvi59MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO11222011012' },
        ],
  },



  {
    id: 'fsurvi59MNO11222011011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>26.87%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'fsurvi59MNO11222011012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>15.21%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'fsurvi59MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi59MNO1122201201',
  },

  {
        id: 'fsurvi59MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi59MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi59MNO11222012012' },
        ],
  },



  {
    id: 'fsurvi59MNO11222012011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>14.20%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi59MNO11222012012',
    component: (
     <div className='response green'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>2.54%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },












































//====================MAN AGE 79====================================//



{
     id: 'survi79',
    message: 'Quel est votre genre ?',
    trigger: 'survi79T',
  },

  {
        id: 'survi79T',
        options: [
          { value: 'M', label: 'M' , trigger: 'survi79M1' },
          { value: 'F', label: 'F ', trigger: 'fsurvi79M1' },
        ],
  },


 {
     id: 'survi79M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'survi79T11',
  },

  {
        id: 'survi79T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79M2' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO1' },
        ],
  },




   {
     id: 'survi79M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi79M22',
  },

  {
        id: 'survi79M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79M3' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO2' },
        ],
  },

  {
     id: 'survi79M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi79M33',
  },

  {
        id: 'survi79M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79M4' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO3' },
        ],
  },


  {
     id: 'survi79M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79M44',
  },

  {
        id: 'survi79M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79M5' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO4' },
        ],
  },


  {
     id: 'survi79M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79M55',
  },

  {
        id: 'survi79M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79M6' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO5' },
        ],
  },



  {
    id: 'survi79M6',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi79MNO5',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi79MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO402m',
  },

  {
        id: 'survi79MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO402m02' },
        ],
  },



  {
    id: 'survi79MNO402m01',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi79MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'survi79MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO3002',
  },

  {
        id: 'survi79MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO30022' },
        ],
  },


  {
     id: 'survi79MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO3002102',
  },

  {
        id: 'survi79MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO30021022' },
        ],
  },



  {
    id: 'survi79MNO30021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi79MNO30021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'survi79MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO3002203',
  },

  {
        id: 'survi79MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO300220302' },
        ],
  },



  {
    id: 'survi79MNO300220301',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi79MNO300220302',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>86,52%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'survi79MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi79MNO202c',
  },

  {
        id: 'survi79MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO20202' },
        ],
  },


  {
     id: 'survi79MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO2020102',
  },

  {
        id: 'survi79MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO20201022' },
        ],
  },


  {
     id: 'survi79MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO2020102102',
  },

  {
        id: 'survi79MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO20201021022' },
        ],
  },



  {
    id: 'survi79MNO20201021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi79MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'survi79MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO20201022002',
  },

  {
        id: 'survi79MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO202010220022' },
        ],
  },



  {
    id: 'survi79MNO202010220021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi79MNO202010220022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>81,37%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'survi79MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO2020202',
  },

  {
        id: 'survi79MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO20202022' },
        ],
  },


  {
     id: 'survi79MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO2020202102',
  },

  {
        id: 'survi79MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO20202021022' },
        ],
  },



  {
    id: 'survi79MNO20202021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi79MNO20202021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>79,83%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'survi79MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO2020202202',
  },

  {
        id: 'survi79MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO20202022021b' },
        ],
  },



  {
    id: 'survi79MNO20202022021c',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>77,77%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi79MNO20202022021b',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>54,08%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'survi79MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi79MNO11',
  },

  {
        id: 'survi79MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO112' },
        ],
  },

  {
     id: 'survi79MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi59MNO11102',
  },

  {
        id: 'survi79MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO111022' },
        ],
  },


  {
     id: 'survi79MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO11102102',
  },


  {
        id: 'survi79MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO1110210212' },
        ],
  },


  {
     id: 'survi79MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO11102102102',
  },

  {
        id: 'survi79MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO111021021022' },
        ],
  },



  {
    id: 'survi79MNO111021021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi79MNO111021021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>90.64%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'survi79MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO111021021202',
  },

  {
        id: 'survi79MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO1110210212022' },
        ],
  },



  {
    id: 'survi79MNO1110210212021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>88.58%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi79MNO1110210212022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>64.89%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'survi79MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO11102202',
  },


  {
        id: 'survi79MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO111022022' },
        ],
  },


  {
     id: 'survi79MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO11102202102',
  },

  {
        id: 'survi79MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO111022021022' },
        ],
  },



  {
    id: 'survi79MNO111022021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>87.03%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'survi79MNO111022021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>63.34%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'survi79MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO11102202202',
  },

  {
        id: 'survi79MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO111022022022' },
        ],
  },



  {
    id: 'survi79MNO111022022021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>61.28%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi79MNO111022022022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>37.59%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'survi79MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi79MNO1122',
  },

  {
        id: 'survi79MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO11222' },
        ],
  },


  {
     id: 'survi79MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO1122102',
  },


  {
        id: 'survi79MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'survi79MNO11221022' },
        ],
  },


  {
     id: 'survi79MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO1122102101',
  },

  {
        id: 'survi79MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO11221021012' },
        ],
  },



  {
    id: 'survi79MNO11221021011',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>81.88%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi79MNO11221021012',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>58.20%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi79MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO1122102201',
  },

  {
        id: 'survi79MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO11221022012' },
        ],
  },



  {
    id: 'survi79MNO11221022011',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>56.13%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi79MNO11221022012',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>32.45%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'survi79MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi79MNO1122201',
  },


  {
        id: 'survi79MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'survi79MNO11222012' },
        ],
  },


  {
     id: 'survi79MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO1122201101',
  },

  {
        id: 'survi79MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO11222011012' },
        ],
  },



  {
    id: 'survi79MNO11222011011',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>54.59%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'survi79MNO11222011012',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>30.90%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'survi79MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi79MNO1122201201',
  },

  {
        id: 'survi79MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi79MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'survi79MNO11222012012' },
        ],
  },



  {
    id: 'survi79MNO11222012011',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>28.84%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi79MNO11222012012',
    component: (
     <div className='response orange'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>5.15%</strong> de chances de mourir de covid-19 si vous êtes infecté. Toutefois, continuer de prendre vos précautions. </p> 
     
     </div>
      ),
    trigger: '13',
  },




















































//====================FEMME AGE 79====================================//



 {
     id: 'fsurvi79M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'fsurvi79T11',
  },

  {
        id: 'fsurvi79T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79M2' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO1' },
        ],
  },




   {
     id: 'fsurvi79M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi79M22',
  },

  {
        id: 'fsurvi79M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79M3' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO2' },
        ],
  },

  {
     id: 'fsurvi79M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi79M33',
  },

  {
        id: 'fsurvi79M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79M4' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO3' },
        ],
  },


  {
     id: 'fsurvi79M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79M44',
  },

  {
        id: 'fsurvi79M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79M5' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO4' },
        ],
  },


  {
     id: 'fsurvi79M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79M55',
  },

  {
        id: 'fsurvi79M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79M6' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO5' },
        ],
  },



  {
    id: 'fsurvi79M6',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi79MNO5',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi79MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO402m',
  },

  {
        id: 'fsurvi79MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO402m02' },
        ],
  },



  {
    id: 'fsurvi79MNO402m01',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi79MNO402m02',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'fsurvi79MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO3002',
  },

  {
        id: 'fsurvi79MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO30022' },
        ],
  },


  {
     id: 'fsurvi79MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO3002102',
  },

  {
        id: 'fsurvi79MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO30021022' },
        ],
  },



  {
    id: 'fsurvi79MNO30021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi79MNO30021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },










 {
     id: 'fsurvi79MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO3002203',
  },

  {
        id: 'fsurvi79MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO300220302' },
        ],
  },



  {
    id: 'fsurvi79MNO300220301',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi79MNO300220302',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>84,59%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'fsurvi79MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi79MNO202c',
  },

  {
        id: 'fsurvi79MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO20202' },
        ],
  },


  {
     id: 'fsurvi79MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO2020102',
  },

  {
        id: 'fsurvi79MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO20201022' },
        ],
  },


  {
     id: 'fsurvi79MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO2020102102',
  },

  {
        id: 'fsurvi79MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO20201021022' },
        ],
  },



  {
    id: 'fsurvi79MNO20201021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi79MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'fsurvi79MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO20201022002',
  },

  {
        id: 'fsurvi79MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO202010220022' },
        ],
  },



  {
    id: 'fsurvi79MNO202010220021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi79MNO202010220022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>79,55%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'fsurvi79MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO2020202',
  },

  {
        id: 'fsurvi79MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO20202022' },
        ],
  },


  {
     id: 'fsurvi79MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO2020202102',
  },

  {
        id: 'fsurvi79MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO20202021022' },
        ],
  },



  {
    id: 'fsurvi79MNO20202021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi79MNO20202021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>78,04%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'fsurvi79MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO2020202202',
  },

  {
        id: 'fsurvi79MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO20202022021b' },
        ],
  },



  {
    id: 'fsurvi79MNO20202022021c',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>76,03%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi79MNO20202022021b',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>52,87%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'fsurvi79MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi79MNO11',
  },

  {
        id: 'fsurvi79MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO112' },
        ],
  },

  {
     id: 'fsurvi79MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi59MNO11102',
  },

  {
        id: 'fsurvi79MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO111022' },
        ],
  },


  {
     id: 'fsurvi79MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO11102102',
  },


  {
        id: 'fsurvi79MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO1110210212' },
        ],
  },


  {
     id: 'fsurvi79MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO11102102102',
  },

  {
        id: 'fsurvi79MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO111021021022' },
        ],
  },



  {
    id: 'fsurvi79MNO111021021021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi79MNO111021021022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>88.62%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'fsurvi79MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO111021021202',
  },

  {
        id: 'fsurvi79MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO1110210212022' },
        ],
  },



  {
    id: 'fsurvi79MNO1110210212021',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>86.60%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi79MNO1110210212022',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>63.44%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'fsurvi79MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO11102202',
  },


  {
        id: 'fsurvi79MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO111022022' },
        ],
  },


  {
     id: 'fsurvi79MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO11102202102',
  },

  {
        id: 'fsurvi79MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO111022021022' },
        ],
  },



  {
    id: 'fsurvi79MNO111022021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>87.03%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'fsurvi79MNO111022021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>63.34%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'fsurvi79MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO11102202202',
  },

  {
        id: 'fsurvi79MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO111022022022' },
        ],
  },



  {
    id: 'fsurvi79MNO111022022021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>59.92%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi79MNO111022022022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>36.76%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'fsurvi79MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi79MNO1122',
  },

  {
        id: 'fsurvi79MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO11222' },
        ],
  },


  {
     id: 'fsurvi79MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO1122102',
  },


  {
        id: 'fsurvi79MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi79MNO11221022' },
        ],
  },


  {
     id: 'fsurvi79MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO1122102101',
  },

  {
        id: 'fsurvi79MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO11221021012' },
        ],
  },



  {
    id: 'fsurvi79MNO11221021011',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>80.06%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi79MNO11221021012',
    component: (
     <div className='response red'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>56.90%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi79MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO1122102201',
  },

  {
        id: 'fsurvi79MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO11221022012' },
        ],
  },



  {
    id: 'fsurvi79MNO11221022011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>54.88%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi79MNO11221022012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>31.72%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'fsurvi79MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi79MNO1122201',
  },


  {
        id: 'fsurvi79MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi79MNO11222012' },
        ],
  },


  {
     id: 'fsurvi79MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO1122201101',
  },

  {
        id: 'fsurvi79MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO11222011012' },
        ],
  },



  {
    id: 'fsurvi79MNO11222011011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>53.37%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'fsurvi79MNO11222011012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>30.21%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'fsurvi79MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi79MNO1122201201',
  },

  {
        id: 'fsurvi79MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi79MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi79MNO11222012012' },
        ],
  },



  {
    id: 'fsurvi79MNO11222012011',
    component: (
     <div className='response orange'>

       <strong>Votre situation est très délicate</strong>
       <p>Vous avez <strong>28.20%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi79MNO11222012012',
    component: (
     <div className='response orange'>

       <strong>Votre situation n’est pas vraiment grave.</strong>
       <p>Vous avez <strong>5.04%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },












































//====================MAN AGE 89====================================//



{
     id: 'survi89',
    message: 'Quel est votre genre ?',
    trigger: 'survi89T',
  },

  {
        id: 'survi89T',
        options: [
          { value: 'M', label: 'M' , trigger: 'survi89M1' },
          { value: 'F', label: 'F ', trigger: 'fsurvi89M1' },
        ],
  },


 {
     id: 'survi89M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'survi89T11',
  },

  {
        id: 'survi89T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89M2' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO1' },
        ],
  },




   {
     id: 'survi89M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi89M22',
  },

  {
        id: 'survi89M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89M3' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO2' },
        ],
  },

  {
     id: 'survi89M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi89M33',
  },

  {
        id: 'survi89M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89M4' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO3' },
        ],
  },


  {
     id: 'survi89M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89M44',
  },

  {
        id: 'survi89M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89M5' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO4' },
        ],
  },


  {
     id: 'survi89M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89M55',
  },

  {
        id: 'survi89M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89M6' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO5' },
        ],
  },



  {
    id: 'survi89M6',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi89MNO5',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi89MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO402m',
  },

  {
        id: 'survi89MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO402m02' },
        ],
  },



  {
    id: 'survi89MNO402m01',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi89MNO402m02',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'survi89MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO3002',
  },

  {
        id: 'survi89MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO30022' },
        ],
  },


  {
     id: 'survi89MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO3002102',
  },

  {
        id: 'survi89MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO30021022' },
        ],
  },



  {
    id: 'survi89MNO30021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi89MNO30021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'survi89MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO3002203',
  },

  {
        id: 'survi89MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO300220302' },
        ],
  },



  {
    id: 'survi89MNO300220301',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi89MNO300220302',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'survi89MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi89MNO202c',
  },

  {
        id: 'survi89MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO20202' },
        ],
  },


  {
     id: 'survi89MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO2020102',
  },

  {
        id: 'survi89MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO20201022' },
        ],
  },


  {
     id: 'survi89MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO2020102102',
  },

  {
        id: 'survi89MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO20201021022' },
        ],
  },



  {
    id: 'survi89MNO20201021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi89MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'survi89MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO20201022002',
  },

  {
        id: 'survi89MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO202010220022' },
        ],
  },



  {
    id: 'survi89MNO202010220021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi89MNO202010220022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'survi89MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO2020202',
  },

  {
        id: 'survi89MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO20202022' },
        ],
  },


  {
     id: 'survi89MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO2020202102',
  },

  {
        id: 'survi89MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO20202021022' },
        ],
  },



  {
    id: 'survi89MNO20202021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi89MNO20202021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'survi89MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO2020202202',
  },

  {
        id: 'survi89MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO20202022021b' },
        ],
  },



  {
    id: 'survi89MNO20202022021c',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'survi89MNO20202022021b',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'survi89MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'survi89MNO11',
  },

  {
        id: 'survi89MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO112' },
        ],
  },

  {
     id: 'survi89MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi89MNO11102',
  },

  {
        id: 'survi89MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO111022' },
        ],
  },


  {
     id: 'survi89MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO11102102',
  },


  {
        id: 'survi89MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO1110210212' },
        ],
  },


  {
     id: 'survi89MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO11102102102',
  },

  {
        id: 'survi89MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO111021021022' },
        ],
  },



  {
    id: 'survi89MNO111021021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi89MNO111021021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'survi89MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO111021021202',
  },

  {
        id: 'survi89MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO1110210212022' },
        ],
  },



  {
    id: 'survi89MNO1110210212021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi89MNO1110210212022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'survi89MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO11102202',
  },


  {
        id: 'survi89MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO111022022' },
        ],
  },


  {
     id: 'survi89MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO11102202102',
  },

  {
        id: 'survi89MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO111022021022' },
        ],
  },



  {
    id: 'survi89MNO111022021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'survi89MNO111022021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'survi89MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO11102202202',
  },

  {
        id: 'survi89MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO111022022022' },
        ],
  },



  {
    id: 'survi89MNO111022022021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'survi89MNO111022022022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'survi89MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'survi89MNO1122',
  },

  {
        id: 'survi89MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO11222' },
        ],
  },


  {
     id: 'survi89MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO1122102',
  },


  {
        id: 'survi89MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'survi89MNO11221022' },
        ],
  },


  {
     id: 'survi89MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO1122102101',
  },

  {
        id: 'survi89MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO11221021012' },
        ],
  },



  {
    id: 'survi89MNO11221021011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'survi89MNO11221021012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'survi89MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO1122102201',
  },

  {
        id: 'survi89MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO11221022012' },
        ],
  },



  {
    id: 'survi89MNO11221022011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi89MNO11221022012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>90.45%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'survi89MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'survi89MNO1122201',
  },


  {
        id: 'survi89MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'survi89MNO11222012' },
        ],
  },


  {
     id: 'survi89MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO1122201101',
  },

  {
        id: 'survi89MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO11222011012' },
        ],
  },



  {
    id: 'survi89MNO11222011011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'survi89MNO11222011012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>89.90%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'survi89MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'survi89MNO1122201201',
  },

  {
        id: 'survi89MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'survi89MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'survi89MNO11222012012' },
        ],
  },



  {
    id: 'survi89MNO11222012011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>83.84%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'survi89MNO11222012012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>14.95%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },

























//====================FEMME AGE 89====================================//


 {
     id: 'fsurvi89M1',
    message: 'Souffrez-vous d’une maladie cardiovasculaire ?',
    trigger: 'fsurvi89T11',
  },

  {
        id: 'fsurvi89T11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89M2' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO1' },
        ],
  },




   {
     id: 'fsurvi89M2',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi89M22',
  },

  {
        id: 'fsurvi89M22',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89M3' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO2' },
        ],
  },

  {
     id: 'fsurvi89M3',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi89M33',
  },

  {
        id: 'fsurvi89M33',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89M4' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO3' },
        ],
  },


  {
     id: 'fsurvi89M4',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89M44',
  },

  {
        id: 'fsurvi89M44',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89M5' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO4' },
        ],
  },


  {
     id: 'fsurvi89M5',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89M55',
  },

  {
        id: 'fsurvi89M55',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89M6' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO5' },
        ],
  },



  {
    id: 'fsurvi89M6',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi89MNO5',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi89MNO4',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO402m',
  },

  {
        id: 'fsurvi89MNO402m',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO402m01' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO402m02' },
        ],
  },



  {
    id: 'fsurvi89MNO402m01',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi89MNO402m02',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



























{
     id: 'fsurvi89MNO3',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO3002',
  },

  {
        id: 'fsurvi89MNO3002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO30021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO30022' },
        ],
  },


  {
     id: 'fsurvi89MNO30021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO3002102',
  },

  {
        id: 'fsurvi89MNO3002102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO30021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO30021022' },
        ],
  },



  {
    id: 'fsurvi89MNO30021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi89MNO30021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



















 {
     id: 'fsurvi89MNO30022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO3002203',
  },

  {
        id: 'fsurvi89MNO3002203',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO300220301' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO300220302' },
        ],
  },



  {
    id: 'fsurvi89MNO300220301',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi89MNO300220302',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },











 {
     id: 'fsurvi89MNO2',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi89MNO202c',
  },

  {
        id: 'fsurvi89MNO202c',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO20201' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO20202' },
        ],
  },


  {
     id: 'fsurvi89MNO20201',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO2020102',
  },

  {
        id: 'fsurvi89MNO2020102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO20201021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO20201022' },
        ],
  },


  {
     id: 'fsurvi89MNO20201021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO2020102102',
  },

  {
        id: 'fsurvi89MNO2020102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO20201021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO20201021022' },
        ],
  },



  {
    id: 'fsurvi89MNO20201021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi89MNO20201021022',
    component: (
     <div className='response orange'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















{
     id: 'fsurvi89MNO20201022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO20201022002',
  },

  {
        id: 'fsurvi89MNO20201022002',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO202010220021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO202010220022' },
        ],
  },



  {
    id: 'fsurvi89MNO202010220021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi89MNO202010220022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













  {
     id: 'fsurvi89MNO20202',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO2020202',
  },

  {
        id: 'fsurvi89MNO2020202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO20202021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO20202022' },
        ],
  },


  {
     id: 'fsurvi89MNO20202021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO2020202102',
  },

  {
        id: 'fsurvi89MNO2020202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO20202021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO20202021022' },
        ],
  },



  {
    id: 'fsurvi89MNO20202021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi89MNO20202021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },















 {
     id: 'fsurvi89MNO20202022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO2020202202',
  },

  {
        id: 'fsurvi89MNO2020202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO20202022021c' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO20202022021b' },
        ],
  },



  {
    id: 'fsurvi89MNO20202022021c',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },





  {
    id: 'fsurvi89MNO20202022021b',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92,00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },








































   {
     id: 'fsurvi89MNO1',
    message: 'Avez-vous le diabète ?',
    trigger: 'fsurvi89MNO11',
  },

  {
        id: 'fsurvi89MNO11',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO112' },
        ],
  },

  {
     id: 'fsurvi89MNO111',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi89MNO11102',
  },

  {
        id: 'fsurvi89MNO11102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO111022' },
        ],
  },


  {
     id: 'fsurvi89MNO111021',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO11102102',
  },


  {
        id: 'fsurvi89MNO11102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO1110210212' },
        ],
  },


  {
     id: 'fsurvi89MNO111021021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO11102102102',
  },

  {
        id: 'fsurvi89MNO11102102102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111021021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO111021021022' },
        ],
  },



  {
    id: 'fsurvi89MNO111021021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi89MNO111021021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },


















  {
     id: 'fsurvi89MNO1110210212',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO111021021202',
  },

  {
        id: 'fsurvi89MNO111021021202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO1110210212021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO1110210212022' },
        ],
  },



  {
    id: 'fsurvi89MNO1110210212021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi89MNO1110210212022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },



































 {
     id: 'fsurvi89MNO111022',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO11102202',
  },


  {
        id: 'fsurvi89MNO11102202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO111022022' },
        ],
  },


  {
     id: 'fsurvi89MNO111022021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO11102202102',
  },

  {
        id: 'fsurvi89MNO11102202102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111022021021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO111022021022' },
        ],
  },



  {
    id: 'fsurvi89MNO111022021021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



  {
    id: 'fsurvi89MNO111022021022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },













    {
     id: 'fsurvi89MNO111022022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO11102202202',
  },

  {
        id: 'fsurvi89MNO11102202202',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO111022022021' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO111022022022' },
        ],
  },



  {
    id: 'fsurvi89MNO111022022021',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },




  {
    id: 'fsurvi89MNO111022022022',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },
































{
     id: 'fsurvi89MNO112',
    message: 'Souffrez-vous d’une maladie respiratoire chronique ?',
    trigger: 'fsurvi89MNO1122',
  },

  {
        id: 'fsurvi89MNO1122',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11221' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO11222' },
        ],
  },


  {
     id: 'fsurvi89MNO11221',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO1122102',
  },


  {
        id: 'fsurvi89MNO1122102',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11221021' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi89MNO11221022' },
        ],
  },


  {
     id: 'fsurvi89MNO11221021',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO1122102101',
  },

  {
        id: 'fsurvi89MNO1122102101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11221021011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO11221021012' },
        ],
  },



  {
    id: 'fsurvi89MNO11221021011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté</p> 
     
     </div>
      ),
    trigger: '13',
  },



    {
    id: 'fsurvi89MNO11221021012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },

















 {
     id: 'fsurvi89MNO11221022',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO1122102201',
  },

  {
        id: 'fsurvi89MNO1122102201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11221022011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO11221022012' },
        ],
  },



  {
    id: 'fsurvi89MNO11221022011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi89MNO11221022012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>89.25%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },


































   {
     id: 'fsurvi89MNO11222',
    message: 'Souffrez-vous d’hypertension ?',
    trigger: 'fsurvi89MNO1122201',
  },


  {
        id: 'fsurvi89MNO1122201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11222011' },
          { value: 'Non', label: 'Non' , trigger: 'fsurvi89MNO11222012' },
        ],
  },


  {
     id: 'fsurvi89MNO11222011',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO1122201101',
  },

  {
        id: 'fsurvi89MNO1122201101',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11222011011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO11222011012' },
        ],
  },



  {
    id: 'fsurvi89MNO11222011011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>92.00%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },




    {
    id: 'fsurvi89MNO11222011012',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>87.60%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },








  {
     id: 'fsurvi89MNO11222012',
    message: 'Avez-vous un cancer ?',
    trigger: 'fsurvi89MNO1122201201',
  },

  {
        id: 'fsurvi89MNO1122201201',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: 'fsurvi89MNO11222012011' },
          { value: 'Non', label: 'Non', trigger: 'fsurvi89MNO11222012012' },
        ],
  },



  {
    id: 'fsurvi89MNO11222012011',
    component: (
     <div className='response red'>

       <strong>Votre situation est très délicate.</strong>
       <p>Vous avez <strong>82.24%</strong> de chances de mourir de covid-19 si vous êtes infecté.</p> 
     
     </div>
      ),
    trigger: '13',
  },


    {
    id: 'fsurvi89MNO11222012012',
    component: (
     <div className='response orange'>

       <strong>Prenez des précautions supplémentaires</strong>
       <p>Vous avez <strong>14.84%</strong> de chances de mourir de covid-19 si vous êtes infecté. </p> 
     
     </div>
      ),
    trigger: '13',
  },
























































// {
//     id: '11',
//     component: <FetchLocation/>
//   },
//   {
//     id: 'afterLocationFetch',
//     message: ({previousValue, steps}) => {
//       console.log(previousValue, steps);
//       if (previousValue) {
//         return 'Voulez vous avoir des informations a propos de ce pays ?';
//       }
//       return 'Veuillez saisir le nom de votre pays'
//     },
//     trigger: 'isFetchFromGeoLocation'
//   },
//   {
//     id: 'isFetchFromGeoLocation',
//     options: [
//       {value: 1, label: 'oui', trigger: 'showCountryInfoWithLocation'},
//       {value: 2, label: 'Non ', trigger: 'fetchCountryFromUser'},
//     ],
//   },
//   {
//     id: 'fetchCountryFromUser',
//     message: () => 'Veuillez saisir le nom de votre pays',
//     trigger: '12',
//   },
//   {
//     id: '12',
//     user: true,
//     trigger: 'showCountryInfo',
//   },
  {
    id: "fetchCountryInputFromUser",
    component: <CountrySearch/>
  },
  {
    id: 'displayCountryData',
    component: <DisplayCountryData/>
  },
  // {
  //   id: 'showCountryInfoWithLocation',
  //   message: ({previousValue, steps}) => displayCountryInfo(steps['11'].value, steps),
  //   trigger: ({previousValue, steps}) => decideNextStepAfterCountry(previousValue, steps, "11"),
  // },
  // {
  //   id: 'showCountryInfo',
  //   message: ({previousValue, steps}) => displayCountryInfo(previousValue, steps),
  //   trigger: ({previousValue, steps}) => decideNextStepAfterCountry(previousValue, steps, "12"),
  // },
  // {
  //   id: 'fetchStateName',
  //   user: true,
  //   trigger: 'showStateInfo'
  // },
  // {
  //   id: 'showStateInfo',
  //   message: ({previousValue, steps}) => displayStateInfo(previousValue, steps),
  //   trigger: ({previousValue, steps}) => decideNextStepAfterState(previousValue, steps),
  // },

  {
    id: '13',
    message: 'Aimerez vous en savoir plus ?',
    trigger: '14',
  },

  {
        id: '14',
        options: [
          { value: 1, label: 'Oui' , trigger: '5' },
          { value: 2, label: 'Non ', trigger: '15' },
        ],
      },



  {
    id: '16',
    component: <QuestionAuthChecker/>,
  },

 {
     id: '17',
    message: 'Avez vous compris ?',
    trigger: '18',
  },

  {
        id: '18',
        options: [
          { value: 1, label: 'Oui' , trigger: '1900' },
          { value: 2, label: 'Non ', trigger: '13' },
        ],
  },


 {
     id: '1900',
    message: 'De quel genre êtes-vous ?',
    trigger: '1800',
  },

  {
        id: '1800',
        options: [
      {
        value: 'M', label: 'M', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1900, steps, '1700')
      },
      {value: 'F', label: 'F', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1900, steps, '1700')},
    ],
  },


 {
     id: '1700',
    message: 'Choisissez votre tranche d’âge:',
    trigger: '1600',
  },


{
        id: '1600',
        options: [
      {
        value: '<18', label: '<18', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1700, steps, '1919155')
      },
      {value: '18-39', label: '18-39', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1700, steps, '1919155')},
      {value: '40-59', label: '40-59', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1700, steps, '1919155')},
      {value: '60-79', label: '60-79', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1700, steps, '1919155')},
      {value: '>80', label: '>80', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1700, steps, '1919155')},
    ],
  },





    {
      id: '1919155',
      message: 'Dans quelle province vivez vous ?',
      trigger: '1920155',
    },



{
        id: '1920155',
        options: [
      {
        value: 'G1', label: 'G1', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919101')
      },
      {value: 'G2', label: 'G2', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919102')},
      {value: 'G3', label: 'G3', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919103')},
      {value: 'G4', label: 'G4', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919104')},
      {value: 'G5', label: 'G5', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919105')},
      {value: 'G6', label: 'G6', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919106')},
      {value: 'G7', label: 'G7', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919107')},
      {value: 'G8', label: 'G8', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919108')},
      {value: 'G9', label: 'G9', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919155, steps, '1919109')},

    ],
  },






    {
      id: '1919101',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920101',
    },


    {
        id: '1920101',
        options: [
      {
        value: 'Libreville', label: 'Libreville', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')
      },
      {value: 'Owendo', label: 'Owendo', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')},
      {value: 'Akanda', label: 'Akanda', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')},
      {value: 'Ntoum', label: 'Ntoum', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')},
      {value: 'Cocobeach', label: 'Cocobeach', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')},
      {value: 'Kango', label: 'Kango', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')},
      {value: 'Ndzomoe', label: 'Ndzomoe', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919101, steps, '19')},
    ],
  },








    {
      id: '1919102',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920102',
    },


    {
        id: '1920102',
        options: [
      {
        value: 'Onga', label: 'Onga', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')
      },
      {value: 'Bongoville', label: 'Bongoville', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Akiéni', label: 'Akiéni', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Bakoumba', label: 'Bakoumba', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Moanda', label: 'Moanda', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Franceville', label: 'Franceville', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Lékoni', label: 'Lékoni', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Okondja', label: 'Okondja', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Boumango', label: 'Boumango', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Ngouoni', label: 'Ngouoni', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
      {value: 'Aboumi', label: 'Aboumi', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919102, steps, '19')},
    ],
  },






    {
      id: '1919103',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920103',
    },


    {
        id: '1920103',
        options: [
      {value: 'Ndjolé', label: 'Ndjolé', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919103, steps, '19')},
      {value: 'Lambaréné', label: 'Lambaréné', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919103, steps, '19')},
    ],
  },





    {
      id: '1919104',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920104',
    },


    {
        id: '1920104',
        options: [
      {value: 'Mbigou', label: 'Mbigou', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Ndendé', label: 'Ndendé', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Mouila', label: 'Mouila', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Malinga', label: 'Malinga', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Lébamba', label: 'Lébamba', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Guiétsou', label: 'Guiétsou', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Mandji', label: 'Mandji', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Mimongo', label: 'Mimongo', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
      {value: 'Fougamou', label: 'Fougamou', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919104, steps, '19')},
    ],
  },








    {
      id: '1919105',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920105',
    },


    {
        id: '1920105',
        options: [
      {value: 'Mayumba', label: 'Mayumba', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919105, steps, '19')},
      {value: 'Moabi', label: 'Moabi', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919105, steps, '19')},
      {value: 'Mabanda', label: 'Mabanda', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919105, steps, '19')},
      {value: 'Ndindi', label: 'Ndindi', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919105, steps, '19')},
      {value: 'Moulingui-Binza', label: 'Moulingui-Binza', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919105, steps, '19')},
      {value: 'Tchibanga', label: 'Tchibanga', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919105, steps, '19')},
    ],
  },



    {
      id: '1919106',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920106',
    },


    {
        id: '1920106',
        options: [
      {value: 'Makokou', label: 'Makokou', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919106, steps, '19')},
      {value: 'Booué', label: 'Booué', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919106, steps, '19')},
      {value: 'Ovan', label: 'Ovan', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919106, steps, '19')},
      {value: 'Mékambo', label: 'Mékambo', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919106, steps, '19')},
    ],
  },




      {
      id: '1919107',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920107',
    },


    {
        id: '1920107',
        options: [
      {value: 'Koulamoutou', label: 'Koulamoutou', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919107, steps, '19')},
      {value: 'Lastoursville', label: 'Lastoursville', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919107, steps, '19')},
      {value: 'Pana', label: 'Pana', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919107, steps, '19')},
      {value: 'Iboundji', label: 'Iboundji', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919107, steps, '19')},
    ],
  },






      {
      id: '1919108',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920108',
    },


    {
        id: '1920108',
        options: [
      {value: 'Port-Gentil', label: 'Port-Gentil', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919108, steps, '19')},
      {value: 'Omboué', label: 'Omboué', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919108, steps, '19')},
      {value: 'Gamba', label: 'Gamba', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919108, steps, '19')},
    ],
  },



      {
      id: '1919109',
      message: 'Dans quelle ville ou commune vivez vous ?',
      trigger: '1920109',
    },


    {
        id: '1920109',
        options: [
      {value: 'Medouneu', label: 'Medouneu', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919109, steps, '19')},
      {value: 'Minvoul', label: 'Minvoul', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919109, steps, '19')},
      {value: 'Bitam', label: 'Bitam', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919109, steps, '19')},
      {value: 'Mitzic', label: 'Mitzic', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919109, steps, '19')},
      {value: 'Oyem', label: 'Oyem', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 1919109, steps, '19')},
    ],
  },










 {
     id: '19',
    message: 'Avez-vous une congestion nasale ou mal de gorge?',
    trigger: '20',
  },

  {
        id: '20',
        options: [
      {
        value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 19, steps, '21')
      },
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 19, steps, '40')},
    ],
  },

 {
     id: '21',
    message: 'Avez-vous une toux sèche ?',
    trigger: '22',
  },

  {
        id: '22',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 21, steps, '23')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 21, steps, '60')},
    ],
  },

 {
     id: '23',
    message: 'Avez-vous des difficultés  à respirer par la bouche ?',
    trigger: '24',
  },

  {
        id: '24',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 23, steps, '25')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 23, steps, '80')},
    ],
  },



   {
     id: '25',
    message: 'Avez-vous un écoulement nasale ou rhume ?',
    trigger: '26',
  },



   {
        id: '26',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25, steps, '2555')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25, steps, '2555')},
    ],
  },


   {
     id: '2555',
    message: 'Avez-vous une perte soudaine du goût et de l\'odorat ?',
    trigger: '2666',
  },



   {
        id: '2666',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 2555, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 2555, steps, '27')},
    ],
  },




















  {
    id: '27',
    message: 'Avez-vous une fièvre supérieure ou égale a 37.5° ?',
    trigger: '28',
  },


     {
        id: '28',
        options:  [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 27, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 27, steps, '120')},
    ],
  },


{
    id: '29',
    component: (
      <div className='response'>
       <p>Considerant vos reponses et les symptômes évoqués, nous vous recommendons d’appeler immediatement le numero d’urgence medical 📞<strong><a href="tel:1410">1410</a></strong> afin que des agents de santé évaluent votre situation clinique.</p> 
     </div>
    ),
    trigger: ({value, steps}) => trackResultQuestionAnswer('Considerant vos reponses et les symptômes évoqués, nous vous recommendons d’appeler immediatement le numero d’urgence medical 1410 afin que des agents de santé evaluent votre situation clinique.', 'Result', '1910'),
  },


  {
     id: '120',
    message: 'Le niveau de votre fièvre est-il entre 36.8° et 37.4°?',
    trigger: '3333',
  },


  {
    id: '3333',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 120, steps, '400')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 120, steps, '121')},
    ],
  },


  {
     id: '121',
    message: 'Ressentez-vous une fatigue permanente ou avez-vous mal aux articulations ?',
    trigger: '122',
  },

  {
    id: '122',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 121, steps, '420')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 121, steps, '123')},
    ],
  },

  {
     id: '123',
    message: 'Avez-vous été en contact avec une personne déclarée malade durant les 14 derniers jours ?',
    trigger: '124',
  },

  {
    id: '124',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 123, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 123, steps, '125')},
    ],
  },

  {
     id: '125',
    message: 'Vivez-vous dans la même maison qu’une personne récemment déclarée malade ?',
    trigger: '126',
  },

   {
    id: '126',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 125, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 125, steps, '127')},
    ],
  },

   {
     id: '127',
    message: 'Avez-vous été en contact direct, ou avez vous été dans un environnement fermé avec une personne infectée ?',
    trigger: '128',
  },



  {
    id: '128',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 127, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 127, steps, '129')},
    ],
  },


  {
     id: '129',
    message: 'Avez-vous eu un contact direct avec les secretions d’une personne infectée ?',
    trigger: '130',
  },

  {
    id: '130',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 129, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 129, steps, '131')},
    ],
  },

  {
     id: '131',
    message: 'Etes-vous un professionel de santé, ou fournissez vous une assistance directe a une personne infectée ?',
    trigger: '132',
  },

  {
    id: '132',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 131, steps, '460')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 131, steps, '133')},
    ],
  },





  {
     id: '133',
    message: 'Avez-vous une fréquence cardiaque supérieure a 100 battements par minute ?',
    trigger: '134',
  },


 {
    id: '134',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 133, steps, '500')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 133, steps, '135')},
      {value: 'Je ne sais pas', label: 'Je ne sais pas', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 133, steps, '135')},
    ],
  },


 {
    id: '135',
    message: 'Avez-vous du mal à rester debout à cause des symptômes évoqués ?',
    trigger: '136',
  },


  {
    id: '136',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 135, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 135, steps, '137')},
    ],
  },

  {
    id: '137',
    message: 'Avez-vous des maux de tête ou nausées ?',
    trigger: '138',
  },

  {
    id: '138',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 137, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 137, steps, '150')},
    ],
  },


  {
    id: '400',
    message: 'Ressentez-vous une fatigue permanente ou avez-vous mal aux articulations ?',
    trigger: '401',
  },

  {
    id: '401',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 400, steps, '420')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 400, steps, '402')},
    ],
  },

  {
    id: '402',
    message: 'Avez-vous été en contact avec une personne déclarée malade durant les 14 derniers jours ?',
    trigger: '403',
  },

  {
    id: '403',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 402, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 402, steps, '404')},
    ],
  },

  {
    id: '404',
    message: 'Vivez-vous dans la même maison qu’une personne récemment déclarée malade ?',
    trigger: '405',
  },

  {
    id: '405',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 404, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 404, steps, '406')},
    ],
  },

  {
    id: '406',
    message: 'Avez-vous été en contact direct, ou avez vous été dans un environnement fermé avec une personne infectée ?',
    trigger: '407',
  },

  {
    id: '407',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 406, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 406, steps, '408')},
    ],
  },


  {
    id: '408',
    message: 'Avez-vous eu un contact direct avec les secretions d’une personne infectée ?',
    trigger: '409',
  },

  {
    id: '409',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 408, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 408, steps, '410')},
    ],
  },

  {
    id: '410',
    message: 'Etes-vous un professionel de santé, ou fournissez vous une assistance directe a une personne infectée ?',
    trigger: '411',
  },

  {
    id: '411',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 410, steps, '460')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 410, steps, '412')},
    ],
  },


  {
    id: '412',
    message: 'Avez-vous une fréquence cardiaque supérieure a 100 battements par minute ?',
    trigger: '413',
  },


  {
    id: '413',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 412, steps, '500')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 412, steps, '414')},
      {value: 'Je ne sais pas', label: 'Je ne sais pas', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 412, steps, '414')},
    ],
  },

  {
    id: '414',
    message: 'Avez-vous du mal à rester debout à cause des symptômes évoqués ?',
    trigger: '415',
  },

  {
    id: '415',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 414, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 414, steps, '416')},
    ],
  },

  {
    id: '416',
    message: 'Avez-vous des maux de tête ou nausées ?',
    trigger: '4420',
  },

  {
    id: '4420',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 416, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 416, steps, '150')},
    ],
  },


  {
    id: '420',
    message: 'Avez-vous été en contact avec une personne déclarée malade durant les 14 derniers jours ?',
    trigger: '421',
  },

  {
    id: '421',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 420, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 420, steps, '422')},
    ],
  },

  {
    id: '422',
    message: 'Vivez-vous dans la même maison qu’une personne récemment déclarée malade ?',
    trigger: '423',
  },

  {
    id: '423',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 422, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 422, steps, '424')},
    ],
  },

  {
    id: '424',
    message: 'Avez-vous été en contact direct, ou avez vous été dans un environnement fermé avec une personne infectée ?',
    trigger: '425',
  },

  {
    id: '425',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 424, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 424, steps, '426')},
    ],
  },


  {
    id: '426',
    message: 'Avez-vous eu un contact direct avec les secretions d’une personne infectée ?',
    trigger: '427',
  },

  {
    id: '427',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 426, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 426, steps, '428')},
    ],
  },

  {
    id: '428',
    message: 'Etes-vous un professionel de santé, ou fournissez vous une assistance directe a une personne infectée ?',
    trigger: '429',
  },

  {
    id: '429',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 428, steps, '460')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 428, steps, '430')},
    ],
  },


  {
    id: '430',
    message: 'Avez-vous une fréquence cardiaque supérieure a 100 battements par minute ?',
    trigger: '431',
  },


  {
    id: '431',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 430, steps, '480')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 430, steps, '432')},
      {value: 'Je ne sais pas', label: 'Je ne sais pas', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 430, steps, '432')},
    ],
  },


  {
    id: '432',
    message: 'Avez-vous du mal à rester debout à cause des symptômes évoqués ?',
    trigger: '433',
  },

  {
    id: '433',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 432, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 432, steps, '434')},
    ],
  },

  {
    id: '434',
    message: 'Avez-vous des maux de tête ou nausées ?',
    trigger: '435',
  },

  {
    id: '435',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 434, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 434, steps, '150')},
    ],
  },


  {
    id: '460',
    message: 'Avez-vous une fréquence cardiaque supérieure a 100 battements par minute ?',
    trigger: '461',
  },


  {
    id: '461',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 460, steps, '480')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 460, steps, '462')},
      {value: 'Je ne sais pas', label: 'Je ne sais pas', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 460, steps, '462')},
    ],
  },


  {
    id: '462',
    message: 'Avez-vous du mal à rester debout à cause des symptômes évoqués ?',
    trigger: '463',
  },

  {
    id: '463',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 462, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 462, steps, '464')},
    ],
  },

  {
    id: '464',
    message: 'Avez-vous des maux de tête ou nausées ?',
    trigger: '465',
  },

  {
    id: '465',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 464, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 464, steps, '150')},
    ],
  },


  {
    id: '480',
    message: 'Avez-vous une fréquence cardiaque supérieure a 100 battements par minute ?',
    trigger: '481',
  },


  {
    id: '481',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 480, steps, '500')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 480, steps, '482')},
      {value: 'Je ne sais pas', label: 'Je ne sais pas', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 480, steps, '482')},
    ],
  },

  {
    id: '482',
    message: 'Avez-vous du mal à rester debout à cause des symptômes évoqués ?',
    trigger: '483',
  },

  {
    id: '483',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 482, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 482, steps, '484')},
    ],
  },

  {
    id: '484',
    message: 'Avez-vous des maux de tête ou nausées ?',
    trigger: '485',
  },

  {
    id: '485',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 484, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 484, steps, '150')},
    ],
  },


  {
    id: '500',
    message: 'Avez-vous du mal à rester debout à cause des symptômes évoqués ?',
    trigger: '501',
  },

  {
    id: '501',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 500, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 500, steps, '502')},
    ],
  },

  {
    id: '502',
    message: 'Avez-vous des maux de tête ou nausées ?',
    trigger: '503',
  },

  {
    id: '503',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 502, steps, '160')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 502, steps, '150')},
    ],
  },













  {
    id: '1910',
    message: 'Avez-vous une question particulière ?',
    trigger: '1911',
  },

  {
        id: '1911',
        options: [
          { value: 'Oui', label: 'Oui' , trigger: '1912' },
          { value: 'Non', label: 'Non', trigger: '13' },
        ],
  },

  {
    id: '1912',
    component: (
        <div className="response">
         <p>Veuillez poser votre question <strong><a href="/contact-us">ICI</a></strong></p> 
        </div>
      ),
    end: true,
  },



  {
    id: '150',
    component: (
      <div
        className='response'> {'Sur la base des informations que vous avez saisie pour le moment et conformément aux directives de l’Organisation Mondiale de la Santé, il n’est pas nécessaire que vous contactiez les services de santé ou d’urgences. Toutefois nous vous invitons à refaire le test si vos symptômes changent.  Aussi n’oubliez pas de continuer à prendre vos précautions en suivant attentivement les règles d’hygiènes et de préventions contre le Corona Virus.'} </div>
    ),
    trigger:({value, steps}) => trackResultQuestionAnswer('Sur la base des informations que vous avez saisie pour le moment et conformément aux directives de l’Organisation Mondiale de la Santé, il n’est pas nécessaire que vous contactiez les services de santé ou d’urgences. Toutefois nous vous invitons à refaire le test si vos symptômes changent.  Aussi n’oubliez pas de continuer à prendre vos précautions en suivant attentivement les règles d’hygiènes et de préventions contre le Corona Virus.', 'Result', 1910),
  },


  {
    id: '160',
    component: (
      <div className='response'> 

      <p>Compte tenu des symptômes décrits et selon les directives de l’Organisation Mondiale de la Santé, nous vous recommandons de contacter un médecin ou le centre d’appel 📞<strong><a href="tel:1410">1410</a></strong>. Veuillez également noter qu’il est fortement déconseillé d’aller vous-même aux urgences.</p> 

      </div>
    ),
    trigger:({value, steps}) => trackResultQuestionAnswer('Compte tenu des symptômes décrits et selon les directives de l’Organisation Mondiale de la Santé, nous vous recommandons de contacter un médecin ou le centre d’appel 1410. Veuillez également noter qu’il est fortement déconseillé d’aller vous-même aux urgences. ', 'Result', '1910'),
  },


  {
    id: '100',
    message: 'Avez vous une fièvre supérieure ou égale a 37.5° ?',
    trigger: '101',
  },


  {
    id: '101',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 100, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 100, steps, '120')},
    ],
  },


  {
    id: '40',
    message: 'Avez vous une toux sèche ?',
    trigger: '41',
  },

  {
    id: '41',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 40, steps, '23')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 40, steps, '42')},
    ],
  },

  {
    id: '42',
    message: 'Avez vous des difficultés  à respirer par la bouche ?',
    trigger: '43',
  },

  {
    id: '43',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 42, steps, '25')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 42, steps, '44')},
    ],
  },


  {
    id: '44',
    message: 'Avez vous un écoulement nasale ou rhume ?',
    trigger: '45',
  },


  {
    id: '45',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 44, steps, '2555')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 44, steps, '25550')},
    ],
  },



   {
     id: '25550',
    message: 'Avez vous une perte soudaine du goût et de l\'odorat ?',
    trigger: '26660',
  },



   {
        id: '26660',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25550, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25550, steps, '46')},
    ],
  },










  {
    id: '46',
    message: 'Avez vous une fièvre supérieure ou égale a 37.5° ?',
    trigger: '47',
  },


  {
    id: '47',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 46, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 46, steps, '120')},
    ],
  },


  {
    id: '60',
    message: 'Avez vous des difficultés  à respirer par la bouche ?',
    trigger: '61',
  },

  {
    id: '61',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 60, steps, '25')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 60, steps, '62')},
    ],
  },


  {
    id: '62',
    message: 'Avez vous un écoulement nasale ou rhume ?',
    trigger: '63',
  },


  {
    id: '63',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 62, steps, '25551')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 62, steps, '25551')},
    ],
  },






   {
     id: '25551',
    message: 'Avez vous une perte soudaine du goût et de l\'odorat ?',
    trigger: '26661',
  },



   {
        id: '26661',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25551, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25551, steps, '64')},
    ],
  },









  {
    id: '64',
    message: 'Avez vous une fièvre supérieure ou égale a 37.5° ?',
    trigger: '65',
  },


  {
    id: '65',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 64, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 64, steps, '120')},
    ],
  },


  {
    id: '80',
    message: 'Avez vous un écoulement nasale ou rhume ?',
    trigger: '81',
  },


  {
    id: '81',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 80, steps, '25552')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 80, steps, '25552')},
    ],
  },













  {
     id: '25552',
    message: 'Avez vous une perte soudaine du goût et de l\'odorat ?',
    trigger: '26662',
  },



   {
        id: '26662',
        options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25552, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 25552, steps, '82')},
    ],
  },











  {
    id: '82',
    message: 'Avez vous une fièvre supérieure ou égale a 37.5° ?',
    trigger: '83',
  },


  {
    id: '83',
    options: [
      {value: 'Oui', label: 'Oui', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 82, steps, '29')},
      {value: 'Non', label: 'Non', trigger: ({value, steps}) => trackBinaryQuestionAnswer(value, 82, steps, '120')},
    ],
  },


  {
    id: '15',
    message: 'Soyez prudent et a tres bientot 🤗',
    end: true,
  },


];

export default steps;