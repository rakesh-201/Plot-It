import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const Navbar = () => {
  const [file, setFile] = useState(null);
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

    // Getting some error in geocode api of google need to replace it!!

    file.map((f) => {
      axios
        .get("https://maps.googleapis.com/maps/api/geocode/json", {
          params: {
            address: f.Address,
            key: "AIzaSyANI0D9kFJIGTS_RMJ8QeevGkG78DApzjk",
          },
        })
        .then((res) => {
          console.log(res);
        });
    });
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <form class="d-flex">
            <input
              type="file"
              class="btn btn-secondary"
              onChange={(e) => {
                console.log(e.target.files.length);
                fileHandler(e.target.files);
              }}
            />
            <a class="btn btn-primary mx-2" onClick={submitHandler}>
              Submit
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
