import React from 'react';
import axios from 'axios';
import './App.css';

const MaterialSelect = (props) => {
  let items = props.materials.sort((a, b) => {
    return a.material < b.material ? -1 : a.material > b.material ? 1 : 0;
  });
  return(
    <select onChange={props.onChange}>
      {items.map((item) => {
        return <option value={item.material}>{item.material}</option>;
      })}
    </select>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: [],
      formulars: [],
      from: 'N/A',
      to: 'N/A',
      result: []
    }

    this.calculate = this.calculate.bind(this);
  }
  componentWillMount() {
    document.title = "Atelier Lydie & Suelle Synthesis Finder";
  }
  componentDidMount() {
    axios.get('/api/getData').then((response) => {
      this.setState({materials: response.data.materials, formulars: response.data.formulars});
    });
  }

  onChangeFrom(value) {
    this.setState({from: value})
  }
  onChangeTo(value) {
    this.setState({to: value});
  }
  calculate() {
    this.setState({result: ['loading...']}, () => {
      axios.post('/api/calculate', {
        from: this.state.from,
        to: this.state.to
      }).then((response) => {
        if (response.data.list !== undefined && response.data.list !== null) {
          if (response.data.list.length > 0) this.setState({result: response.data.list});
          else this.setState({result: ['결과가 존재하지 않습니다']});
        }
      })
    })
  }

  render() {
    return (
      <div className="finder">
        <header className="finder-header">
          <h1 className="finder-title">Atelier Lydie & Suelle Synthesis Finder</h1>
        </header>
        <div className="finder-body">
          <div className="finder-input">
            <MaterialSelect materials={this.state.materials} onChange={(e) => this.onChangeFrom(e.target.value)}/>
            <span>{'>>>'}</span>
            <MaterialSelect materials={this.state.formulars} onChange={(e) => this.onChangeTo(e.target.value)}/>
            <button onClick={this.calculate}>Find</button>
          </div>
          <div className="finder-result">
            {this.state.result.map((line) => <div>{line}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
