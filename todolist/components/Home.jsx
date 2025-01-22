"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import ParticlesComponent from "../components/particles";
import { Button } from "@material-tailwind/react";
import RegisterModal from "./RegisterModal";
import { Typography } from "@material-tailwind/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import logo from "../app/assets/Todolist_logo.svg";
import Image from "next/image";

const Home = () => {
  const { data: session } = useSession();
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  const openRegisterModal = () => setIsOpenRegisterModal(true);
  const closeRegisterModal = () => setIsOpenRegisterModal(false);

  return (
    <div className="flex flex-col min-h-screen">
      <ParticlesComponent id="particles" />

      {/* Main Content */}
      <main className="flex-grow w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="hero-section w-full mt-28 text-center">
          <p
            className="text-[2.55rem] sm:text-[1.5rem] md:text-[2.7rem] lg:text-[3.3rem] font-extrabold leading-tight px-4 max-w-4xl mx-auto"
            style={{
              fontFamily: "sans-serif",
              background:
                "linear-gradient(45deg, #000000 22%, #333333 63%, #373737 81%, #3F3F3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Take control of your day, one task at a time
          </p>
          <p
            className="mt-6 text-[1rem] sm:text-[1.2rem] lg:text-[1.4rem] px-4 font-normal leading-relaxed max-w-4xl mx-auto"
            style={{
              fontFamily: "sans-serif",
              color: "#646464",
            }}
          >
            Simplify your day with a to-do list designed to keep you focused and
            stress-free. Say goodbye to overwhelming tasks and hello to
            productivity. Break down your day into manageable steps and stay on
            top of your goals effortlessly.
          </p>
        </section>

        <Button
          onClick={openRegisterModal}
          variant="gradient"
          className=" mt-14"
        >
          Get started
        </Button>

        {/* Features Section */}
        <section className="features-section w-full mt-20 text-center px-6 md:px-24">
          <p
            style={{
              fontFamily: "sans-serif",
              background:
                "linear-gradient(45deg, #000000 22%, #333333 63%, #373737 81%, #3F3F3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-[2rem] sm:text-[1.5rem] md:text-[2.3rem] lg:text-[2.7rem] font-bold mb-6 mt-10 flex items-center justify-center gap-4"
          >
            Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10 text-gray-900"
            >
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            {/* Card 1 */}
            <Card className="w-full flex flex-col justify-between border-black">
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Task Management
                </Typography>
                <Typography>
                  Organize and prioritize tasks efficiently to stay productive.
                </Typography>
              </CardBody>
              <CardFooter className="pt-6">
                <a href="#" className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="w-full flex flex-col justify-between">
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Reminders
                </Typography>
                <Typography>
                  Never forget a task with customizable reminders.
                </Typography>
              </CardBody>
              <CardFooter className="pt-6">
                <a href="#" className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="w-full flex flex-col justify-between">
              <CardBody className="flex-grow">
                <Typography variant="h5" color="blue-gray" className="mb-4">
                  Collaboration
                </Typography>
                <Typography>
                  Share tasks and collaborate with your team seamlessly.
                </Typography>
              </CardBody>
              <CardFooter className="pt-6">
                <a href="#" className="inline-block">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section w-full mt-16 mb-12 text-center px-4">
          <p
            style={{
              fontFamily: "sans-serif",
              background:
                "linear-gradient(45deg, #000000 22%, #333333 63%, #373737 81%, #3F3F3F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-[1.5rem] sm:text-[1.2rem] md:text-[2rem] lg:text-[2.5rem] font-bold mb-6 mt-10"
          >
            Stay Updated
          </p>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-6">
            Subscribe to our newsletter for the latest updates and features.
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <Button
              variant="gradient"
              className="px-6 py-3 text-sm md:text-base lg:text-lg"
            >
              Subscribe
            </Button>
          </form>
        </section>

        {/* Call to Action
        <div className="mt-10">
          {session ? (
            <p className="text-lg">
              Welcome back,{" "}
              <span className="font-bold">{session.user.name}</span>!
              <br />
              Let's get started on your tasks.
            </p>
          ) : (
            <Button onClick={openRegisterModal} variant="gradient">
              Get started
            </Button>
          )}
        </div> */}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white p-8">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <Image
            src={logo}
            className="w-20 sm:w-28 md:w-36 lg:w-40"
            alt="logo"
          />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Login
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Register
              </Typography>
            </li>
            {/* <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contact Us
              </Typography>
            </li> */}
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
          &copy; 2025 TodoList
        </Typography>
      </footer>

      {/* Modals */}
      <RegisterModal
        open={isOpenRegisterModal}
        handleOpen={openRegisterModal}
        handleClose={closeRegisterModal}
      />
    </div>
  );
};

export default Home;
