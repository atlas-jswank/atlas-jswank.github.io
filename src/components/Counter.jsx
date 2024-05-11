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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => increment()}>Increment</button>
      </div>
    );
  }
}

const posts = [
  {
    title: "Hello World",
    content: "This is the first post",
    author: {
      id: "1",
      name: "Lumi",
    },
  },
  {
    title: "Hello World 2",
    content: "This is the second post",
    author: {
      id: "1",
      name: "Lumi",
    },
  },
];
