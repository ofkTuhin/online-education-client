import FullLayout from "@layouts/FullLayout";
import { Button } from "@mui/material";
import TutorialForm from "components/form/TutorialForm";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Teacher = ({ session }) => {
  const [open, setOpen] = useState(false);

  return (
    <FullLayout>
      <Button
        variant="contained"
        color={"primary"}
        onClick={() => setOpen(true)}
      >
        Add Class
      </Button>
      <TutorialForm open={open} setOpen={setOpen} />
      <div>Teacher</div>
    </FullLayout>
  );
};

export default Teacher;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session?.user?.user?.role !== "teacher") {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
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
