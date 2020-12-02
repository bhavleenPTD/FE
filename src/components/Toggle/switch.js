import Switch from 'react-switch';
import PropTypes from 'prop-types';
import React from 'react';
class SwitchControl extends React.Component {
	componentWillMount() {}
	static propTypes = {
		value: PropTypes,
		onUpdate: PropTypes.func.isRequired,
	};
	static defaultProps = {
		value: '',
	};
	getValue() {
		//console.log('value', this.props.value);
		return JSON.parse(!this.props.value);
	}
	render() {
		const { value, onUpdate, index, ...rest } = this.props;
	//	console.log('props data', this.props);
		return [
			<Switch
				checked={value}
				key={index}
				onChange={() => onUpdate(this.getValue())}
			/>,
		];
	}
}

export default SwitchControl;