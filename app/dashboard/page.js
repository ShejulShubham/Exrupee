import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";

export default function Dashboard() {
  const isAuthenticated = true;
  const isAddEntry = true;

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay />
      {isAddEntry && <SubscriptionForm />}
    </>
  );
}
