import { Axios } from "@lib/axios";
import React from "react";

const Documents = ({ files }) => {
  console.log(files);
  return <div>Documents</div>;
};

export default Documents;

export const getServerSideProps = async () => {
  const res = await Axios.get("class/file/pdf");
  console.log(res);
  return {
    props: {
      files: res.data.files,
    },
  };
};
