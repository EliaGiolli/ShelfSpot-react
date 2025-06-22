//since I use many component, I import them as a single object with *
import * as Form from "@radix-ui/react-form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { userLogin } from "../features/auth/authReducer";
import { LoginFormData } from "../types/formData";
import { useAppDispatch } from "../custom hooks/useAppDispatch";
import { useTheme } from "../custom hooks/useTheme";

function Login() {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(userLogin(data));

    if (userLogin.fulfilled.match(result)) {
      navigate('/home');
    } else {
      console.error('login failed:', result.payload);
    }
  }
  
  // Theme-based classes
  const bg = theme === 'light' ? 'bg-amber-50' : 'bg-amber-950';
  const formBg = theme === 'light' ? 'bg-white' : 'bg-amber-900';
  const heading = theme === 'light' ? 'text-gray-900' : 'text-amber-100';
  const label = theme === 'light' ? 'text-gray-700' : 'text-amber-200';
  const input = theme === 'light'
    ? 'bg-white border-gray-300 text-gray-900'
    : 'bg-amber-950 border-amber-700 text-amber-100';
  const errorMsg = theme === 'light'
    ? 'text-red-600 bg-red-100'
    : 'text-red-400 bg-red-900';

  return (
    <div className={`flex items-center justify-center min-h-screen ${bg} p-6`}>
      <Form.Root
        className={`w-full max-w-md rounded-xl shadow-lg p-8 ${formBg}`}
        method="GET"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className={`text-3xl font-semibold mb-8 ${heading}`}>Log In</h2>

        <Form.Field className="mb-6" name="email">
          <div className="flex justify-between items-baseline mb-1">
            <Form.Label className={`text-lg font-medium ${label}`}>Email</Form.Label>
            <Form.Message className={`text-sm ${errorMsg}`} match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className={`text-sm ${errorMsg}`} match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${input}`}
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
          {errors.email && (
            <span className={`text-sm ${errorMsg} p-3`}>{errors.email.message}</span>
          )}
        </Form.Field>

        <Form.Field className="mb-6" name="password">
          <div className="flex justify-between items-baseline mb-1">
            <Form.Label className={`text-lg font-medium ${label}`}>Password</Form.Label>
            <Form.Message className={`text-sm ${errorMsg}`} match="valueMissing">
              Please enter your password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 transition ${input}`}
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
            <span className={`text-sm ${errorMsg} p-3`}>{errors.password.message}</span>
          )}
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-3 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition"
          >
            Log In
          </button>
        </Form.Submit>
        <p className={`mt-4 text-center ${label}`}>
          You don't have an account?{' '}
          <Link to="/register" className="text-amber-600 hover:underline font-semibold">
            Register now
          </Link>
        </p>
      </Form.Root>
    </div>
  );
}

export default Login;