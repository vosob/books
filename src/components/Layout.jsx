import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Header } from "./Header";
import { AddNewBook } from "./AddNewBook";
import { Footer } from "./Footer";

export const Layout = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header openModal={openModal} />

      <main className="flex-1 container mx-auto px-4 py-6 w-full max-w-full">
        <Outlet />
      </main>

      <Footer />

      <AddNewBook modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};
