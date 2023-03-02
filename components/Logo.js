import { Link } from "@mui/material";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" sx={{ fontSize: "1.5rem", textDecoration: "none" }}>
      {/* <Image
      src="/images/logo.png"
      alt="gethugothemes admin"
      width="300"
      height="100"
      loading="eager"
      priority
    /> */}
      Remote Learning Mate
    </Link>
  );
};

export default Logo;
