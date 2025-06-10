import * as Form from "@radix-ui/react-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { RegisterFormData } from "../types/formData";
import { useAppDispatch } from "../custom hooks/useAppDispatch"
import { registerUser } from "../features/auth/authReducer";


function Register() {

  //Redirecting the user to the homepage 
  const navigate = useNavigate();
  //dispatch function from redux toolkit
  const dispatch = useAppDispatch();
  //form logic from react hook form
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  //connection to the mock rest API to handle login
  const onSubmit = async (data: RegisterFormData) => {

    const redirect = await dispatch(registerUser(data));

    if(registerUser.fulfilled.match(redirect)){
      navigate('/home');
    }else{
      console.error('register failed', redirect.payload);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 p-6">
      <Form.Root
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        method="GET"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">Register</h2>

        <Form.Field className="mb-6" name="email">
          <div className="flex justify-between items-baseline mb-1">
            <Form.Label className="text-lg font-medium text-gray-700">Email</Form.Label>
            <Form.Message className="text-sm text-red-600" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="text-sm text-red-600" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              type="email"
              required
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              })}
            />
          </Form.Control>
          { errors.email && (
            <span className="text-sm text-red-600 bg-red-100 p-3">{ errors.email.message }</span>
          )}
        </Form.Field>

        <Form.Field className="mb-6" name="password">
          <div className="flex justify-between items-baseline mb-1">
            <Form.Label className="text-lg font-medium text-gray-700">Password</Form.Label>
            <Form.Message className="text-sm text-red-600" match="valueMissing">
              Please enter your password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Min 6 characters",
                },
              })}
            />
          </Form.Control>
          {errors.password && (
            <span className="text-sm text-red-600 bg-red-100 p-3">{ errors.password.message }</span>
          )}
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-3 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition"
          >
            Register
          </button>
        </Form.Submit>
         <p className="mt-4 text-center text-gray-700">
          You already have an account?{' '}
          <Link to="/login" className="text-amber-600 hover:underline font-semibold">
            Log in now!
          </Link>
        </p>

      </Form.Root>
    </div>
  )
}

export default Register