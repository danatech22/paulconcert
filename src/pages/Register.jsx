import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth, storage } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
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

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #8da4f1;
  font-size: 12px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 32px;
`;

const Imgspan = styled.span``;

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

const Login = styled.p`
  color: #5d5b8d;
  font-size: 12px;
  margin-top: 10px;
`;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmpassword: "",
      file: null,
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmpassword: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
      file: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const storageRef = ref(storage, values.displayName);

        const uploadTask = uploadBytesResumable(storageRef, values.file);
        uploadTask.on(
          (error) => {
            console.log(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(res.user, {
                  displayName: values.displayName,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName: values.displayName,
                  email: values.email,
                  photoURL: downloadURL,
                });
              }
            );
          }
        );
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
        <Title>Register</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input
            id="displayName"
            name="displayName"
            placeholder="Display Name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <Error>{formik.errors.firstName}</Error>
          ) : null}

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

          <Input
            id="confirmpassword"
            type="confirmpassword"
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmpassword}
          />
          {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
            <Error>{formik.errors.confirmpassword}</Error>
          ) : null}

          <Input
            name="file"
            type="file"
            id="file"
            onChange={(event) => {
              formik.setFieldValue("file", event.currentTarget.files[0]);
            }}
            style={{ display: "none" }}
          />

          <Label htmlFor="file">
            <Img src={Add} />
            <Imgspan>Add an Avatar</Imgspan>
          </Label>

          <Button disabled={loading} type="submit">
            {loading ? <Span>Loading...</Span> : <Span>Sign Up</Span>}
          </Button>
        </Form>
        <Login>
          Already have an account? <Link to="/login">Login</Link>
        </Login>
      </Wrapper>
    </Container>
  );
};

export default Register;
