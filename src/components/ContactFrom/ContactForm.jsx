import { Formik, Form, Field } from "formik";
import { useId } from "react";
import { ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import * as Yup from "yup";

const objSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required")
    .matches(/^[a-zA-Z]+$/, "Only Latin letters allowed"),
  number: Yup.string()
    .min(3, "Too short number!")
    .max(12, "Too long!")
    .required("Requaired"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={objSchema}
    >
      <Form className="flex flex-col mb-5 border-2 border-black rounded p-5">
        <label htmlFor={nameId} className="font-medium">
          Name
        </label>
        <Field
          type="text"
          name="name"
          id={nameId}
          className="border border-black rounded  outline-none"
        />
        <ErrorMessage
          className="text-red-600 mb-5"
          name="name"
          component="span"
        />

        <label htmlFor={numberId} className="font-medium">
          Number
        </label>
        <Field
          type="text"
          name="number"
          id={numberId}
          className="border border-black rounded outline-none mb-5 "
        />
        <ErrorMessage className="text-red-600" name="number" component="span" />

        <button
          type="submit"
          className="bg-green-500 
            border rounded border-slate-950 h-7 p-1 flex justify-center
            items-center hover:bg-green-600 transition-all"
        >
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
