import { useState } from 'react';

export function useForm(defaultValues) {
	const [values, setValues] = useState(defaultValues);

	// this function handles the change of input values
	function handleChange(evt) {
		const { name, value } = evt.target;
		// this part updates the state with the new value. Notice how we use the spread operator to create a new object with the updated value
		setValues({ ...values, [name]: value });

	}
	function reset() {
		setValues(defaultValues);
	}
	
	return { values, setValues, handleChange, reset };
}
