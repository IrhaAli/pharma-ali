import { useEffect, useState } from "react";
import axios from "axios";
import useApplicationData from "../../hooks/useApplicationData";
import { useNavigate } from "react-router-dom";
import DrugListItem from "../MyDrugItem";
import '../../styles/Drug.css'

const MyDrugs = (props) => {
  const navigate = useNavigate();
  // const [drugs, setDrugs] = useState([]);

  // useEffect(() => {
  //   if (props.user) {
  //     Promise.all([
  //       axios.get(`/favourite/${props.user}`),
  //     ]).then((data) => {
  //       props.setDrugs(data[0].data)
  //     })
  //   }
  // }, [props.user]);

  return (
    <div className="mymedListSection">
      {props.drugs.map((drug) => (
        <DrugListItem
          key={drug.drug_id}
          setDrugs={props.setDrugs}
          drug={drug}
          user={props.user}
        />
      ))}
    </div>
  );
};

export default MyDrugs;
