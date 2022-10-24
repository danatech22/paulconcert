import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 20px 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.span`
  color: #5d5b8d;
  font-weight: bold;
  font-size: 24px;
`;

const Title = styled.span`
  color: #5d5b8d;
  font-size: 12px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 15px;
  border: none;
  border-bottom: 2px solid #a7bcff;
  width: 250px;

  &::placeholder {
    color: rgb(175, 175, 175);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    width: 120px;
  }
`;
const Error = styled.span`
  font-size: 12px;
  color: red;
  margin-left: 10px;
`;
const Button = styled.button`
  background-color: #7b96ec;
  color: white;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  border: none;

  &:disabled {
    opacity: 0.5;
  }
`;

const Span = styled.span``;

const Register = styled.p`
  color: #5d5b8d;
  font-size: 12px;
  margin-top: 10px;
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  return (
    <Container>
      <Wrapper>
        <Logo>the impartation</Logo>
        <Title>Sign In</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <Error>{formik.errors.email}</Error>
          ) : null}

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Error>{formik.errors.password}</Error>
          ) : null}

          <Button disabled={loading} type="submit">
            {loading ? <Span>Loading...</Span> : <Span>Login</Span>}
          </Button>
        </Form>
        <Register>
          Already have an account? <Link to="/register">Register</Link>
        </Register>
      </Wrapper>
    </Container>
  );
};

export default Login;
