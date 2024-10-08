import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { login, verifyOTP } from "../../services/api";
import Cookies from "js-cookie";
import { ThreeDots } from 'react-loader-spinner';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: #e41e3f;
  font-size: 0.85rem;
`;

const Button = styled.button`
  background-color: #1877f2;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const RegisterLink = styled.p`
  text-align: center;
  font-size: 0.9rem;

  a {
    color: #1877f2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [otpSent, setOtpSent] = useState(false);
  const [encryptedOTP, setEncryptedOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [iv,setIv]=useState('')
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setLoginError("");
    try {
      const response = await login({ email, password });
      setEncryptedOTP(response.encryptedOTP);
      setIv(response.iv)
      setOtpSent(true);
      alert(response.message || "OTP sent successfully");
    } catch (error) {
      setLoginError(error.response?.data?.message || "An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async ({ email, otp }) => {
    setLoading(true);
    try {
      const response = await verifyOTP({ email, otp, encryptedOTP,iv });
      Cookies.set("token", response.token, { expires: 1, path: "/" });
      Cookies.set("id", response.id, { expires: 1, path: "/" });
      alert(response.message || "OTP verified successfully");
      navigate("/");
    } catch (error) {
      alert(error.message || "An error occurred while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(otpSent ? handleVerifyOTP : handleLogin)}>
      <Input
        type="email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      
      {!otpSent && (
        <>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </>
      )}

      {otpSent && (
        <Input
          type="text"
          placeholder="Enter OTP"
          {...register("otp", { required: "OTP is required" })}
        />
      )}
      {errors.otp && <ErrorMessage>{errors.otp.message}</ErrorMessage>}

      {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

      {loading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#1877f2"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
          visible={true}
        />
      ) : (
        <Button type="submit">{otpSent ? "Verify OTP" : "Login"}</Button>
      )}

      <RegisterLink>
        Haven't registered yet? <Link to="/register">Register now</Link>
      </RegisterLink>
    </FormContainer>
  );
};

export default LoginForm;