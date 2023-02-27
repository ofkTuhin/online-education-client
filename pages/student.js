import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppContext } from "store/store";

const Student = () => {
  const { studentState } = useAppContext();

  return (
    <FullLayout>
      <div>Student</div>
    </FullLayout>
  );
};
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
  if (session) {
    if (session.user.user.role !== "student") {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
  return {
    props: { session },
  };
}
export default Student;
