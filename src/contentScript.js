"use strict";

let techName;
let techColor;
let badgeURL;
let logoColor = "white";

const styles = ["flat", "flat-square", "plastic", "for-the-badge", "social"];
const badgeCopyClick = (url) => {
  navigator.clipboard.writeText(url).then(
    function () {
      alert("Shield badge is Copied to clipboard!");
    },
    function (err) {
      console.error("Failed to copy to clipboard", err);
    }
  );
};

const getIconsContainer = () => {
  const iconsDiv = document.createElement("div");
  iconsDiv.id = "icons-container";
  iconsDiv.className = "extension-icon";
  iconsDiv.style.display = "flex";
  // overflows when there are many icons
  iconsDiv.style.flexWrap = "wrap";
  iconsDiv.style.justifyContent = "center";
  iconsDiv.style.margin = "2px";

  const badge = document.createElement("img");
  badge.src = badgeURL;
  badge.className = "extension-icon";
  badge.onclick = () => badgeCopyClick(badge.src);
  badge.style.cursor = "pointer";
  badge.style.height = "20px";
  badge.style.margin = "5px";
  iconsDiv.appendChild(badge);
  return iconsDiv;
};

const getStyleSelector = () => {
  const styleSelector = document.createElement("select");
  styleSelector.id = "style-select";
  styleSelector.className = "extension-icon";
  styleSelector.style.margin = "2px";

  styles.forEach((style) => {
    const option = document.createElement("option");
    option.value = style;
    option.text = style;
    styleSelector.appendChild(option);
  });

  styleSelector.onchange = () => {
    const icons = document.querySelectorAll("img.extension-icon");
    const style = styleSelector.value;
    console.log(style);
    icons.forEach((icon) => {
      if (icon.src.includes("&style=")) {
        icon.src = icon.src.replace(/&style=([\w-]*)/, `&style=${style}`);
      } else {
        icon.src = icon.src += `&style=${style}`;
      }
    });
  };
  return styleSelector;
};

const getLogoColorSelector = () => {
  const colorSelectContainer = document.createElement("div");
  colorSelectContainer.id = "color-select-container";
  colorSelectContainer.className = "extension-icon";
  colorSelectContainer.style.display = "flex";
  colorSelectContainer.style.justifyContent = "center";
  colorSelectContainer.style.margin = "2px";

  const colorSelectLabel = document.createElement("label");
  colorSelectLabel.innerText = "Logo";
  colorSelectLabel.style.marginRight = "8px";
  colorSelectContainer.appendChild(colorSelectLabel);

  const selectLogoColor = document.createElement("input");
  selectLogoColor.id = "color-select";
  selectLogoColor.className = "extension-icon";
  selectLogoColor.type = "color";
  selectLogoColor.value = `#${techColor}`;
  selectLogoColor.style.cursor = "pointer";
  selectLogoColor.style.height = "20px";

  selectLogoColor.onchange = () => {
    const icons = document.querySelectorAll("img.extension-icon");
    const color = selectLogoColor.value.substring(1);
    icons.forEach((icon) => {
      if (icon.src.includes("&logoColor=")) {
        icon.src = icon.src.replace(/&logoColor=(\w+)/, `&logoColor=${color}`);
      } else {
        icon.src = icon.src += `&logoColor=${color}`;
      }
    });
  };

  colorSelectContainer.appendChild(selectLogoColor);
  return colorSelectContainer;
};

const getlabelColorSelector = () => {
  const colorSelectContainer = document.createElement("div");
  colorSelectContainer.id = "color-select-container";
  colorSelectContainer.className = "extension-icon";
  colorSelectContainer.style.display = "flex";
  colorSelectContainer.style.justifyContent = "center";
  colorSelectContainer.style.margin = "2px";

  const colorSelectLabel = document.createElement("label");
  colorSelectLabel.innerText = "Label";
  colorSelectLabel.style.marginRight = "8px";
  colorSelectContainer.appendChild(colorSelectLabel);

  const selectLogoColor = document.createElement("input");
  selectLogoColor.id = "color-select";
  selectLogoColor.className = "extension-icon";
  selectLogoColor.type = "color";
  selectLogoColor.value = `#${techColor}`;
  selectLogoColor.style.cursor = "pointer";
  selectLogoColor.style.height = "20px";

  selectLogoColor.onchange = () => {
    const icons = document.querySelectorAll("img.extension-icon");
    const color = selectLogoColor.value.substring(1);
    icons.forEach((icon) => {
      if (icon.src.includes("&labelColor=")) {
        icon.src = icon.src.replace(
          /&labelColor=(\w+)/,
          `&labelColor=${color}`
        );
      } else {
        icon.src = icon.src += `&labelColor=${color}`;
      }
    });
  };

  colorSelectContainer.appendChild(selectLogoColor);
  return colorSelectContainer;
};

const deleteIcons = () => {
  const iconsContainer = document.querySelectorAll(".extension-icon");
  iconsContainer.forEach((icon) => {
    icon.remove();
  });
};

document.querySelectorAll("li.grid-item").forEach((elem) => {
  elem.addEventListener("mouseover", (event) => {
    techName = elem.querySelector("h2").innerText;
    techColor = elem
      .querySelector("button.grid-item__color")
      .innerText.substring(1);

    badgeURL = `https://img.shields.io/badge/-${techName}-${techColor}?&logo=${techName}&style=flat-square`;
    // make to shield icon
    elem.style.backgroundColor = "lightgrey";
  });
  elem.addEventListener("mouseout", (event) => {
    elem.style.backgroundColor = "";
  });
});

const getColorSelectContainer = () => {
  const container = document.createElement("div");
  container.id = "color-select-container";
  container.className = "extension-icon";
  container.style.display = "flex";
  container.style.justifyContent = "center";
  return container;
};

// when div.detail-body is present
// add button img and button to copy to clipboard
document.querySelectorAll("button.view-button").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    // wait for load div.detail-body (modal)
    const detailBody = document.querySelector("div.detail-body");
    if (detailBody) {
      deleteIcons();
      const rightBody = detailBody.children[1];
      rightBody.style.height = "auto";
      const styleSelector = getStyleSelector();
      const logoColorSelector = getLogoColorSelector();
      const labelColorSelector = getlabelColorSelector();
      const iconsContainer = getIconsContainer();
      const colorSelectContainer = getColorSelectContainer();
      colorSelectContainer.appendChild(logoColorSelector);
      colorSelectContainer.appendChild(labelColorSelector);
      rightBody.appendChild(iconsContainer);
      rightBody.appendChild(styleSelector);
      rightBody.appendChild(colorSelectContainer);
    }
  });
});
