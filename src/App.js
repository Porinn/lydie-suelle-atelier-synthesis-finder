import React from 'react';
import axios from 'axios';
import './App.css';

const MaterialSelect = (props) => {
  return(
    <select>
      {props.materials.map((item) => {
        return <option value={item.material}>{item.material}</option>;
      })}
    </select>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: [{material: '중화제 (청)', type: '(중화제)'}]
    }
  }

  componentDidMount() {
    axios.get('/api/getMaterials').then((response) => {
      this.setState({materials: response.data.result});
    });
  }

  render() {
    return (
      <div className="finder">
        <header className="finder-header">
          <img className="finder-logo" alt="logo" />
          <h1 className="finder-title">Atelier Lydie & Suelle Synthesis Finder</h1>
        </header>
        <div className="finder-body">
          <div className="finder-input">
            <MaterialSelect materials={this.state.materials} onChange={(material) => this.onChange(material)}/><span>{'>>>'}</span><MaterialSelect materials={this.state.materials} onChange={(material) => this.onChange(material)}/>
          </div>
          <div className="finder-result">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
