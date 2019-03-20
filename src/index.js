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

    _preSearchData: null;

    constructor(props) {
        super(props);

        this.state = {
            data: data,
            edit: null,
            sortby: null,
            descending: false,
        };

        this._sort = this._sort.bind(this);
        this._save = this._save.bind(this);
        this._showEditor = this._showEditor.bind(this);
        this._toggleSearch = this._toggleSearch.bind(this);
        this._search = this._search.bind(this);
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

        console.log(this.state.descending);

        this.setState({
            data: data,
            sortby: column,
            descending: descending,
            edit: null,
            search: false,
        });
    }

    _showEditor(e) {
        this.setState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
        console.log(this.state);
    };

    _save(e) {
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();
        data[this.state.edit.row][this.state.edit.cell] = input.value;
        this.setState({
            edit: null,
            data: data,
        });
    };

    _renderTable(e) {
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
                <tbody onDoubleClick={this._showEditor}>

                {this._renderSearch()}

                {this.state.data.map((row, rowidx) => {
                        return (
                            <tr key={rowidx}>
                                {
                                    row.map((cell, idx) => {
                                        var content = cell;

                                        var edit = this.state.edit;
                                        if (edit && edit.row === rowidx && edit.cell === idx) {
                                            content = (
                                                <form onSubmit={this._save}>
                                                    <input type="text" defaultValue={content}/>
                                                </form>
                                            )
                                        }

                                        return <td data-row={rowidx} key={idx}>{content}</td>
                                    })
                                }
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
        )
    }

    _toggleSearch(e) {
        if (this.state.search) {
            this.setState({
                data: this._preSearchData,
                search: false,
            });
            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;
            this.setState({
                search: true,
            })
        }

        this.setState({
            search: !this.state.search,
        })
    }

    _search(e) {
        var needle = e.target.value.toLowerCase();
        if (!needle) {
            this.setState({
                data: this._preSearchData
            });
            return;
        }
        var idx = e.target.dataset.idx;
        var searchdata = this._preSearchData.filter(function (row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        this.setState({
            data: searchdata,
        });
    }

    _renderSearch() {
        if (!this.state.search) {
            return null;
        }

        return (
            <tr onChange={this._search}>
                {this.props.headers.map((_ignore, idx) => {
                        return <td key={idx}>
                            <input type="text" data-idx={idx}/>
                        </td>
                    }
                )}
            </tr>
        )
    }

    _renderToolbar() {
        return (
            <button onClick={this._toggleSearch} className='toolbar'>search</button>
        )
    }

    render() {
        return (
            React.createElement("div",
                null,
                this._renderToolbar(),
                this._renderTable(),
            )
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
