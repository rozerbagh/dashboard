import * as React from "react";
function Timer() {
    const [counter, setCounter] = React.useState(60);

    // First Attempts
    // setInterval(() => setCounter(counter - 1), 1000);
    // Second Attempts
    // React.useEffect(() => {
    //   counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    // }, []);
    // Second Attempts - Inspection
    // React.useEffect(() => {
    //   counter > 0 &&
    //     setInterval(() => {
    //       console.log(counter);
    //       setCounter(counter - 1);
    //     }, 1000);
    // }, []);
    // Third Attempts
    // React.useEffect(() => {
    //   const timer =
    //     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    //   return () => clearInterval(timer);
    // }, [counter]);
    // Suggested by Laurent
    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div style={{ color: 'orange', fontWeight: 500, fontSize: '14px' }}>00:{counter}</div>
    );
}

export default Timer