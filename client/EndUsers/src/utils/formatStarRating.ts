import { Review } from "../components/Product/UserReview";

export function formatStarRating(reviews: Review[]): number {
  const totalStars = reviews.reduce((prev, review) => {
    return typeof review !== "string" ? prev + review.rating : prev + 0;
  }, 0);

  const newReviews = reviews.filter((review) => {
    return typeof review !== "string";
  });

  const overAllRating = Math.floor(totalStars / newReviews.length);

  return overAllRating;
}
