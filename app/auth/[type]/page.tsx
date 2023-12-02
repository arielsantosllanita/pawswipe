import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  params: { type: 'signin' | 'signup' };
};

function Page({ params }: Props) {
  if (!['signin', 'signup'].includes(params.type)) return notFound();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          width={300}
          height={300}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Page;
