import React, { Component } from 'react';
import './Keyboard.css';
import { notes } from './notes';
import { playSound } from './sounds'

class Keyboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      context: new AudioContext(),
      waveType: 'sine',
      release: 2,
      pressedKeyCodes: [],
      octaveNumber: 2,
    };

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleOctaveChange = this.handleOctaveChange.bind(this)
  }

  handleKeyPress(e) {

    if (e.repeat) { return }

    const keyCodes = [65, 83, 68, 70, 71, 72, 74, 75, 76]
    const freqs1 = [notes.C3, notes.D3, notes.E3, notes.F3, notes.G3, notes.A3, notes.B3, notes.C4, notes.D4]
    const freqs2 = [notes.C4, notes.D4, notes.E4, notes.F4, notes.G4, notes.A4, notes.B4, notes.C5, notes.D5]
    const freqs3 = [notes.C5, notes.D5, notes.E5, notes.F5, notes.G5, notes.A5, notes.B5, notes.C6, notes.D6]

    let activeOctave = []
    if (this.state.octaveNumber === 1) {
      activeOctave = freqs1
    }
    if (this.state.octaveNumber === 2) {
      activeOctave = freqs2
    }
    if (this.state.octaveNumber === 3) {
      activeOctave = freqs3
    }

    for (let i in keyCodes) {
      if (e.keyCode === keyCodes[i]) {
        this.setState(prevState => ({
          pressedKeyCodes: [...prevState.pressedKeyCodes, e.keyCode]
        }))
        playSound(this.state.context, {
          freq: activeOctave[i],
          type: this.state.waveType,
          release: this.state.release,
        })
      }
    }
  }

  handleKeyUp(e) {
    let oldArray = this.state.pressedKeyCodes
    let newArray = oldArray.filter((code) => {
      return code !== e.keyCode
    })
    this.setState({ pressedKeyCodes: newArray })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  }

  handleOctaveChange(change) {
    let oldNum = this.state.octaveNumber
    let newNum = oldNum + change

    this.setState({ octaveNumber: newNum })
  }

  render() {
    return (
      <div className="Keyboard">
        
        <div>
          <input type="radio" name="wave" value="sine"
            checked={this.state.waveType === "sine"}
            onChange={() => { this.setState({ waveType: "sine" })}}
            />
          <label >Sine</label>

          <input type="radio" name="wave" value="square"
            checked={this.state.waveType === "square"}
            onChange={() => { this.setState({ waveType: "square" }) }}
            />
          <label >Square</label>

          <input type="radio" name="wave" value="triangle"
            checked={this.state.waveType === "triangle"}
            onChange={() => { this.setState({ waveType: "triangle" }) }}
          />
          <label >Triangle</label>

          <input type="radio" name="wave" value="sawtooth"
            checked={this.state.waveType === "sawtooth"}
            onChange={() => { this.setState({ waveType: "sawtooth" }) }}
          />
          <label >Sawtooth</label>
        </div>

        <div>
          <input type="range" min="0" max="5" step="0.1"
            value={this.state.release}
            onChange={(e) => {
              this.setState({ release: Number(e.target.value) });
            }}>
          </input>
          <label >{this.state.release}</label>
        </div>

        <div>
          <button onClick={() => this.handleOctaveChange(1)}>Octave Up</button>
          <button onClick={() => this.handleOctaveChange(-1)}>Octave Down</button>
          <label >{this.state.octaveNumber}</label>
        </div>
        
        <div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(65) ? 'pressed' : ''}`}>A</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(83) ? 'pressed' : ''}`}>S</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(68) ? 'pressed' : ''}`}>D</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(70) ? 'pressed' : ''}`}>F</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(71) ? 'pressed' : ''}`}>G</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(72) ? 'pressed' : ''}`}>H</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(74) ? 'pressed' : ''}`}>J</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(75) ? 'pressed' : ''}`}>K</div>
          <div className={`key white ${this.state.pressedKeyCodes.includes(76) ? 'pressed' : ''}`}>L</div>
        </div>

      </div>
    );
  }
}

export default Keyboard;
