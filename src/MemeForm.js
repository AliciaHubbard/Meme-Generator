import React, {Component} from 'react';
import ReactDOM from "react-dom";
class MemeForm extends Component{

	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fileInput = React.createRef();
	}


	state = {
		topText: '',
		bottomText: '',
		image: '',
		width: '600',
		height: '600',
	}

	measureElementHeight = (element) => {
		const DOMNode = ReactDOM.findDOMNode(this.refs.image);
	  	return DOMNode.offsetHeight;
	}

	handleValueChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();

		var file = this.fileInput.current.files[0];

		var reader = new FileReader();

		reader.onload = (event) => {
		  this.setState({ image: event.target.result });

		  const canvas = this.refs.canvas;
	      const ctx = canvas.getContext("2d");
	  	  const image = this.refs.image;
		  // console.log(image);
		  const sizedWidth = image.clientWidth;
		  const originalHeight = image.naturalHeight;
		  const originalWidth = image.naturalWidth;

		  const sizedHeight = (sizedWidth/originalWidth) * originalHeight;
		  this.setState({ height: sizedHeight});

	  	  //ctx.drawImage(image, 0, 0)
		  ctx.drawImage(image, 0, 0, originalWidth, originalHeight, 0, 0, sizedWidth, sizedHeight);
          ctx.font = "30px Courier";
		  ctx.fillStyle = "white";
		  ctx.shadowOffsetX = 3;
      	  ctx.shadowOffsetY = 3;
		  ctx.shadowColor = "rgba(0,0,0,0.3)";
		  ctx.shadowBlur = 4;
          ctx.fillText(this.state.topText, 50, 50);
		  ctx.fillText(this.state.bottomText, 50, sizedHeight - 35);
		  var url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		  //var url = canvas.toDataURL("image/png");
		 // url = url.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
		  this.setState({ download: url});
		}

		reader.readAsDataURL(file);

	}

	// handleDownload = (e) => {
	// 	var canvas = this.refs.canvas
	// 	var dataURL = canvas.toDataURL('image/png');
    // 	this.setState({ download: dataURL});
	// 	console.log(dataURL);
	// 	link.click();
	// }

	render() {
      return (
		  <div className="formContainer">
			  <form onSubmit={this.handleSubmit} >
	  			<input
					type="text"
					name="topText"
					className="top-text"
					placeholder="Top Text"
					value={this.state.value}
					onChange={this.handleValueChange}
				/>
	  			<input
					type="text"
					name="bottomText"
					className="bottom-text"
					placeholder="Bottom Text"
					value={this.state.value}
					onChange={this.handleValueChange}
				/>

				<input type="file" ref={this.fileInput} />

				<input
					type="submit"
					value="Make It!"
				/>

	  		</form>
			<canvas ref="canvas" id="canvas" width={this.state.width} height={this.state.height}></canvas>
			<img className="meme-image" ref="image" src={this.state.image} alt="" height="auto" width='600'/>
			<a className="downlaod" id="download" href={this.state.download} download="meme.png" target="_blank">Download</a>
		</div>
      );
    }

};

export default MemeForm;
