import { useState } from "react";
import { StatCard } from "../components/StatCard";

export const BooksPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mx-auto flex items-center flex-col justify-center">
      <StatCard activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};
