
import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
	state = {
		isChecked: false,
	};
	
	toggleCheckboxChange = () => {
		const { handleCheckboxChange, drink } = this.props;
		
		this.setState(({ isChecked }) => (
			{
				isChecked: !isChecked,
			}
		));
		
		handleCheckboxChange(drink);
	};
	
	render() {
		const { drink } = this.props;
		const { isChecked } = this.state;
		
		return (
			<div className="checkbox">
				<label>
					<input
						type="checkbox"
						value={drink}
						checked={isChecked}
						onChange={this.toggleCheckboxChange}
					/>
					
					{drink.price}
				</label>
			</div>
		);
	}
}

Checkbox.propTypes = {
	drink: PropTypes.object.isRequired,
	handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;