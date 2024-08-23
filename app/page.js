"use client";
import styled from "styled-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CountryList from "./components/CountryList";
import CommentForm from "./components/CommentForm";

const Buttons = styled.button`
  background-color: #28a745;
  color: white;
  text-style: none;
  padding: 0.25em 1em;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

export default function Home() {
  return (
    <React.Fragment>
      <div className='d-flex'>
        <div className='d-flex flex-column text-center mx-auto my-4'>
          <div className=' mx-auto'>
            <h2 className='mt-2'>Utforska Världens Mångfald</h2>
            <Image
              className='mx-auto my-4'
              src='/world.jpg'
              alt='globe'
              width={300}
              height={160}
              priority={true}
            />
            <p>
              Denna sida är dedikerad till att erbjuda en fascinerande inblick i
              länder runt om i hela världen.
            </p>
            <p>
              Utforska och läsa om spännande fakta och intressanta detaljer om
              olika länder.
            </p>
            <p>
              Se vackra bilder och kartor som ger dig en visuell resa genom
              världen.
            </p>
            <Link href='/countries' passHref>
              <Buttons>Alla länder</Buttons>
            </Link>
          </div>
          {/* Form */}
          <CommentForm />
        </div>
        {/* Lista */}
        <CountryList />
      </div>
    </React.Fragment>
  );
}
