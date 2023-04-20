export default function ControlCard({ title }) {
  // เขียนแบบ Arrow Function
  const alertStart = () => {
    window.alert("คุณกำลังกด Start" + title);
  };

  const showData = () => {
    return (
      <div>
        <li>Hello</li>
        <li>World</li>
      </div>
    );
  };

  return (
    <div>
      <button className="btn btn-success" onClick={() => alertStart()}>
        Start
      </button>
      {showData()}
    </div>
  );
}
