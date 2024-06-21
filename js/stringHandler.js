import { ServerAddress } from "../serverAddr";

function sendData() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;

  const data = {
    str1: input1,
    str2: input2,
  };

  fetch(ServerAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      processCommonParts(
        input1,
        input2,
        data.data.str1CommonIdxArr,
        data.data.str2CommonIdxArr
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function processCommonParts(str1, str2, indices1, indices2) {
  const result1 = document.getElementById("result1");
  const result2 = document.getElementById("result2");

  result1.innerHTML = highlightString(str1, indices1, "highlight1");
  result2.innerHTML = highlightString(str2, indices2, "highlight2");
}

function highlightString(str, indices, highlightClass) {
  let highlightedStr = "";
  const indicesSet = new Set(indices);
  for (let i = 0; i < str.length; i++) {
    if (indicesSet.has(i)) {
      highlightedStr += str[i];
    } else {
      highlightedStr += `<span class="${highlightClass}">${str[i]}</span>`;
    }
  }
  return highlightedStr;
}
