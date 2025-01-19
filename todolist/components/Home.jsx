"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ParticlesComponent from "../components/particles";
import { Button } from "@material-tailwind/react";
import RegisterModal from "./RegisterModal";

const Home = () => {
  const { data: session } = useSession();
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const openRegisterModal = () => setIsOpenRegisterModal(true);
  const closeRegisterModal = () => setIsOpenRegisterModal(false);

  // const checkIfUser
  return (
    <>
      <ParticlesComponent id="particles" />
      <main className="w-full flex flex-col">
        <section className="hero-section w-full mt-28">
          <p
            className="text-[2.55rem] sm:text-[1.5rem] md:text-[2.7rem] lg:text-[3.3rem] 1440px:text-[3rem] 2560px:text-[4rem] font-extrabold leading-tight text-center max-w-full px-2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl 1440px:max-w-3xl 2560px:max-w-5xl"
            style={{
              fontFamily: "sans-serif",
              background:
                "linear-gradient(45deg, #000000 22%, #333333 63%, #373737 81%, #3F3F3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Take control of your day one task at a time
          </p>
          <p
            className="mt-6 text-[0.9rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.4rem] 1440px:text-[1.2rem] 2560px:text-[1.5rem] font-normal leading-relaxed text-center max-w-full px-2 sm:max-w-xl md:max-w-2xl 1440px:max-w-3xl lg:max-w-3xl 2560px:max-w-5xl"
            style={{
              fontFamily: "sans-serif",
              background: "#646464",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Simplify your day with a to-do list designed to keep you focused and
            stress-free. Say goodbye to overwhelming tasks and hello to
            productivity. Our to-do list app helps you break down your day into
            manageable steps, ensuring that you stay on top of your goals
            without the stress.
          </p>
        </section>
      </main>
      <main className=" w-full flex justify-center mt-10">
        <Button onClick={openRegisterModal} className="" variant="gradient">
          Get started
        </Button>
      </main>
      {/* Modals */}
      <RegisterModal
        open={isOpenRegisterModal}
        handleOpen={openRegisterModal}
        handleClose={closeRegisterModal}
      />
    </>
  );
};

export default Home;
