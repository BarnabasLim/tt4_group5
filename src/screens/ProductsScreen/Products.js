import React from "react";
import { useForm } from "react-hook-form";
import classes from "./Products.module.css";

// jean
import { useEffect, useState } from "react";
//for data import
import * as Data from "../../api/data";
import * as localData from "../../api/localHostData";
import * as v9_firestore from "../../api/v9_firestore";
import * as v9_auth from "../../api/v9_auth";
import { customers } from "../../api/customers";
import { async } from "@firebase/util";

const Products = () => {
  // const [balance, setBalance] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);

  const fetchCustomer = async (id) => {
    const res = await fetch(`http://localhost:5000/customers/${id}`);
    const data = await res.json();
    setCustomerInfo(data);
    return data;
  };

  useEffect(() => {
    const getCustomer = async () => {
      const customerFromServer = await fetchCustomer(1);
      setCustomerInfo(customerFromServer);
    };

    getCustomer();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes}>
      <div className={classes.control}>
        <h2>Your Account Balance</h2>
        <div>
          <p>Customer Name: {customerInfo.customer_name}</p>
          <p>Balance: {customerInfo.balance}</p>
        </div>
      </div>
      <div className={classes.control}>
        <h2>Additional Contact Information</h2>
        <label htmlFor="maritalStatus">Marital Status</label>
        <select
          {...register("maritalStatus", { required: true })}
          id="maritalStatus"
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Other">Other</option>
        </select>
        {errors.maritalStatus && <span>This field is required</span>}

        <label htmlFor="address">Address</label>
        <textarea {...register("address", { required: true })} id="address" />
        {errors.address && <span>This field is required</span>}
      </div>
      <div className={classes.control}>
        <h2>Employment Information</h2>

        <label htmlFor="presentEmployer">Present Employer</label>
        <input
          type="text"
          placeholder="DBS"
          {...register("presentEmployer", { required: true })}
          id="presentEmployer"
        />
        {errors.presentEmployer && <span>This field is required</span>}

        <label htmlFor="occupation">Occupation</label>
        <input
          type="text"
          placeholder="SEED-er"
          {...register("occupation", { required: true })}
          id="occupation"
        />
        {errors.occupation && <span>This field is required</span>}

        <label htmlFor="exp">Years of experience</label>
        <select {...register("exp", { required: true })} id="exp">
          <option value="0-1 Year">0-1 Year</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="3-4 Years">3-4 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
        {errors.exp && <span>This field is required</span>}

        <label htmlFor="income">Gross monthly income</label>
        <input
          type="number"
          placeholder="$1000"
          {...register("income", { required: true })}
          id="income"
        />
        {errors.income && <span>This field is required</span>}

        <label htmlFor="mortgage">Monthly rent/mortgage</label>
        <input
          type="text"
          placeholder="$1500"
          {...register("mortgage", { required: true })}
          id="mortgage"
        />
        {errors.mortgage && <span>This field is required</span>}
      </div>
      <div className={classes.control}>
        <h2>Loan</h2>
        <input
          type="number"
          placeholder="Loan Amount"
          {...register("LoanAmount", { required: true })}
        />
        {errors.LoanAmount && <span>This field is required</span>}
      </div>
      <div className={classes.actions}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Products;
