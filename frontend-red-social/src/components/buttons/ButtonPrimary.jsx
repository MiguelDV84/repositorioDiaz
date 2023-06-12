import './ButtonPrimary.css'

export default function ButtonPrimary({ text, onClick }) {
  return <button className="button__primary" onClick={onClick} ><span>{text}</span></button>;
}
