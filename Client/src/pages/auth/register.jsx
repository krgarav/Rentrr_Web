import { useRegisterUser } from "@/helper/urlHelper";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate } = useRegisterUser();
  const navigate = useNavigate();
  const signinHandler = () => {
    // navigate("/dashboard", { replace: true });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Extract token from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // assuming your URL looks like ?token=xyz

    // Check if token exists
    if (!token) {
      console.error("Token is missing in the URL.");
      return; // Or show an error to the user
    }

    // Call mutate function with form data and token
    mutate(
      { formData, token }, // pass formData and token to the backend
      {
        onSuccess: (data) => {
          console.log("✅ Got this from backend:", data);
          toast.success("Email sent!");
          // Handle success (e.g., show a success message)
        },
        onError: (error) => {
          console.error(
            "❌ Failed to send:",
            error.response?.data || error.message
          );
          toast.error(
            "❌ Failed to send:",
            error.response?.data || error.message
          );
        },
      }
    );

    console.log("Form Data: ", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Registration
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Register.
          </Typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Last Name
            </Typography>
            <Input
              type="text"
              size="lg"
              placeholder="Enter last name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Create Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Confirm Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button type="submit" className="mt-6" fullWidth>
            Register
          </Button>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default Register;
