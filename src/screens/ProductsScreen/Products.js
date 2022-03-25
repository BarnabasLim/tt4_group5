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

const Products = () => {
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
        {/* insert pointer to account balance */}
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
        {errors.lastName && <span>This field is required</span>}

        <label htmlFor="address">Address</label>
        <textarea {...register("address", { required: true })} id="address" />
        {errors.lastName && <span>This field is required</span>}
      </div>
      <div className={classes.control}>
        <h2>Employment Information</h2>
        <input
          type="text"
          placeholder="Present Employer"
          {...register("Present Employer", { required: true })}
        />
        <input
          type="text"
          placeholder="Occupation"
          {...register("Occupation", { required: true })}
        />
        <select {...register("Years of experience", { required: true })}>
          <option value="0-1 Year">0-1 Year</option>
          <option value="1-2 Years">1-2 Years</option>
          <option value="3-4 Years">3-4 Years</option>
          <option value="5+ Years">5+ Years</option>
        </select>
        <input
          type="number"
          placeholder="Gross monthly income"
          {...register("Gross monthly income", { required: true })}
        />
        <input
          type="text"
          placeholder="Monthly rent/mortgage"
          {...register("Monthly rent/mortgage", { required: true })}
        />
      </div>
      <div className={classes.control}>
        <h2>Loan</h2>
        <input
          type="number"
          placeholder="Loan Amount"
          {...register("Loan Amount", { required: true })}
        />
      </div>
      <div className={classes.actions}>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Products;
