import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import React from "react";

const AllStudents = () => {
  return <FullLayout>All Students</FullLayout>;
};

export default AllStudents;
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
