import { ChangeEvent, FormEvent, useState } from "react";

/**
 * This hook is used to handle forms. It takes an `object` as the initial
 * 	state, which defines every `<input>` field in the form and it returns the
 * 	current value of the form's entries, along with other functions to
 * 	handle the state of the form.
 *
 * @param initialState An object containing the value of every `<input>`
 * 	field in the form. It is important that the `<input>`'s `id` and the field
 * 	name share the same name.
 * @param submitCallback A callback function that runs when the `handleSubmit`
 * 	function (that comes with the return) is called. If you want the form
 * 	to reset after being submitted. By default, this callback does not need
 * 	to return anything, but if you want the form to reset after being
 * 	submitted, you can make it return `true`.
 * @returns An `array` with these four things (in this same order):
 * 	- An object` containing the current values of every input field in the
 * 		form.
 * 	- A `function` that can handle the change of the `<input>` fields. It
 * 		requires the `id` of the `<input>` field to be the same as one of the
 * 		keys in the `initialState` object.
 * 	- A `function` that can handle the submission of the form. It cancels
 * 		the default behavior of the form, and runs the `submitCallback()`.
 * 		Remember you can make this callback return `true` to reset the form
 * 		after being submitted.
 * 	- A `function` that can resets the form's values to its original state.
 *
 * @example
 * //Inside a React component:
 * const [form, handleChange, handleSubmit, reset] = useForm(
 *   {
 *     "input-name": "",
 *     "input-pass": ""
 *   }, (v) => {
 *     //log form values
 *     console.log(v["input-name"]);
 *     console.log(v["input-pass"]);
 *     //If you want to reset the form after being submitted...
 *     return true;
 *     //...else not. Your call.
 *   }
 *
 * return (
 *   //Use the function returned from the hook
 *   <form onSubmit={handleSubmit}>
 *     //Use the function returned from the hook. IDs  and values
 *     //attributes are the same as the key in the initialState object.
 *     <input
 *        type="text"
 *        id="input-name"
 *        onChange={handleChange}
 *        value={form["input-name"]} />
 *     <input
 *       type="password"
 *       id="input-pass"
 *       onChange={handleChange}
 *       value={form["input-pass"]} />
 *   </form>
 * )
 */
export const useForm = <T>(
	initialState: T,
	submitCallback?: (values: T) => void | true
) => {
	const [values, setValues] = useState(initialState);

	const reset = () => setValues(initialState);

	const handleSubmit = (ev: FormEvent) => {
		ev.preventDefault();
		const resetForm = submitCallback && submitCallback(values);
		resetForm && reset();
	};

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = ev.target;
		setValues({ ...values, [id]: value });
	};

	return [values, handleChange, handleSubmit, reset] as const;
};
