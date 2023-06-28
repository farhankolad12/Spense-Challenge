import { useState } from "react";

export default function StarRating({
  setRating,
  rating,
}: {
  setRating: Function;
  rating: number;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;
        console.log(star);

        return (
          <button
            type="button"
            key={index}
            className="btn p-0"
            style={{ boxShadow: "none" }}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <i
              className={`bi bi-star${
                index <= (hover || rating) ? "-fill" : ""
              } fs-1 text-warning`}
            />
          </button>
        );
      })}
    </div>
  );
}
