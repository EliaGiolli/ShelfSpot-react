//since I use many component, I import them as a single object with *
import * as Form from "@radix-ui/react-form";

function Login() {
  return (
    <Form.Root className="w-full min-h-screen bg-amber-50" onSubmit={(e) => {
      e.preventDefault();
      // handle login logic here
    }}>
      <Form.Field className="FormField" name="email">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="email" required />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="password">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <Form.Label className="FormLabel">Password</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your password
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input className="Input" type="password" required minLength={6} />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button className="Button" style={{ marginTop: 10 }}>
          Log In
        </button>
      </Form.Submit>
    </Form.Root>
  );
}

export default Login;
