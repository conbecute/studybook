import ItemSuggestion from "./ItemSuggestion";

export default function Guides({
  guides,
  iconList,
  typeText,
  handleClickAudio,
}) {
  const list = guides?.map((guide) =>
    iconList.find((icon) => icon.icon_id === guide.icon_id)
  );

  return (
    <>
      {list?.length > 0 &&
        list?.map((item, index) => (
          <ItemSuggestion
            data={item}
            typeText={typeText}
            handleClickAudio={handleClickAudio}
            key={index}
          />
        ))}
    </>
  );
}
