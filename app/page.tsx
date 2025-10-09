import React from "react";
import TrangChu from "./Home/TrangChu/trangChu";
import Carousel from "./Home/TrangChu/Carousel";
import Header from "./Home/TrangChu/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <TrangChu />
      <Carousel />
    </div>
  );
}
