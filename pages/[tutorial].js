import FullLayout from "@layouts/FullLayout";
import { Axios } from "@lib/axios";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import React from "react";
import { Grid } from "@mui/material";
import { getSession } from "next-auth/react";

const SingleTutorial = ({ result }) => {
  const { lecture } = result[0];
  return (
    <FullLayout>
      <Grid
        sx={{
          padding: "20px 30px",
          backgroundColor: "white",
          margin: "auto",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          width: "70%",
          borderRadius: "10px",
        }}
      >
        <Grid
          height={400}
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
          mx={"auto"}
        >
          <LiteYouTubeEmbed
            id={lecture}
            adNetwork={false}
            params=""
            playlist={false}
            playlistCoverId={lecture}
            poster="hqdefault"
            title="YouTube Embed"
            noCookie={true}
          />
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export default SingleTutorial;

export const getServerSideProps = async (context) => {
  const tutorialId = context.query.tutorial;
  // const res = await fetch(`${server}/api/product/${pid}`);
  // const product = await res.json();
  const res = await Axios(`class/${tutorialId}`);
  const { result } = res.data;
  console.log(res.data.result);

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
    props: {
      result: result,
    },
  };
};
