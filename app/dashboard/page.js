"use client";

import Login from "@/components/Login";
import SubscriptionForm from "@/components/SubscriptionForm";
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay";
import SubscriptionSummary from "@/components/SubscriptionSummary";
import { useAuth } from "@/context/AuthContext";
import { Suspense, useState } from "react";

const blankSubscription = {
  name: "",
  category: "Web Services",
  cost: "",
  currency: "INR",
  billingFrequency: "Monthly",
  nextBillingDate: "",
  paymentMethod: "UPI",
  startDate: "",
  renewalType: "",
  notes: "",
  status: "Active",
};

export default function Dashboard() {
  const [isAddEntry, setIsAddEntry] = useState(false);

  const [formData, setFormData] = useState(blankSubscription);

  const { handleDeleteSubscription, userData, currentUser, loading } =
    useAuth();
  const isAuthenticated = !!currentUser;

  function handleChangeInput(e) {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(newData);
  }

  function handleEditSubscription(index) {
    const data = userData.subscriptions.find((value, valueIndex) => {
      return valueIndex === index;
    });

    setFormData(data);
    handleDeleteSubscription(index);
    setIsAddEntry(true);
  }

  function handleResetForm() {
    setFormData(blankSubscription);
  }

  function handleToggleInput() {
    setIsAddEntry(!isAddEntry);
  }

  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    );
  }

  return (
    <>
      <SubscriptionSummary />
      <SubscriptionsDisplay
        handleEditSubscription={handleEditSubscription}
        handleShowInput={isAddEntry ? () => {} : handleToggleInput}
        showAddNewSubscription={!isAddEntry}
      />
      {isAddEntry && (
        <SubscriptionForm
          handleResetForm={handleResetForm}
          closeInput={handleToggleInput}
          formData={formData}
          handleChangeInput={handleChangeInput}
        />
      )}
    </>
  );
}
