import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './table.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

var headers = [
    'book', 'author', 'language', 'published', 'sales'
];

var data = [
    ['The Lord Of the rings', 'tolkien', 'english', '1954', '1'],
    ['Le Petit Prince', 'sdfsdds', 'russian', '1966', '5'],
    ['He', 'Ride Haggard', 'English', '1887', '99'],
    ['Harry Potter', 'tolkien', 'english', '1954', '13'],
    ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '45'],
    ['She', 'H. Rider Haggard', 'English', '1887', '99'],
];

class Excel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: data,
            sortby: null,
            descending: false,
        };

        this._sort = this._sort.bind(this);
    }

    static defaultProps = {
        data: data,
        headers: headers
    };

    _sort(e) {
        var column = e.target.cellIndex;
        var data = this.state.data.slice();
        var descending = this.state.sortby === column && !this.state.descending;

        console.log(column);

        data.sort(function (a, b) {
            return descending
                ? (a[column] < b[column] ? 1 : -1)
                : (a[column] > b[column] ? 1 : -1);
        });

        /*
        // sort by integer
        if (column == 4) {
            console.log('sort by integer')

            data.sort(function (a, b) {
                if (a[column] === b[column]) return 0;
                return parseInt(a[column]) < parseInt(b[column]) ? -1 : 1;
            })
        } else {

            data.sort(function (a, b) {
                if (a[column] < b[column]) {
                    return -1
                }
                if (a[column] > b[column]) {
                    return 1
                }
                return 0
                // return a[column] < b[column] ? -1 : 1;
            });
        }
        */

        console.log(this.state.descending);

        this.setState({
            data: data,
            sortby: column,
            descending: descending
        });
    }

    render(): React.ReactNode {
        return (
            <table>
                <thead>
                <tr onClick={this._sort}>
                    {this.props.headers.map((title, idx) => {
                        if (this.state.sortby === idx) {
                            title += this.state.descending ? '\u2191' : '\u2193';
                        }
                        return <th key={idx}>{title}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {this.state.data.map(function (row, idx) {
                    return (
                        <tr key={idx}>
                            {
                                row.map(function (cell, idx) {
                                    return <td key={idx}>{cell}</td>
                                })
                            }
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }
}

/*
class MyComponent extends Component {

    static defaultProps = {
        text: ''
    };

    constructor(props) {
        super(props);

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
            this.setState(prevState);
        }
    }

    render() {
        var counter = null;
        if (this.state.text.length > 0) {
            counter = <Counter count={this.state.text.length}/>
        }
        return (
            <div>
                <textarea onChange={this.countChars} defaultValue={this.props.text} name="" id="" cols="30"
                          rows="10"></textarea>
                <h3>{this.state.text}</h3>
                {counter}
            </div>
        )
    }
}
class Counter extends Component {
    static defaultProps = {
        count: 0,
    };

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.log(nextProps);
        return false;
    }

    render(): React.ReactNode {
        return (
            <h3>{this.props.count}</h3>
        )
    }
}
*/


ReactDOM.render(<Excel/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
