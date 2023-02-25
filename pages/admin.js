import FullLayout from "@layouts/FullLayout";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminForm from "components/form/AdminForm";
import { Button } from "@mui/material";

const admin = ({ session }) => {
  const [open, setOpen] = useState(false);

  return (
    <FullLayout>
      <Button onClick={() => setOpen(true)}>Add Admin</Button>

      <AdminForm open={open} setOpen={setOpen} />
    </FullLayout>
  );
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
