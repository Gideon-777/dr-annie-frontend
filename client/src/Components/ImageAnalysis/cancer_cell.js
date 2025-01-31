import React, { useRef } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import * as tf from '@tensorflow/tfjs'
import './imgscan.css'
import { max } from '@tensorflow/tfjs';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css" 
import Loader from 'react-loader-spinner'


class ImageClassifier extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            files: null,
            images: [],
            currFileIndex: 0,
            isPredicting: false,
            predicted: [],
            isDetecting: false,
            detected: [],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.myRef = React.createRef();
        this.predict = this.predict.bind(this)
        this.predictAll = this.predictAll.bind(this)
        this.classify = this.classify.bind(this)
        this.classifyAll = this.classifyAll.bind(this)
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
        // try {
        //     this.model = await tf.loadLayersModel('http://localhost:5000/catdog/model.json');
        // } catch (e) {
        //     alert('Unable to load the prediction model')
        // }
    }


    handleChange(event) {
        this.setState({
            images: [],
        })
        console.log(this.state.images)
        let files = event.target.files
        console.log(this.myRef.current.files)
        if (this.state.images.length > 9) {
            alert("You cant upload more than 9 images at once!")
        } else {
            this.setState({
                //images: [...this.myRef.current.files],
                //images: [...this.state.images, ...this.myRef.current.files],
                files: files,
                currFileIndex: 0
            })
            var out = []
            for (var i = 0; i < this.myRef.current.files.length; i++) {
                out.push(this.myRef.current.files[i])
            }
        }
    }


    async predictAll() {
        this.setState({ loading: true})
        const images = this.state.images
        this.setState({ isPredicting: true })
        // for (var i = 0; i < images.length; i++) {
        await this.predict()
        // }
        this.setState({ isPredicting: false, loading: false })
    }

    
    async classifyAll() {
        this.setState({ loading: true})
        const images = this.state.images
        this.setState({ isDetecting: true })
        await this.classify()

        this.setState({ isDetecting: false, loading: false })
    }

    async predict() {
        const fd = new FormData();

        let files = this.myRef.current.files
        for (let i = 0; i < files.length; i++) {
            fd.append(`images[${i}]`, files[i])
        }

        axios
        // .post(" http://178.128.0.86/api/v1/detection", fd, {
        .post(" http://127.0.0.1:5000/api/v1/detection", fd, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("LOGGING COMMENT")
            console.log(response.data.Prediction)
            let result = response.data
            const mapper = ["0","1","2","3","4","5","6","7","8"]
            
            let maxIndex = 8;

            let update = this.state.detected.slice()
            update.push({
                image: result,
                class:mapper[maxIndex],
                confidance: result
            })
            console.log(response.data.Prediction)
            console.log(typeof(response.data.Prediction))
            this.setState({ detected: response.data.Prediction })
            console.log(this.state.detected)
            return response;
          });

    }


    async classify() {
        const fd = new FormData();

        let files = this.myRef.current.files
        for (let i = 0; i < files.length; i++) {
            fd.append(`images[${i}]`, files[i])
        }

        axios
        // .post(" http://178.128.0.86/api/v1/classification", fd, {
        .post(" http://127.0.0.1:5000/api/v1/classification", fd, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            let result = response.data
            const mapper = ["0","1","2","3","4","5","6","7","8"]
            
            let maxIndex = 8;

            let update = this.state.predicted.slice()
            update.push({
                image: result,
                class:mapper[maxIndex],
                confidance: result
            })
            console.log(response.data.Prediction)
            console.log(typeof(response.data.Prediction))
            this.setState({ predicted: response.data.Prediction })
            console.log(this.state.predicted)
            
            return response;
          });


    }


    preprocessImage(image) {
        let tensor = tf.browser.fromPixels(image)
            .resizeNearestNeighbor([200, 200])
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
            predicted: [],
			detected: [],
            predictionText: [],
        })
    }

    getConfidancePercentage(value){
        return Math.trunc(value*10000)/100
    }


    render() {
        return (
            <div>
                {this.state.loading && <Loader
                type="ThreeDots"
                color="#FF0000"
                height={500}
                width={500}
                timeout={1000000} //3 secs
        
            />}

                <h1 style={{ color: '#000000' }}>VEUILLEZ SÉLECTIONNER LES IMAGES À DIAGNOSTIQUER</h1>
                <h3 style={{ color: '#000000' }}>Histopathologie mammaire à partir de l’intelligence artificielle</h3>
                <div className='center-content'>
                    <div className='button-container center-content'>

                        <label className="myLabel">
                            <input type="file"
                                required
                                ref = {this.myRef}
                                onChange={this.handleChange}
                                multiple
                                accept="image/*"
                            />
                            <span>
                                <i style={{ marginRight: 5 }} class="fa fa-upload" aria-hidden="true"></i>
                                Choisir
                            </span>
                        </label>

                        <button
                            disabled={this.state.images.length === 0}
                            className="actionButton predict" onClick={this.classifyAll}
                        >
                            <i style={{ marginRight: 5 }} class="fa fa-adjust" aria-hidden="true"></i>
                            <span>Analyse</span>
                        </button>

                        <button
                            disabled={this.state.images.length === 0}
                            onClick={this.delete}
                            className="actionButton delete"
                        >
                            <i style={{ marginRight: 5 }} class="fa fa-trash" aria-hidden="true"></i>
                            <span>Supprimer</span>
                        </button>

                    </div>
                </div>


                <div className='column-wrapper'>
                    <div className='column'>
                        <h3 style={{ color: '#000000' }}>Images originales</h3>
                        <h5>Vous pouvez choisir jusqu’a 5 images</h5>
                        {this.state.images.map((img, i) => {
                            return <img className='img-preview' key={img.src} style={{ height: 150, width: 150 }} src={img.src}></img>
                        })}
                    </div>
                    <div>
                        {this.state.isPredicting &&
                            <div>
                            <h4>Prediction</h4>
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                        }
                    </div>


                    <div className='column'>
                        <h3 style={{ color: '#000000' }}>Résultats</h3>
                        <h5>Diagnostic à l’aide de l’intelligence artificielle</h5>
                        <div className='result-wrapper'>

                                {this.state.predicted ?
                                        <div>
                                        {this.state.predicted.map(img => (
                                            <div>
                                                <img className='img-preview' key={img.path} style={{ height: 150, width: 150 }} src={img.path}></img>
                                                <h4 style={{ color: '#000000' }}>{img.label}</h4>
                                           </div>
                                        ))}

                                      </div> :
                                    <>
                                    <h1>No data yet</h1>



                                    </>}

                            </div>
                    </div>



                </div>
            </div>)
    }
};

export default withRouter(ImageClassifier);
