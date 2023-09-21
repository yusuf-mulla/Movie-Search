import "./MyFevorite.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { img_300 } from "./Home";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import { Toaster } from "../Re-UsebleComp/Toaster";
import secureLocalStorage from "react-secure-storage";

// main (parent) function //
export const MyFevorite = () => {
  // redux hook use for manage state at aplication lavel//
  const select = useSelector((state) => state);

  // navigate use for component navigateion //
  const navigate = useNavigate();

  // search item receive from reducer page (redux)//
  const searchData = select.ProductReducer.searchData;

  // get data from local storage //
  const fevoriteData = JSON.parse(secureLocalStorage.getItem("fevoriteItem"));

  //useState hook use for fevorite item show on UI state manage //
  const [fevorite, setFevorite] = useState(fevoriteData);

  const [isActive, setIsActive] = useState(false);

  //useState hook use for pagination state manage //
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

// function for navigate back page //
const handleNavigateBack = (value) => {
  navigate(value - 1);
};

  // function for   pagination //
  const handleChange = (event, value) => {
    setRowsPerPage(10 * value);
    setPage(10 * value - 10);
  };

  // function for remove item from fevorite, data stored in reducer page //
  const handleRemoveFevorite = (item) => {
    const res = fevoriteData.filter((elem, index) => elem.id !== item.id);
    secureLocalStorage.setItem("fevoriteItem", JSON.stringify(res));
    Toaster(false, "Item Remove From Fevorite");
    setFevorite(res);
  };

  // useEffect hook for fevorite API data , (component did mount) //
  useEffect(() => {
    setFevorite(fevoriteData);
  }, []);

  // useEffect hook for search item filtered and update into state, (component did update) //
  useEffect(() => {
    const searchItem = fevoriteData.filter((item) =>
      item.title.toUpperCase().includes(searchData.toUpperCase())
    );
    if (searchData == "") {
      setIsActive(false);
    }else{
      setIsActive(true)
    }
    setFevorite(searchItem);
  }, [searchData]);

  return (
    <div className="fevorite_container">
      {fevoriteData.length <= 0 ? (
        <div className="empty_error">
          <h1 className="Fevorite_Empty">
            EMPTY
            <Button variant="contained" onClick={() => navigate("/")}>
              Home Page
            </Button>
          </h1>
        </div>
      ) : fevorite.length <= 0 ? (
        <>
          {" "}
          <div className="error_container">
            <h1 className="search_result2">
              RESULT NOT FOUND{" "}
              <Button
                variant="contained"
                onClick={handleNavigateBack}
              >
                My Favorite
              </Button>
            </h1>
          </div>
        </>
      ) : (
        <div className="data_container2">
          {fevorite.slice(page, rowsPerPage).map((item, ind) => {
            return (
              <div className="cardContain2" key={ind}>
                <div className="image-container">
                  <img
                    alt=""
                    src={
                      item.poster_path
                        ? `${img_300}/${item.poster_path}`
                        : "unavailable"
                    }
                  />
                  <i className="icon">
                    <CloseIcon
                      className="close_icon"
                      onClick={() => handleRemoveFevorite(item)}
                    />
                  </i>
                </div>
                <div className="tital_container2">
                  <div className="title2">
                    <b>
                      {item.title.substring(0, 18)}
                      {item.title.length > 18 && "..."}
                    </b>
                  </div>
                  <div className="year_and_rettings2">
                    <i>Release Year: {item.release_date.substring(0, 4)}</i>
                    <span className="rating">{item.vote_average}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {fevoriteData.length <= 0 || fevorite.length <= 0 ? (
        ""
      ) : (
        <div className="pagination_container">
          <div className="pagination">
            <Pagination
              count={Math.ceil(fevorite.length / 10)}
              color="secondary"
              onChange={handleChange}
            />
          </div>
          {isActive ? (
            <div className="backButton">
              <Button variant="contained" onClick={handleNavigateBack}>
                Back
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};
