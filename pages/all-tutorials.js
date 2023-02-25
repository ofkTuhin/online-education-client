import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import React from "react";

const AllTutorials = () => {
  return (
    <FullLayout>
      <div>AllTutorials</div>
    </FullLayout>
  );
};

export default AllTutorials;
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
  if (session.user.user.role !== "admin") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
