import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ text, back }) {
  const navigate = useNavigate();

  return (
    <div className="followings__header">
      {back && (
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      )}
      <span className="followings__header-text">{text}</span>
    </div>
  );
}
