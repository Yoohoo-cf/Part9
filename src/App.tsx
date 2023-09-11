


const App = () => {

  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartD extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartD {
    kind: "basic"
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }

  interface CoursePartBackground extends CoursePartD {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartSpecial extends CoursePartD {
    requirements: string[];
    kind: "special"
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      description: "Confusing description",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const Header = (props: {name: string}) => {
    return <h1>{props.name}</h1>
  }

  const Part = ({ part }: {part: CoursePart }) => {
    switch (part.kind){
      case "basic":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
            <p>{part.description}</p>
          </div>
        );
        break;
      case "group":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
            <p>project exercises {part.groupProjectCount}</p>
          </div>
        );
        break;
      case "background":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
            <p>{part.description}</p>
            <p>{part.backgroundMaterial}</p>
          </div>
        );
        break;
      case "special":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
            <p>{part.description}</p>
            <p>Requirements: {part.requirements}</p>
          </div>
        )
      default:
        return assertNever(part);
    }
  }

  const assertNever = (value: never):never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const Content = (props: { courseParts: CoursePart[] }) => {
    return (
      <div>
        {props.courseParts.map((part, index) => (
          <div key={index}>
            <Part part={part} />
          </div>
        ))}
      </div>
    );
  }
  

  const Total = (props: {courseParts: {exerciseCount: number}[]}) => {

    const totalExercises = props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

    return (
      <p>
        Total number of exercises: {totalExercises}
      </p>
    )
  }

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App;