import FullLayout from "@layouts/FullLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Student = () => {
  const router = useRouter();
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    if (role !== "student") {
      router.push("/404");
    }
  }, []);
  return (
    <FullLayout>
      <div>Student</div>
    </FullLayout>
  );
};

export default Student;
