import React from 'react';
import Header from './components/Header/Header';
import FileUpload from './components/FileUpload/FileUpload';
import PMSDisplay from './components/PMSDisplay/PMSDisplay';
import Clarifai from 'clarifai';
import pantones from './pantones.json';
import cd from 'color-difference';
import './App.scss';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '23f21918533f49279e545b219f9598ed'
});

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      picURL: '',
      colors: [],
      loading: false,
    }
  }

  onUpload = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({picURL: e.target.result, loading: true});
      this.getcolors(reader.result.substr(reader.result.search('base64,') + 7));
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  getcolors = async(file) => {
    try {
      const response = await app.models.predict("eeed0b6733a644cea07cf4c60f87ebb7", file);
      const colors = await response.outputs[0].data.colors;
      console.log("response", response);
      const filtered = colors.map( (value) => [value.value, value.raw_hex, this.closestPantone(value.raw_hex)] );
      filtered.sort( function(a, b) {
        return (a[0] - b[0]) || (a[1] - b[1]);
      }).reverse();
      this.setState({colors: filtered, loading: false});
    } catch(err){
      console.log("error: ", err);
    };
  }

  closestPantone = (hex) =>{
    let lowestDist = 100;
    let pms = "100"
    for (let key of pantones) {
      let distance = cd.compare(key.HTML, hex);
      if(distance < lowestDist){
        lowestDist = distance;
        pms = key.PMS;
      }
    }
    return pms
  }

  render(){
    return (
      <div className="App">
        <Header />
        <section className="bg-near-white br4 mw8 center pv4">
        <div className="mw-100 center ph3-ns">
          <div className="cf ph2-ns">
            <FileUpload onUpload={this.onUpload} picURL={this.state.picURL} />
            <PMSDisplay colors={this.state.colors} picURL={this.state.picURL} loading={this.state.loading} />
          </div>
        </div> 
        </section>
      </div>
    );
  }
}

export default App;
