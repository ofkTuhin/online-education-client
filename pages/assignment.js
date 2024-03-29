import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import React from "react";

const Assignment = () => {
  return (
    <FullLayout>
      <div>Assignment</div>
    </FullLayout>
  );
};

export default Assignment;
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
