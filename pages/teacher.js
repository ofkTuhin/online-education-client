import FullLayout from "@layouts/FullLayout";
import { Button } from "@mui/material";
import TutorialForm from "components/form/TutorialForm";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppContext } from "store/store";

const Teacher = ({ session }) => {
  const { teacherState } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <FullLayout>
      <Button onClick={() => setOpen(true)}>Add Class</Button>
      <TutorialForm open={open} setOpen={setOpen} />
      <div>Teacher</div>
    </FullLayout>
  );
};

export default Teacher;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session?.user?.user?.role !== "teacher") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
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
