import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class MyComponent extends Component {
    // static propTypes = {
    //     name:
    // }


    // const
    // name = 'noname';

    static defaultProps = {
        text: ''
    };

    // static defaultState = {
    //     name: 'n/a'
    // };

    constructor(props) {
        super(props);

        // this.setState({
            // name: '11'
        // });

        // this.props.name = 'noname';
        this.makeNoise = this.makeNoise.bind(this);
        this.countChars = this.countChars.bind(this);

        this.state = {
            text: '',
        }
    }

    propTypes: {
        text: React.PropTypes.string.isRequired,
    };

    countChars(e) {
        this.setState({
            text: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <textarea onChange={this.countChars} defaultValue={this.props.text} name="" id="" cols="30" rows="10"></textarea>
                <h3>{this.state.text.length}</h3>
            </div>
        )
    }
}

ReactDOM.render(<MyComponent/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
