const getPasswordStrength = (password) => {
  if (password.length < 8) {
    return "too short";
  }

  let strengthArray = [];

  for (let i = 0; i < password.length && strengthArray.length < 4; i++) {
    const x = password.charCodeAt(i);

    if (x >= 95 && x <= 122) {
      if (!strengthArray.includes("lowercase")) {
        strengthArray.push("lowercase");
      }
    } else if (x >= 65 && x <= 90) {
      if (!strengthArray.includes("uppercase")) {
        strengthArray.push("uppercase");
      }
    } else if (x >= 48 && x <= 57) {
      if (!strengthArray.includes("number")) {
        strengthArray.push("number");
      }
    } else {
      if (!strengthArray.includes("special")) {
        strengthArray.push("special");
      }
    }
  }

  const y = strengthArray.length;

  if (y === 2) return "medium";
  if (y === 3) return "high";
  if (y === 4) return "very high";

  return "low";
};

export default getPasswordStrength;
