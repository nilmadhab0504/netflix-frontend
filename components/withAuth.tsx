import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage } from "next";

const withAuth = (WrappedComponent: NextPage) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    if (!session) {
      router.replace("/auth");
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
