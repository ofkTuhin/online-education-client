import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import React from "react";

const Skills = () => {
  return (
    <FullLayout>
      <div>Skills</div>
    </FullLayout>
  );
};

export default Skills;
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
