//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// - Form Element with built in HTML5 validation integrated
////   BOOTSTRAP.CSS IS REQUIRED FOR ERROR LABELS
//// -----------------------------------------------------------------
//// Usage:
//// <Form submit={this.handleSubmitMethod}>
////
////  	========================================================================
//// 	*** INPUTS ***
////  	========================================================================
////	<div>
//// 		<input
//// 			className="form-control" 			<- REQUIRED: [.form-control] is required to display/hide error labels
//// 			type="email" 						<- self-explanatory
//// 			required="true" 					<- REQUIRED: lets Form whether to validate input or not
//// 			minLength={ int } 					<- min-length
//// 			pattern={ **RegEx** } 				<- Formatting to check
////		/>
//// 		<div className="invalid-feedback" />	<- REQUIRED
//// 	</div>
////
////  	========================================================================
//// 	*** DROPDOWNS ***
////  	========================================================================
//// 	<div className="formElements__group">
//// 		<label className="formElements__label">Select School</label>
//// 		<select
//// 			value={this.state.inputSchoolID || "placeholderVal"}
//// 			onChange={(evt) => {
//// 				this.setState({
//// 					inputSchoolID: evt.target.value
//// 				});
//// 			}}
//// 			className="w-100 formElements__dropdown"
//// 			required
//// 		>
//// 			<option value="placeholderVal" disabled>
//// 				Select your option
//// 			</option>
//// 			{getLastArrayItem(this.props.registration).getSchoolListData
//// 				? getLastArrayItem(this.props.registration).getSchoolListData.map((item, index) => {
//// 						return (
//// 							<option key={index} value={item.id}>
//// 								{item.name}
//// 							</option>
//// 						);
//// 				  })
//// 				: null}
//// 		</select>
//// 		<div className="fixedDropdownErrorMsg">Please select an option.</div>
//// 	</div>
////
////  	========================================================================
////	*** RADIO BOXES (Only allows one opt to be selected)
//// 	**** REQUIRED CLASSES: .js-multiInputWrapper,  .js-isRequired, .formElements__group
////  	========================================================================
////	<div className="js-multiInputWrapper js-isRequired w-100 formElements__group">
////		<label className="formElements__label">Gender</label>
////		<div
////			className="row no-gutters"
////			onChange={(evt) => {
////				this.setState({ inputGender: evt.target.value });
////			}}
////		>
////			<label className="col-6 formElements__radio_itemWrapper">
////				<input
////					type="radio"
////					checked={this.state.inputGender == "" ? false : null}
////					name="gender"
////					value="male"
////					className="formElements__radio_defaultRadio"
////				/>
////				<div className="formElements__radio_customRadio" />
////				<div className="formElements__radio_label">Male</div>
////			</label>
////			<label className="col-6 formElements__radio_itemWrapper">
////				<input
////					type="radio"
////					checked={this.state.inputGender == "" ? false : null}
////					name="gender"
////					value="female"
////					className="formElements__radio_defaultRadio"
////				/>
////				<div className="formElements__radio_customRadio" />
////				<div className="formElements__radio_label">Female</div>
////			</label>
////		</div>
////		<div className="fixedDropdownErrorMsg">Please select an option.</div>
////	</div>
////
////  	========================================================================
////	*** CHECKBOXES (Supports multiple selection)
//// 	**** REQUIRED CLASSES: .js-multiInputWrapper,  .js-isRequired, .formElements__group
////  	========================================================================
////	<div className="js-multiInputWrapper js-isRequired w-100 formElements__group">
////		<label className="formElements__label">Select the required trips</label>
////		<div
////			className="row no-gutters"
////			onChange={(evt) => {
////				this.handleShiftPushIntoArray(evt);
////			}}
////		>
////			<label className="col-6 formElements__checkbox_itemWrapper">
////				<input
////					type="checkbox"
////					checked={this.state.inputTripDayShift == "" ? false : null}
////					value="AM"
////					className="formElements__checkbox_defaultCheckbox"
////				/>
////				<div className="formElements__checkbox_customCheckbox" />
////				<div className="formElements__checkbox_label label__twoLine">
////					<p className="header--16">Morning</p>
////					<p>Bus to School</p>
////				</div>
////			</label>
////			<label className="col-6 formElements__checkbox_itemWrapper">
////				<input
////					type="checkbox"
////					checked={this.state.inputTripDayShift == "" ? false : null}
////					value="PM"
////					className="formElements__checkbox_defaultCheckbox"
////				/>
////				<div className="formElements__checkbox_customCheckbox" />
////				<div className="formElements__checkbox_label label__twoLine">
////					<p className="header--16">Afternoon</p>
////					<p>Bus from School</p>
////				</div>
////			</label>
////		</div>
////		<div className="fixedDropdownErrorMsg">Please select an option.</div>
////	</div>
////
////
////  	========================================================================
//// 	*** SUBMIT BTN ***
////  	========================================================================
//// 	<button type="submit">Log In</button>
//// </Form>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./Form.scss";

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isValidated: false,
			formSubmitted: false
		};
	}

	// Can be runned externally to reset form states, via Ref
	// e.g. this.formEl.resetToInitialState();
	resetToInitialState = () => {
		setTimeout(() => {
			this.setState({ isValidated: false });
		}, 10);
	};

	componentDidMount() {
		// Alias
		let elBtn = document.querySelectorAll("button[type=submit]");

		// Attach an eventListener to every submit button to check for [is--disabled]
		Array.from(elBtn).forEach((item) => {
			item.addEventListener("click", this.handleSubmitBtnClick);
		});
	}

	componentWillUnmount() {
		let elBtn = document.querySelectorAll("button[type=submit]");

		// Remove eventListeners attached to every submit button
		Array.from(elBtn).forEach((item) => {
			item.removeEventListener("click", this.handleSubmitBtnClick);
		});
	}

	componentDidUpdate(prevProps) {
		// Remove any error messages / error borders if dropdown has been selected (since it triggers a state update)
		for (let i = 0; i < this.formEl.length; i++) {
			// Target dropdown inputs
			if (this.formEl[i].tagName == "SELECT" && this.formEl[i].required && this.formEl[i].value != "placeholderVal") {
				// Triggers when value is no longer default (placeholderVal)
				this.formEl[i].parentNode.querySelector(".fixedDropdownErrorMsg").classList.remove("d-block");
				this.formEl[i].classList.remove("is--error");
			}

			// Target date inputs
			if (this.formEl[i].classList.contains("formElements__date") && this.formEl[i].value != "") {
				// Target the closest [formElements__group] and search for its own
				// corresponding fixedDropdownErrorMsg toggle off hidden state
				this.formEl[i]
					.closest(".formElements__group")
					.querySelector(".fixedDropdownErrorMsg")
					.classList.remove("d-block");
				// Add red borders
				this.formEl[i].classList.remove("is--error");
			}

			// Target multiple-select inputs (checkbox, radio)
			if (this.formEl[i].type == "checkbox" || this.formEl[i].type == "radio") {
				if (
					this.formEl[i].closest(".js-multiInputWrapper").classList.contains("js-isRequired") &&
					this.formEl[i].closest(".js-multiInputWrapper").classList.contains("is--error")
				) {
					this.formEl[i]
						.closest(".js-multiInputWrapper")
						.querySelectorAll("input[type=checkbox], input[type=radio]")
						.forEach((item, index) => {
							// If at least an item is checked, remove is-error class from the parent
							if (item.checked) {
								// Remove error borders
								item.closest(".js-multiInputWrapper").classList.remove("is--error");
								// Remove error message
								this.formEl[i]
									.closest(".js-multiInputWrapper")
									.querySelector(".fixedDropdownErrorMsg")
									.classList.remove("d-block");
							}
						});
				}
			}
		}

		// Check when form has been submitted, and reset back any existing error states
		if (this.state.formSubmitted && this.state.isValidated) {
			this.setState({
				isValidated: false,
				formSubmitted: false
			});
		}
	}

	handleSubmitBtnClick = (evt) => {
		// Escape form submit if button has [is--disabled]
		if (evt.target.classList.contains("is--disabled")) {
			evt.preventDefault();
		}
	};

	/**
	 * Them main function that validates the form and fills in the error messages.
	 * @returns bool Returns a boolean showing if the form is valid for submission or not.
	 **/
	validate = () => {
		//this.formEl is a reference in the component to the form DOM element.
		const formEl = this.formEl;
		const formLength = formEl.length;

		/*
    * The checkValidity() method on a form runs the
    * html5 form validation of its elements and returns the result as a boolean.
    * It returns 'false' if at least one of the form elements does not qualify,
    * and 'true', if all form elements are filled with valid values.
    */
		if (formEl.checkValidity() === false) {
			for (let i = 0; i < formLength; i++) {
				//the i-th child of the form corresponds to the forms i-th input element
				const elem = formEl[i];
				/*
        * errorLabel placed next to an element is the container we want to use
        * for validation error message for that element
        */
				const errorLabel = elem.parentNode.querySelector(".invalid-feedback");

				/*
        * A form element contains also any buttuns contained in the form.
        * There is no need to validate a button, so, we'll skip that nodes.
        */
				if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
					/*
          * Each note in html5 form has a validity property.
          * It contains the validation state of that element.
          * The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
          * If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
          * We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
          */
					if (!elem.validity.valid) {
						errorLabel.textContent = elem.validationMessage;
					} else {
						errorLabel.textContent = "";
					}
				}
			}

			//Return 'false', as the formEl.checkValidity() method said there are some invalid form inputs.
			return false;
		} else {
			//The form is valid, so we clear all the error messages
			for (let i = 0; i < formLength; i++) {
				const elem = formEl[i];
				const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
				if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
					errorLabel.textContent = "";
				}
			}

			//Return 'true', as the form is valid for submission
			return true;
		}
	};

	validateDropdown = () => {
		// Let the default be true
		let isValid = true;
		// Used to compare checked radio boxes vs number of radio parent elements with [.js-isRequired]
		let compulsoryRadioParents = [];
		let compulsoryRadioChecked = [];

		for (let i = 0; i < this.formEl.length; i++) {
			// Check dropdown inputs
			if (this.formEl[i].tagName == "SELECT" && this.formEl[i].required && this.formEl[i].value == "placeholderVal") {
				// If validation fails
				isValid = false;

				this.formEl[i].parentNode.querySelector(".fixedDropdownErrorMsg").classList.add("d-block");
				this.formEl[i].classList.add("is--error");
			}

			// Check date inputs
			if (this.formEl[i].classList.contains("formElements__date") && this.formEl[i].value == "") {
				// If validation fails
				isValid = false;

				// Target the closest [formElements__group] and search for its own
				// corresponding fixedDropdownErrorMsg toggle off hidden state
				this.formEl[i]
					.closest(".formElements__group")
					.querySelector(".fixedDropdownErrorMsg")
					.classList.add("d-block");
				// Add red borders
				this.formEl[i].classList.add("is--error");
			}

			// Check multiple-select inputs (checkbox, radio)
			if (this.formEl[i].type == "checkbox" || this.formEl[i].type == "radio") {
				// Check if the parentWrapper of the multi-inputs contain the class [.js-isRequired]
				if (this.formEl[i].closest(".js-multiInputWrapper").classList.contains("js-isRequired")) {
					// Make the form invalid first, so that subsequent checks makes the form valid instead
					// Add error borders
					this.formEl[i].closest(".js-multiInputWrapper").classList.add("is--error");
					// Show error message
					this.formEl[i]
						.closest(".js-multiInputWrapper")
						.querySelector(".fixedDropdownErrorMsg")
						.classList.add("d-block");

					// Loop through all children input elements to check if theres at least one checked
					this.formEl[i]
						.closest(".js-multiInputWrapper")
						.querySelectorAll("input[type=checkbox], input[type=radio]")
						.forEach((item, index) => {
							// If at least an item is checked, remove is-error class from the parent
							if (item.checked) {
								// Remove error borders
								item.closest(".js-multiInputWrapper").classList.remove("is--error");
								// Remove error message
								this.formEl[i]
									.closest(".js-multiInputWrapper")
									.querySelector(".fixedDropdownErrorMsg")
									.classList.remove("d-block");
							}
						});
				}
			}

			// Check for radio boxes only
			if (this.formEl[i].type == "radio") {
				if (this.formEl[i].closest(".js-multiInputWrapper").classList.contains("js-isRequired")) {
					// Check for [name] attr inside each of the radio buttons,
					// and add into an array to check for validation,
					// ONLY if the name does not exist in the array (remove any duplicates)
					if (compulsoryRadioParents.indexOf(this.formEl[i].name) === -1) {
						compulsoryRadioParents.push(this.formEl[i].name);
					}

					// Look for checked radio buttons, and to also add them into
					// the array only if they are not from the same [name] attr family
					this.formEl[i]
						.closest(".js-multiInputWrapper")
						.querySelectorAll("input[type=radio]")
						.forEach((item, index) => {
							if (item.checked) {
								if (compulsoryRadioChecked.indexOf(item.name) === -1) {
									compulsoryRadioChecked.push(item.name);
								}
							}
						});

					// If the count does not tally, it means somewhere out there,
					// theres a parent with classes [.js-isRequired] that does not have a checked child.
					// In that case park valid as false to prevent form submit
					if (compulsoryRadioParents.length == compulsoryRadioChecked.length) {
						isValid = true;
					} else {
						isValid = false;
					}
				}
			}

			// -
			// Final Loop
			// -
			if (i == this.formEl.length - 1) {
				// Only return on the last loop to prevent function from exiting prematurely
				return isValid;
			}
		}
	};

	/**
	 * This is the method that is called on form submit.
	 * It stops the default form submission process and proceeds with custom validation.
	 **/
	submitHandler = (event) => {
		event.preventDefault();

		//If the call of the validate method was successful, we can proceed with form submission. Otherwise we do nothing.
		if (this.validate() && this.validateDropdown()) {
			this.props.submit();

			// Prevent any error states peristing on inputs even after submitting
			this.setState({
				formSubmitted: true
			});
		} else {
			this.validateDropdown();
		}

		this.setState({ isValidated: true });
	};

	/**
	 * Render the component as a regular form element with appended children from props.
	 **/
	render() {
		const props = [...this.props];

		//Add bootstrap's 'was-validated' class to the forms classes to support its styling
		let classNames = [];

		if (props.className) {
			classNames = [...props.className];
			delete props.className;
		}

		if (this.state.isValidated) {
			classNames.push("was-validated");
		}

		//The form will have a refference in the component and a submit handler set to the component's submitHandler
		return (
			<form
				{...props}
				className={classNames}
				noValidate="noValidate"
				ref={(form) => (this.formEl = form)}
				onSubmit={this.submitHandler}
				onChange={this.props.onChange}
			>
				{this.props.children}
			</form>
		);
	}
}

export default Form;
