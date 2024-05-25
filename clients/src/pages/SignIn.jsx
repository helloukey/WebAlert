import React from "react";

import googleLogo from "../images/google.svg";
import Header from "../partials/Header";

function SignIn() {
  const google = () => {
    window.open(import.meta.env.VITE_BACKEND_URL + "/auth/google", "_self");
  };

  return (
    <>
    <Header />
    <section className="bg-gradient-to-b from-gray-100 to-white pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-md space-y-6 rounded-3xl bg-white p-6 sm:p-10 lg:p-16 shadow-lg">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Sign in</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Welcome back to WebAlert
                </p>
              </div>
              <button
                onClick={google}
                className="w-full rounded-3xl flex items-center justify-center p-4 shadow hover:bg-gray-50"
              >
                <img
                  src={googleLogo}
                  height={20}
                  width={20}
                  className="mr-2 h-5 w-5"
                  alt="google"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default SignIn;
