import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import axios from "axios";
import GeoCode from "react-geocode";
import { file_upload } from "../store/actions/file";
import NavbarUI from "./NavbarUI";

const Navbar = () => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const fileHandler = (files) => {
    if (!files.length) {
      setFile(null);
      return;
    } else {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(files[0]);

        fileReader.onload = (e) => {
          const bufferArray = e.target.result;

          const wb = XLSX.read(bufferArray, { type: "buffer" });

          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws);

          resolve(data);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });

      promise.then((data) => {
        console.log(data);
        setFile(data);
      });
    }
  };

  const submitHandler = () => {
    let arr = [];

    // file.map(async (f) => {
    //   try {
    //     let options = {
    //       method: "GET",
    //       url: "",
    //       params: {
    //         q: f.Address,
    //         "accept-language": "en",
    //         polygon_threshold: "0.0",
    //       },
    //       headers: {
    //         
    //       },
    //     };
    //     const response = await axios.request(options);

    //     console.log(response);

    //     // console.log(response.data[0].lat + " " + response.data[0].lon);

    //     options = {
    //       method: "GET",
    //       url: "",
    //       params: {
    //         lat: response.data[0].lat,
    //         lon: response.data[0].lon,
    //         "accept-language": "en",
    //         polygon_threshold: "0.0",
    //       },
    //       headers: {
    //          
    //       },
    //     };

    //     const res = await axios.request(options);

    //     console.log(res.data.address.postcode);

    //     arr.push({
    //       ...f,
    //       lat: response.data[0].lat,
    //       lng: response.data[0].lon,
    //       postcode: res.data.address.postcode,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });

    dispatch(file_upload(file));
  };

  return <NavbarUI fileHandler={fileHandler} submitHandler={submitHandler} />;
};

export default Navbar;
