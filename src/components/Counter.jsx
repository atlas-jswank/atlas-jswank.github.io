import React, { useEffect } from "react";

function useProfileData() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);

  return {
    fulleName: firstName + " " + lastName,
    ageInDogYears: age * 7,
  };
}

function UserProfile() {
  const { fulleName, ageInDogYears } = useProfileData(1);

  return (
    <div>
      <h2>{fulleName}</h2>
      <h3>Age: {ageInDogYears}</h3>
    </div>
  );
}
