import PageHeader from "@/components/layout/PageHeader";
import NotificationsFeed from "@/components/NotificatinFeed";
import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Notifications = () => {
  return ( 
    <>
      <PageHeader showBackArrow label="Notifications" description="Updates from your community" />
      <NotificationsFeed />
    </>
   );
}
 
export default Notifications;
