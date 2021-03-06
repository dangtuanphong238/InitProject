import React, { PureComponent, PropTypes } from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';
import RadioButton from './RadioButton';

export default class RadioGroup extends PureComponent {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        disabled: PropTypes.bool,
        selected: PropTypes.number,
        onChanged: PropTypes.func,
        style: View.propTypes.style,
    };

    static defaultProps = {
        elementType: 'RadioGroup',
        elementId: null,
        disabled: false,
        selected: -1,
        onChanged: (index) => { return true; },
        style: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            //..
        };

        this._len = 0;
        this._selected = props.selected;
        this.last_select_radio = null;

        try {
            if (!props.children) throw 'RadioGroup least need one RadioButton children!';
        }
        catch (err) {
            this.has_error = true;
            throw err;
        }
    }

    componentDidMount() {
        if (this._selected >= 0) {
            this.last_select_radio = this.refs[this.props.elementId + '_' + this._selected];
        }
    }

    shouldComponentUpdate(nextPorps, nextState) {
        return false;
    }

    componentWillReceiveProps(props) {
        if (props.selected < 0 || props.selected >= this._len) return;

        if (props.selected !== this._selected) {
            this._selected = props.selected;
            var radio = this.refs[this.props.elementId + '_' + this._selected];
            this._onSelect(radio);
        }

        if (props.disabled !== this.props.disabled) {
            for (var i = 0; i != this._len; i++) {
                var _radio = this.refs[this.props.elementId + '_' + i];
                if (_radio) _radio.setState({ disabled: true });
            }
        }
    }

    reset = () => {
        if (this.last_select_radio) {
            this.last_select_radio.setState({ checked: false });
            this.last_select_radio = null;
        }
    }

    select = (index) => {
        if (index < 0 || index >= this._len) return;

        if (index !== this._selected) {
            this._selected = index;
            var radio = this.refs[this.props.elementId + '_' + this._selected];

            if (this.last_select_radio) {
                if (this.last_select_radio === radio) return;
                else this.last_select_radio.setState({ checked: false });
                this.last_select_radio = null;
            }
            radio.setState({ checked: true });

            this.last_select_radio = radio;
        }

    }

    render() {
        if (this.has_error) return null;

        var { style, children, } = this.props;

        return (
            <View style={style}>
                {this._createElement(children)}
            </View>
        );
    }

    _createElement = (elements) => {
        return React.Children.map(elements, (element, index) => {
            if (typeof element !== 'object' || !element) return element;

            let props = {};
            if (element.props.elementType === 'RadioButton') {
                props.disabled = this.props.disabled;
                props.index = this._len++;
                props.ref = this.props.elementId + '_' + props.index;
                if (this._selected >= 0 && this._selected === props.index) {
                    props.checked = true;
                }
                props.onPress = (evt) => {
                    var radio = evt.target;
                    this._onSelect(radio);
                };
            }
            return React.cloneElement(element, {
                ...props,
                children: this._createElement(element.props.children)
            })
        });
    };

    _onSelect = (radio) => {
        if (this.last_select_radio) {
            if (this.last_select_radio === radio) return;
            else this.last_select_radio.setState({ checked: false });
            this.last_select_radio = null;
        }

        radio.setState({ checked: true });

        this._selected = radio.props.index;
        this.last_select_radio = radio;
        this.props.onChanged(this._selected);
    }
}