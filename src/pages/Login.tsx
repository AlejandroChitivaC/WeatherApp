import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio"; // Importar Notiflix

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    Loading.dots("Cargando...");
    setTimeout(() => {
      login(credentialResponse);
      Loading.remove();
      navigate("/weather");
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1282788290/vector/blue-cloud-cartoon-on-top-sky-outdoor-landscape-background-flat-design-vector.jpg?s=612x612&w=0&k=20&c=7c28seVQ82mi8RlFC6CSfJHYfURxvfLtmRPTx9Gdg_g=')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      ></div>

      <div className="z-10 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">
          HP Weather App
        </h1>
        <p className="text-gray-600 mb-6 text-sm text-center">
          Inicia sesión con tu cuenta de Google para acceder a todas las
          funciones.
        </p>
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Error al iniciar sesión")}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
