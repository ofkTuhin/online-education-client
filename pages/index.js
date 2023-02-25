import FullLayout from "layouts/FullLayout";
import { useSession, signIn, getSession } from "next-auth/react";

export default function Index() {
  // const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    signIn();
  }
  return <FullLayout></FullLayout>;
}
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
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: `/${session.user.user.role}`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
