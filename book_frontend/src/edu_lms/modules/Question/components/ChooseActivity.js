import Select from "react-select";

export default function ChooseActivity({
  books,
  chapters,
  exercises,
  currentSemester,
  currentChapter,
  currentExercise,
  getChapters,
  getExercises,
  getListActivity,
  setCurrentSemester,
  setCurrentChapter,
  setCurrentExercise,
}) {
  return (
    <div>
      <Select
        value={currentSemester}
        placeholder="Chọn tập"
        name="semester"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 5 }),
          control: (styles) => ({ ...styles, marginTop: "16px" }),
        }}
        onChange={(book) => {
          getChapters(book.value);
          setCurrentSemester(book);
        }}
        options={books}
      />
      <Select
        value={currentChapter}
        placeholder="Chọn chương"
        name="chapter"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 5 }),
          control: (styles) => ({ ...styles, marginTop: "16px" }),
        }}
        onChange={(chapter) => {
          getExercises(chapter.value);
          setCurrentChapter(chapter);
        }}
        options={chapters}
      />
      {exercises.length > 0 && (
        <Select
          value={currentExercise}
          placeholder="Chọn bài"
          name="exercise"
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 5 }),
            control: (styles) => ({ ...styles, marginTop: "16px" }),
          }}
          onChange={(ex) => {
            getListActivity(ex.value);
            setCurrentExercise(ex);
          }}
          options={exercises}
        />
      )}
    </div>
  );
}
