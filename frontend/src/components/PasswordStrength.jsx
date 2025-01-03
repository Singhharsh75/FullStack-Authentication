import { Check, X } from "lucide-react";
import React from "react";

const PasswordCategory = ({ password }) => {
  const category = [
    {
      label: "Must be atleast 6 characters long",
      met: password.length > 5,
    },
    {
      label: "Must contain a upper case character",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Must contain a lower case character",
      met: /[a-z]/.test(password),
    },
    {
      label: "Must contain a number",
      met: /\d/.test(password),
    },
    {
      label: "Must contain a special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
  return (
    <div className="mb-2">
      {category.map((item, index) => (
        <div key={index} className="flex text-xs mb-1">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-gray-500 mr-2" />
          )}
          <span className={`${item.met ? "text-green-500" : "text-gray-500"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const getStrength = (password) => {
    let strength = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length > 5) strength++;
    if (/\d/.test(password)) strength++;
    return strength;
  };
  const strength = getStrength(password);
  const getStrengthText = (str) => {
    if (str === 0) return "Very Weak";
    if (str === 1) return "Weak";
    if (str === 2) return "Fair";
    if (str === 3) return "Good";
    return "Strong";
  };
  const colorMatcher = (str) => {
    if (str === 0) return "bg-red-500";
    if (str === 1) return "bg-red-400";
    if (str === 2) return "bg-yellow-500";
    if (str === 3) return "bg-yellow-400";

    return "bg-green-500";
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-green-700 text-xs">Password Strength: </div>
        <div className="text-green-700 text-xs">
          {getStrengthText(strength)}
        </div>
      </div>
      <div className="flex my-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1/4 rounded-full 
                      ${
                        index < strength
                          ? `${colorMatcher(strength)}`
                          : `bg-gray-500`
                      }`}
          />
        ))}
      </div>
      <PasswordCategory password={password} />
    </div>
  );
};

export default PasswordStrength;
