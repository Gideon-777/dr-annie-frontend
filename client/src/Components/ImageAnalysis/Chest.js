import React from 'react';
import { withRouter } from 'react-router';
import * as tf from '@tensorflow/tfjs'
import './imgscan.css'
import { max } from '@tensorflow/tfjs';
import Carousel from 'react-bootstrap/Carousel' 
import image1 from './women-doctor.jpg'
import image2 from './poumon-scan1.jpg'

class Chest extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            files: null,
            images: [],
            currFileIndex: 0,
            isPredicting: false,
            predicted: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.predict = this.predict.bind(this)
        this.predictAll = this.predictAll.bind(this)
        this.delete = this.delete.bind(this)
        this.model = null
    }


    componentDidMount() {
        this.loadComponent()
    }


    componentDidUpdate() {
        if (this.state.files && this.state.currFileIndex < this.state.files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                let img = new Image()
                img.src = fr.result
                let update = this.state.images.slice()
                update.push(img)
                this.setState({
                    images: update,
                    currFileIndex: this.state.currFileIndex + 1
                })
            }.bind(this)
            fr.readAsDataURL(this.state.files[this.state.currFileIndex]);
        }
    }


    async loadComponent() {
        try {
            this.model = await tf.loadLayersModel('https://covid19-241.herokuapp.com/Chestmodel/model.json');
        } catch (e) {
            alert('Votre appareil ne parvient pas à charger le modèle de prédiction. Si vous utilisez un smartphone, nous vous recommendons d’essayer sur un ordinateur.')
        }
    }


    handleChange(event) {
        let files = event.target.files
        if (files.length > 10) {
            alert("Vous ne pouvez pas charger plus de 10 images à la fois!")
        } else {
            this.setState({
                images: [],
                files: files,
                currFileIndex: 0
            })
        }
    }


    async predictAll() {
        const images = this.state.images
        this.setState({ isPredicting: true })
        for (var i = 0; i < images.length; i++) {
            await this.predict(images[i])
        }
        this.setState({ isPredicting: false })
    }


    async predict(image) {
        try {
            let processedInput = this.preprocessImage(image)
            let result = await this.model.predict(processedInput).data()

            const mapper = ["Covid","Normal"]
            
            let maxIndex = result.indexOf(Math.max(...result))

            let update = this.state.predicted.slice()
            update.push({
                image: image,
                class:mapper[maxIndex],
                confidance: Math.max(...result)
            })
            this.setState({ predicted: update })
        } catch (e) {
            console.log(e)
            let update = this.state.predicted.slice()
            update.push({
                image: image,
                failed: true
            })
            this.setState({ predicted: update })
        }

    }


    preprocessImage(image) {
        let tensor = tf.browser.fromPixels(image)
            .resizeNearestNeighbor([224, 224])
            .toFloat();
            const offset = tf.scalar(255.0);
        return tensor.div(offset).expandDims(0);
    }


    delete() {
        this.setState({
            files: null,
            images: [],
            currFileIndex: 0,
            isPredicting: false,
            predicted: []
        })
    }

    getConfidancePercentage(value){
        return Math.trunc(value*10000)/100
    }




    render() {
        return (

            <div>

            <div>
              <strong>
                <h1 style={{ color: '#000000' }}>VEUILLEZ SÉLECTIONNER LES IMAGES À DIAGNOSTIQUER (SCAN DU THORAX)</h1>
              </strong>
                <div className='center-content '>
                    <div className='button-container center-content'>

                        <label className="myLabel grow">
                            <input type="file"
                                required
                                onChange={this.handleChange}
                                multiple
                                accept="image/*"
                            />
                            <span>
                                Choisir
                            </span>
                        </label>

                        <button
                            disabled={this.state.images.length === 0}
                            className="actionButton predict grow ph3" onClick={this.predictAll}
                        >
                            <i style={{ marginRight: 5 }} class="fa fa-code-branch" aria-hidden="true"></i>
                            <span>Analyser</span>
                        </button>

                        <button
                            disabled={this.state.images.length === 0}
                            onClick={this.delete}
                            className="actionButton delete grow"
                        >
                            <i style={{ marginRight: 5 }} class="fa fa-trash" aria-hidden="true"></i>
                            <span>Supprimer</span>
                        </button>

                    </div>
                </div>
                <div className='column-wrapper'>
                    <div className='column'>
                        <h2 style={{ color: '#000000' }}>Images originales</h2>
                        <h3>Vous pouvez choisir jusqu’a 10 images</h3>
                        {this.state.images.map((img, i) => {
                            return <img className='img-preview' key={img.src} style={{ height: 100, width: 100 }} src={img.src}></img>
                        })}
                    </div>
                    <div>
                        {this.state.isPredicting &&
                            <div>
                            <h4>Analyse</h4>
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                        }
                    </div>
                    <div className='column'>
                        <h2 style={{ color: '#000000' }}>Resultat</h2>
                        <h3>Image(s) diagnostiquée(s) à l’aide de l’intelligence artificielle</h3>
                        <div className='result-wrapper'>
                        {this.state.predicted.map((pred, i) => {
                            return (
                                <div className="result-container">
                               
                                {pred.failed ?
                                    <img className="img-preview" alt="Error occured" /> :
                                    <>
                                    
                                    <img
                                        key={pred.image.src}
                                        src={pred.image.src}
                                        className="img-preview"
                                    />
                                 

                                
                                   
                                    {pred.class==="Covid"?
                                        <div className='result-text-infected'>
                                            <strong>
                                            {pred.class} 
                                            {" "+this.getConfidancePercentage(pred.confidance)+"%"}
                                            </strong>
                                        </div>:
                                        pred.class==="Normal"?
                                        <div className='result-text-normal'>
                                            <strong>
                                            {pred.class} 
                                            {" "+this.getConfidancePercentage(pred.confidance)+"%"}
                                            </strong>
                                           

                                        </div>:<div></div>
                                        }

                                    </>}
                                </div>
                            )
                        })}
                        </div>
                        </div>
                    
                </div>
            </div>
                               
 </div>



         
            )
    }
};

export default withRouter(Chest);
