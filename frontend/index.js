let rowsouter = document.getElementById("rowsouter");
    function getData() {
      rowsouter.innerHTML = "";
      fetch("https://holdinfo.onrender.com/crypto")
        .then((res) => res.json())
        .then((data) => appendData(data));
    }
    getData();

    let count = 60;
    let timer = document.getElementById("timer");
    setInterval(() => {
      if (count < 0) {
        getData();
        count = 60;
      } else {
        timer.innerText = count;
        count--;
      }
    }, 1000);

    function appendData(data) {
      rowsouter.innerHTML = "";
      data.map((el, index) => {
        let div = document.createElement("div");
        div.setAttribute("class", "money rowinner");
        let td1 = document.createElement("div");
        td1.innerText = index + 1;
        td1.setAttribute("class", "index rowcell");
        let td2 = document.createElement("div");
        td2.innerText = el.name;
        td2.setAttribute("class", "name rowcell");
        let td3 = document.createElement("div");
        td3.innerText = `₹ ${(+el.last).toLocaleString("en-IN", {
          minimumIntegerDigits: 2,
          useGrouping: true,
        })}`;
        td3.setAttribute("class", "last rowcell");
        let td4 = document.createElement("div");
        td4.innerText = `₹ ${(+el.buy).toLocaleString("en-IN", {
          minimumIntegerDigits: 2,
          useGrouping: true,
          maximumFractionDigits: 0,
          roundingMode: "floor",
        })} / ₹ ${(+el.sell).toLocaleString("en-IN", {
          minimumIntegerDigits: 2,
          useGrouping: true,
          maximumFractionDigits: 0,
          roundingMode: "floor",
        })}`;
        td4.setAttribute("class", "bls rowcell");
        let td5 = document.createElement("div");
        td5.innerText = el.volume;
        td5.setAttribute("class", "volume rowcell");
        let td6 = document.createElement("div");
        td6.innerText = el.base_unit;
        td6.setAttribute("class", "base rowcell");
        div.append(td1, td2, td3, td4, td5, td6);
        rowsouter.append(div);
      });
    }