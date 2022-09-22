import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
// import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import FacebookLogin from "react-facebook-login";
import InstagramLogin from "react-instagram-login";
import { LinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { LoginSocialPinterest } from "reactjs-social-login";
import { PinterestButton } from "react-social";
// import SocialLogin from "react-social-login";

let clientId =
  "562677907760-7m99omjeao1ebmgn1ms024mp3pufpcmj.apps.googleusercontent.com";

const LoginPage = (props) => {
  //   const loginPageStyle = {
  //     margin: "32px auto 37px",
  //     maxWidth: "530px",
  //     background: "#fff",
  //     padding: "30px",
  //     borderRadius: "10px",
  //     boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
  //   };
  const { touched, errors } = props;
  const navigate = useNavigate();

  const handleLogin = (googleData) => {
    navigate("/home");
    console.log("Hello there!-------------->", googleData);
  };

  const handleFailure = (data) => {
    console.log("not done", data);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const responseFacebook = () => {
    console.log("callback--->");
  };
  const componentClicked = (click) => {
    console.log("clicked...", click);
  };

  const responseInstagram = (ires) => {
    console.log("login successful", ires);
    navigate("/home");
  };

  const responsenotInstagram = (nires) => {
    console.log("failed....", nires);
  };

  const responsepin = () => {
    console.log("login started");
  };

  // const responsenotpin = (pintres) => {
  //   console.log("not successful", pintres);
  // };

  return (
    <MDBContainer className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <h2 style={{ marginBottom: "30px" }}>
            <strong>Login</strong>
          </h2>
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="text"
                name="email"
                className={"form-control"}
                placeholder="Email"
              />
              {touched.email && errors.email && (
                <span className="help-block text-danger">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                className={"form-control"}
                placeholder="Password"
              />
              {touched.password && errors.password && (
                <span className="help-block text-danger">
                  {errors.password}
                </span>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
              >
                Login
              </button>
            </div>
          </Form>
          {/* <div className="d-flex justify-content-between mx-4 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="Remember me"
          />
          <a href="!#">Forgot password?</a>
        </div>
        <MDBBtn className="mb-4 w-100" size="lg">
          Sign in
        </MDBBtn> */}
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>
          <div>
            {/* <MDBBtn
              className="mb-4 w-100"
              size="lg"
              style={{ backgroundColor: "#000000" }}
            >
              <MDBIcon fab icon="discord" className="mx-2" />
              Continue with discord
            </MDBBtn> */}
            <InstagramLogin
              clientId="1237823090365101"
              buttonText="Login"
              onSuccess={responseInstagram}
              onFailure={responsenotInstagram}
            />
          </div>
          {/* <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#3b5998" }}
          >
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Continue with facebook
          </MDBBtn> */}
          <div>
            <FacebookLogin
              appId="1401001503755952"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            />
          </div>

          {/* <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#55acee" }}
          >
            <MDBIcon fab icon="google" className="mx-2" /> */}
          <div>
            <GoogleLogin
              clientId={clientId}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
              // isSignedIn={false}
            />
          </div>

          <div>
            <LinkedIn
              clientId="77mpi3ubjynyev"
              redirectUri={`${window.location.origin}/linkedin`}
              onSuccess={(code) => {
                console.log(code);
              }}
              onError={(error) => {
                console.log(error);
              }}
            >
              {({ linkedInLogin }) => (
                <img
                  onClick={linkedInLogin}
                  src={linkedin}
                  alt="Sign in with Linked In"
                  style={{ maxWidth: "180px", cursor: "pointer" }}
                />
              )}
            </LinkedIn>
          </div>

          <div>
            <PinterestButton>
              <LoginSocialPinterest
                isOnlyGetToken
                client_id="1480725"
                redirect_uri={`${window.location.origin}/Pinterest`}
                onLoginStart={responsepin}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                {/* <div className="content">
                <div className="icon">
                  <PinterestLogo />
                </div>
                <span className="txt">Login With Pinterest</span>
              </div> */}
                Login with Pinterest
              </LoginSocialPinterest>
            </PinterestButton>
          </div>

          {/* <div>
            <SocialLogin
              provider="github"
              gatekeeper="http://localhost:3000"
              appId="81051a1b0f19a8fbc368"
              redirect="http://localhost:3000/home"
            >
              Login with Github
            </SocialLogin>
          </div> */}

          {/* </MDBBtn> */}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || "",
      password: props.password || "",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required").min(6),
  }),
  handleSubmit: (values, action) => {
    console.log("values --------->", values);
    action.resetForm();
  },
})(LoginPage);

export default LoginFormik;
