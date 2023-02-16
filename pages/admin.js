import FullLayout from "@layouts/FullLayout";

import { getSession } from "next-auth/react";
import { useEffect } from "react";

import { useRouter } from "next/router";

const admin = ({ session }) => {
  const router = useRouter();
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role !== "admin") {
      router.push("/404");
    }
  }, []);

  // get userState value from context

  return <FullLayout>admin</FullLayout>;
};

export default admin;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
