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

    constructor(props) {
        super(props);

        // this.props.name = 'noname';
        // this.makeNoise = this.makeNoise.bind(this);
        this.countChars = this.countChars.bind(this);

        this.state = {
            text: this.props.text,
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

    // limit message to 5 chars
    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.state.text.length > 5) {
            console.log('text has more than 5 chars');
            this.setState(prevState);
        }
    }

    render() {
        return (
            <div>
                <textarea onChange={this.countChars} defaultValue={this.props.text} name="" id="" cols="30" rows="10"></textarea>
                <h3>{this.state.text}</h3>
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
