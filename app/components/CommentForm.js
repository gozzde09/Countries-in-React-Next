"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import "bootstrap-icons/font/bootstrap-icons.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styled from "styled-components";

const Buttons = styled.button`
  background-color: #204764;
  color: white;
  text-style: none;
  padding: 0.25em 1em;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;
const Errors = styled.p`
  color: chocolate;
  font-style: cursiv;
`;

const UserCommentForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const validate = (values) => {
    const errors = {};
    if (!values.namn) {
      errors.namn = "Namn är obligatoriskt";
    }
    if (!values.email) {
      errors.email = "E-postadress är obligatorisk";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Ogiltig e-postadress";
    }
    if (rating === 0) {
      errors.rate = "Vänligen betygsätta webbsidan";
    }
    if (!values.kommentar) {
      errors.kommentar = "Vänligen lämna ett kommentar";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      namn: "",
      email: "",
      kommentar: "",
      rate: 0,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      alert("Tack för dina kommentarer " + values.namn+ "!");
      resetForm();
      setRating(0);
      setHover(0);
    },
  });

  const handleRatingClick = (index) => {
    setRating(index);
    formik.setFieldValue("rate", index);
    formik.setFieldTouched("rate", true);
  };

  return (
    <Form onSubmit={formik.handleSubmit} className='my-4'>
      <h2>Lämna en recension</h2>

      {/* NAMN */}
      <FloatingLabel controlId='namn' label='Namn'>
        <Form.Control
          type='text'
          placeholder='Namn'
          name='namn'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.namn}
        />
        {formik.touched.namn && formik.errors.namn ? (
          <Errors>{formik.errors.namn}</Errors>
        ) : null}
      </FloatingLabel>

      {/* E-MAIL */}
      <FloatingLabel controlId='email' label='Email address' className='mb-3'>
        <Form.Control
          type='email'
          placeholder='name@example.com'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Errors>{formik.errors.email}</Errors>
        ) : null}
      </FloatingLabel>

      {/* RATING */}
      <p className="flex-start">
        Betyg : {""}
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <i
              key={index}
              className={
                index <= (hover || rating)
                  ? "bi bi-star-fill text-warning"
                  : "bi bi-star text-warning"
              }
              onClick={() => handleRatingClick(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
              style={{ cursor: "pointer", fontSize: "1.5rem" }}></i>
          );
        })}
      </p>
      {formik.touched.rate && formik.errors.rate ? (
        <Errors>{formik.errors.rate}</Errors>
      ) : null}

      {/* KOMMENTARER */}
      <FloatingLabel controlId='kommentar' label='Kommentarer'>
        <Form.Control
          as='textarea'
          placeholder='Lämna ett kommentar här'
          style={{ height: "100px" }}
          name='kommentar'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.kommentar}
        />
        {formik.touched.kommentar && formik.errors.kommentar ? (
          <Errors>{formik.errors.kommentar}</Errors>
        ) : null}
      </FloatingLabel>
      <Buttons type='submit'>Skicka</Buttons>
    </Form>
  );
};

export default UserCommentForm;
