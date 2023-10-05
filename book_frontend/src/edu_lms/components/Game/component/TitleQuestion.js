const TitleQuestion = ({ data }) => {
  return (
    <div className="title">
      {data.map((item, index) => {
        return (
          <p key={index} className={index === 0 ? "monkey-f-bold" : ""}>
            {item.text}
          </p>
        );
      })}
    </div>
  );
};
export default TitleQuestion;
