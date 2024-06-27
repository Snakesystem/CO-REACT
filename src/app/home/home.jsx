import React, { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { appRoutes } from "../App";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import TypeIt from "typeit-react";
import { useSweetAlert } from "../../hooks/useSweetAlert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSchema } from "../../hooks/useSchema";
import InputTextField from "../../components/template/form-input/InputTextField";

const Home = memo(function Home() {

  const navigate = useNavigate()
  const [t, i18n] = useTranslation('lang');
  const { loginSchema } = useSchema();

  const loginForm = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  });

  const { handleSubmit, formState } = loginForm;
  const { errors, isValid } = formState;
  const { postRequest } = useApi()
  const { showAlert } = useSweetAlert()

  const login = async (data) => {
    try {
      const result = await postRequest(`cif/login`, data);
      if(!result.result) {
        showAlert({
          title: result.response_message,
          text: `Please check your email and password!`,
          icon: 'warning',
          confirmButtonText: 'Ok'
        }, 'xs');
      } else {
        showAlert({
          title: result.response_message,
          text: `Please check your email and password!`,
          icon: 'success',
          confirmButtonText: 'Ok'
        }, 'xs');
          navigate(appRoutes.HOME)
      }
    } catch (error) {
      showAlert({
        title: <h1>Input something</h1>,
        text: `This is a custom SweetAlert2 alert using React Context!`,
        icon: 'Error',
        confirmButtonText: 'Ok'
      }, 'xs');
    }
  }

  const image = localStorage.getItem('camera');

  return (
    <section className="page-home">
      {/* Hero start */}
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8 my-2" data-aos="fade-right">
            <div className="content-swiper">
              <Swiper className="mySwiper card" loop={true} autoplay={{
                  delay: 7000,
                  disableOnInteraction: false,
                }} modules={[Autoplay]} >
                <SwiperSlide className="d-flex align-items-center justify-content-center">
                  {/* <div className="col-12 ms-auto card card-background card-background-mask-info">
                  </div> */}
                  <img src={image} style={{width: '100%'}} alt=""/>
                  {/* <p className="text-swiper"><TypeIt>{t('REGIS.slider1')}</TypeIt></p> */}
                </SwiperSlide>
                {/* <SwiperSlide className="d-flex align-items-center justify-content-center">
                  <div className="col-12 ms-auto card card-background card-background-mask-info">
                    <img src="/img/closeup-economist-using.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider2')}</TypeIt></p>
                </SwiperSlide>
                <SwiperSlide className="d-flex align-items-center justify-content-center">
                  <div className="col-12 ms-auto card card-background card-background-mask-info">
                    <img src="/img/glass-jar-full-money.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider3')}</TypeIt></p>
                </SwiperSlide>
                <SwiperSlide className="d-flex align-items-center justify-content-center">
                  <div className="col-12 ms-auto card card-background card-background-mask-info">
                    <img src="/img/close-up-education.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider4')}</TypeIt></p>
                </SwiperSlide> */}
              </Swiper>
            </div>
          </div>
          <div className="col-md-4 shadow rounded" data-aos="flip-right">
            <div className="card card-plain py-3 my-3 form-login">
              <div className="card-header pb-0 text-left rounded">
                <h4 className="font-weight-bolder">Sign In</h4>
                <p className="mb-0">Enter your email and password to sign in</p>
              </div>
              <div className="card-body">
                <form noValidate onSubmit={handleSubmit(login)}>
                  <FormProvider {...loginForm}>

                    <InputTextField type="text" ngModel="Email" label={t("CIF.email")} placeholder="Please enter your email" />
                    <InputTextField type="password" ngModel="Password" label={t("CIF.password")} placeholder="" />
                    
                    <div className="text-center">
                      <button type="submit" className="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0" > Sign in </button>
                      <Link to={appRoutes.REGISTER} type="button" className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0" > Sign Up </Link>
                    </div>
                  </FormProvider>
                </form>
              </div>
              <div className="card-footer text-center pt-0 px-lg-2 px-1">
                <p className="mb-4 text-sm mx-auto">
                  Forgot Password?
                  <Link to={appRoutes.FORGOTPASSWORD} className="text-primary text-gradient font-weight-bold">Change Password</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero end */}

    </section>
  );
})

export default Home
