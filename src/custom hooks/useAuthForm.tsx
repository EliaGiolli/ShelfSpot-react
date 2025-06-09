import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import { RegisterFormData } from "../types/formData";

export function useRegisterForm() {

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData): Promise<void> => {

    setLoading(true);
    setError(null);

    try {

        const response: Response = await axios.post("http://localhost:5000/users", data);

        if (!response.ok) throw new Error("Failed to register");

        const newUser: unknown = await response.json();

        alert("Registration successful!");
       
    } catch (err: any) {
        setError(err.message || "Unknown error");
    } finally {
        setLoading(false);
    }
};

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
    error,
  };
}
