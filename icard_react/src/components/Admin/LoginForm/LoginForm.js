import React from 'react';
import { Button, Field, Fieldset, Input } from "@chakra-ui/react";
import { PasswordInput } from "../../ui/password-input";
import { useFormik } from "formik";
import * as Yup from "yup";
import {loginApi} from "../../../api/user";
import './LoginForm.scss'; // Mantengo tus estilos

export function LoginForm() {
  const formik = useFormik({
    initialValues: initialValues(), // Corrige el nombre de la función
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        console.log(formik.values.email)
        console.log(formik.values.password)
        const response = await loginApi(formValue);
        console.log(response);
      } catch (error) {
        console.log("ERROR");
        console.log(error);
        
      }
    },

  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-form-admin">
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root invalid={formik.errors.email} required={true}>
            <Field.Label>Email address</Field.Label>
            <Input
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              value={formik.values.email} // Cambia "name" por "email"
              onChange={formik.handleChange}
              error={"error de formato"}
            />
          </Field.Root>

          <Field.Root invalid={formik.errors.password} required={true}>
            <PasswordInput
              name="password"
              placeholder="Contraseña"
              size="md"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={"error de formato"}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit">
          Iniciar sesión
        </Button>
      </Fieldset.Root>
    </form>
  );
}

function initialValues() {
  return {
    email: "", // Corrige "name" por "email" y el typo en el email
    password: "",
  };
}

function validationSchema(){
  return{
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}





// validationSchema: Yup.object({ // Opcional: validación básica
//   email: Yup.string().email("Email inválido").required("Requerido"),
//   password: Yup.string().required("Requerido"),
// }),