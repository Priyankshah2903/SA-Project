const reviewStatements = [
    "Absolutely loved it! 💯",
    "Would definitely recommend this to a friend.",
    "Great value for the price.",
    "Not what I expected, but still good.",
    "Exceeded my expectations!",
    "Packaging was nice and the product was even better.",
    "Five stars from me!",
    "Works like a charm.",
    "A must-have product.",
    "Good, but shipping was a bit delayed."
  ];
  
  export function getRandomReviews(count = 3) {
    const shuffled = [...reviewStatements].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  