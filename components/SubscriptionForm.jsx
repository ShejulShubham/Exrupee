'use client'

import React, { useState } from 'react'

export default function SubscriptionForm(props) {

  const { onSubmit, closeInput } = props;

  const [formData, setFormData] = useState({
    name: '',
    category: 'Web Services',
    cost: '',
    currency: 'RUP',
    billingFrequency: 'Monthly',
    nextBillingDate: '',
    paymentMethod: 'UPI',
    startDate: '',
    renewalType: '',
    notes: '',
    status: 'Active'
  });


  function handleChangeInput(e) {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value
    }

    setFormData(newData);
  }

  function handleFormSubmit(e) {
    e.preventDefault(); // prevent the random as behavior of reloading the webpage

    onSubmit();
  }


  return (
    <section>
      <h2>Add new a Subscription</h2>

      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Subscription Name</span>
          <input value={formData.name} onChange={handleChangeInput} type='text' name='name' placeholder='e.g. Netflix, Spotify, AWS Hosting' required></input>
        </label>

        <label>
          <span>Category</span>
          <select value={formData.category} onChange={handleChangeInput} name="category">
            {['Entertainment', 'Music', 'Software', 'Web Services', 'Health & Fitness', 'Other'].map((cat, catIndex) => {
              return (
                <option key={catIndex}>
                  {cat}
                </option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Cost</span>
          <input value={formData.cost} onChange={handleChangeInput} type='number' name='cost' step='0.01' placeholder='e.g. 12.00' required></input>
        </label>

        <label>
          <span>Currency</span>
          <select value={formData.currency} onChange={handleChangeInput} name='currency'>
            {['RUP', 'USD', 'EUR', 'GBP', 'NZD', 'AUD', 'Other'].map((cur, curIndex) => {
              return (
                <option key={curIndex}>{cur}</option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Billing Frequency</span>
          <select value={formData.billingFrequency} onChange={handleChangeInput} name='billingFrequency'>
            {['Monthly', 'Yearly', 'Quarterly', 'One-time'].map((bill, billIndex) => {
              return (
                <option key={billIndex}>{bill}</option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Payment Method</span>
          <select value={formData.paymentMethod} onChange={handleChangeInput} name='paymentMethod'>
            {['UPI', 'Credit Card', 'Debit Card', 'Paypal', 'Bank Transfer', 'Other'].map((payment, paymentIndex) => {
              return (
                <option key={paymentIndex}>{payment}</option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Subscription Start Date</span>
          <input value={formData.startDate} onChange={handleChangeInput} type='date' name='startDate' required />
        </label>

        <label>
          <span>Status</span>
          <select value={formData.status} onChange={handleChangeInput} name='status'>
            {['Active', 'Paused', 'Cancelled'].map((status, statusIndex) => {
              return (
                <option key={statusIndex}>{status}</option>
              )
            })}
          </select>
        </label>

        <label className='fat-column'>
          <span>Notes</span>
          <textarea value={formData.notes} onChange={handleChangeInput} name='notes' placeholder='e.g. Shared with family, including cloud storage' />
        </label>

        <div className="fat-column form-submit-btns">
          <button onClick={closeInput}>Cancel</button>
          <button type='submit' >
            Add Subscription
          </button>
        </div>
      </form>

    </section>
  )
}
