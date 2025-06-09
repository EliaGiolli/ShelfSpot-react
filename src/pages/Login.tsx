//since I use many component, I import them as a single object with *
import * as Form from "@radix-ui/react-form";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-50 p-6">
      <Form.Root
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          // handle login logic here
        }}
      >
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">Log In</h2>

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
            />
          </Form.Control>
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
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white font-semibold py-3 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-300 transition"
          >
            Log In
          </button>
        </Form.Submit>
         <p className="mt-4 text-center text-gray-700">
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