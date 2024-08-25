import logo from "/public/logo.png";
import Image from "next/image";

function AsozialLogo() {
  return (
    <Image
      src={logo}
      alt="logo"
      width={30}
      height={30}
      className="rounded-full border-2 border-light"
    />
  );
}

export default AsozialLogo;
