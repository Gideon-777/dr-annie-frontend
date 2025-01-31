import React from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Footer from './Components/Navigation/Footer.js'
import FormPage from './Components/Contact/Contact.js'
import Actualite from './Components/Actualite/Actualite.js'
import Particles from './Components/particles/particles.js';
import Chat from './Components/Chat/Chat.js'
import {BrowserRouter} from 'react-router-dom'
import {Route, Link} from "react-router-dom"
import GoogleAuth from "./Components/GoogleAuth";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ContactUs from "./screens/ContactUs";
import ChestClassifier from "./Components/ImageAnalysis/Chest"
import CtClassifier from "./Components/ImageAnalysis/CTscan"
import sein01 from "./Components/ImageAnalysis/cancer_cell"
import sein02 from "./Components/ImageAnalysis/cancer_mamo"
import ozo from "./Components/ImageAnalysis/ozo_testing"
import ScanMenu from "./Components/ImageAnalysis/menu"
import covid_chest from './Components/ImageAnalysis/covid_chest';
import covid_ct from './Components/ImageAnalysis/covid_ct';
import flowers from './Components/ImageAnalysis/flowers';




function App() {
  return (
    
  <BrowserRouter>
    <div className="App">
        <Particles />
        <Navigation />
        <Route exact path="/" component={Chat} />
        <Route exact path="/contact" component={FormPage} />
        <Route exact path="/Actualite" component={Actualite} />
        <Route exact path="/auth/google" component={GoogleAuth} />
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/chestclassifier" component={ChestClassifier} />
        <Route exact path="/ctclassifier" component={CtClassifier} />
        <Route exact path="/mamo1" component={sein01} />
        <Route exact path="/mamo2" component={sein02} />
        <Route exact path="/covid_chest" component={covid_chest} />
        <Route exact path="/flowers" component={flowers} />
        <Route exact path="/covid_ct" component={covid_ct} />
        <Route exact path="/ozo_testing" component={ozo} />
        <Route exact path="/ScanMenu" component={ScanMenu} />
        <Footer />


    </div>
  </BrowserRouter>
  );
}

export default App;
