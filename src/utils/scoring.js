// Scoring logic based on budget, location, interest
const calculateScore = (lead) => {
  let score = 0;

  // Budget scoring
  if (lead.budget >= 5000000) score += 40;
  else if (lead.budget >= 2000000) score += 25;
  else if (lead.budget >= 500000) score += 10;

  // Location scoring (premium areas)
  const premiumLocations = ["islamabad", "lahore", "karachi", "dha", "bahria"];
  if (premiumLocations.some((loc) => lead.location.toLowerCase().includes(loc))) {
    score += 30;
  } else {
    score += 10;
  }

  // Interest/Urgency scoring
  const urgentInterests = ["buy", "urgent", "immediate", "asap"];
  if (urgentInterests.some((kw) => lead.interest.toLowerCase().includes(kw))) {
    score += 30;
  } else {
    score += 15;
  }

  return Math.min(score, 100); // max 100
};

module.exports = { calculateScore };
