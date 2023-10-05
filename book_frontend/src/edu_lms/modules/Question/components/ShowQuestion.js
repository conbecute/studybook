import DoingExerciseWrapper from "edu_lms/modules/DoingExercise/DoingExerciseWrapper";

export default function ShowQuestion({ data }) {
  return (
    <div>
      <DoingExerciseWrapper
        data={data.question}
        onPlaying={() => {}}
        showCorrectAnswer={true}
        isComplete={true}
        isReadOnly={false}
      />

      <div style={{ pointerEvents: "none" }}>
        <DoingExerciseWrapper
          data={data.answer}
          onPlaying={() => {}}
          showCorrectAnswer={true}
          isComplete={true}
          isReadOnly={true}
        />
      </div>
    </div>
  );
}
