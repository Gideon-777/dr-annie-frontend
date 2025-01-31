import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookShareCount,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

import {Link} from 'react-router-dom'
import image1 from './facebook.png'

class Footer extends Component {
	render() {


    const shareUrl = 'http://dr-annie.com/';
    const title = 'Application Gabonaise d\'E-sante.';

	return (
			<div className="page-footer font-small mdb-color darken-3 pt-4 f4">
			   <div class="footer-copyright text-center py-3">© 2020 Copyright:
			    <p> DR.ANNIE</p>
			    <p> Soutenez ce projet en le partageant dans l’un des réseaux suivants :</p>
			  </div>


        <div class="embed-responsive">

        <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="pw2 pa3"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
           &nbsp;&nbsp;&nbsp;

        <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton> 
          &nbsp;&nbsp;&nbsp;  


         <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          &nbsp;&nbsp;&nbsp;

          <div className="Demo__some-network__share-count">&nbsp;</div>

        </div>



</div>

		);
}
}
export default Footer; 