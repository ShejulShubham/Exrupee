'use client'

import React from 'react'

export default function SubscriptionForm() {
  return (
    <section>
      <h2>Add new a Subscription</h2>

      <form onSubmit={() => { }}>
        <label>
          <span>Subscription Name</span>
          <input type='text' name='name' placeholder='e.g. Netflix, Spotify, AWS Hosting' required></input>
        </label>

        <label>
          <span>Category</span>
          <select name="category">
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
          <input type='number' name='cost' step='0.01' placeholder='e.g. 12.00' required></input>
        </label>

        <label>
          <span>Currency</span>
          <select name='currency'>
            {['RUP', 'USD', 'EUR', 'GBP', 'NZD', 'AUD', 'Other'].map((cur, curIndex) => {
              return (
                <option key={curIndex}>{cur}</option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Billing Frequency</span>
          <select name='billingFrequency'>
            {['Monthly', 'Yearly', 'Quarterly', 'One-time'].map((bill, billIndex) => {
              return (
                <option key={billIndex}>{bill}</option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Payment Method</span>
          <select name='paymentMethod'>
            {['UPI', 'Credit Card', 'Debit Card', 'Paypal', 'Bank Transfer', 'Other'].map((payment, paymentIndex) => {
              return (
                <option key={paymentIndex}>{payment}</option>
              )
            })}
          </select>
        </label>

        <label>
          <span>Subscription Start Date</span>
          <input type='date' name='startDate' required />
        </label>

        <label>
          <span>Status</span>
          <select name='status'>
            {['active', 'paused', 'cancelled'].map((status, statusIndex) => {
              return (
                <option key={statusIndex}>{status}</option>
              )
            })}
          </select>
        </label>

        <label className='fat-column'>
          <span>Notes</span>
          <textarea name='notes' placeholder='e.g. Shared with family, including cloud storage' />
        </label>

        <div className="fat-column form-submit-btns">
          <button>Cancel</button>
          <button type='submit' >
            Add Subscription
          </button>
        </div>
      </form>

    </section>
  )
}
