import ImageUser from "../Image/ImageUser";
import ButtonPrimary from "../../buttons/ButtonPrimary";

export default function ProfileItem({ className, image, nick }) {
  return (
    <>
      <div className={className}>
        <ImageUser imageName={image} />
      </div>
      <span>{nick}</span>

    </>
  );
}
