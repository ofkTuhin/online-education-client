import FullLayout from "@layouts/FullLayout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Teacher = ({ session }) => {
  const [items, setItems] = useState("");
  const router = useRouter();
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role !== "teacher") {
      router.push("/404");
    }
  }, []);

  console.log(items);
  return (
    <FullLayout>
      <div>Teacher</div>
    </FullLayout>
  );
};

export default Teacher;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log(session);
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
