import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBus,
  faClock,
  faCreditCard,
  faSackDollar,
  faTicket,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

export function getIcons(category: string): JSX.Element | null {
  switch (category) {
    case "Salary":
      return (
        <FontAwesomeIcon icon={faCreditCard} style={{ color: "#9a0e23" }} />
      );
    case "Investment":
      return (
        <FontAwesomeIcon icon={faSackDollar} style={{ color: "#307e66" }} />
      );
    case "Part-Time":
      return <FontAwesomeIcon icon={faClock} style={{ color: "#6d84ab" }} />;
    case "Food":
      return <FontAwesomeIcon icon={faUtensils} style={{ color: "#acaaaa" }} />;
    case "Entertainment":
      return <FontAwesomeIcon icon={faTicket} style={{ color: "#FFD43B" }} />;
    case "Shopping":
      return (
        <FontAwesomeIcon icon={faBagShopping} style={{ color: "d86518" }} />
      );
    case "Transport":
      return <FontAwesomeIcon icon={faBus} style={{ color: "#134aaa" }} />;
    case "Utilities":
      return <FontAwesomeIcon icon={faWifi} style={{ color: "#60a9a8" }} />;
    default:
      return null; // Return null for unknown categories
  }
}
