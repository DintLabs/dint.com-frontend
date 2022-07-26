import Swal from "sweetalert2";

export const alert = (config) => {
  Swal.fire(config);
};

export const configErrorAlert = ({ title, text, footer = null }) => {
  return {
    icon: "error",
    title: title,
    text: text,
    footer: footer,
  };
};

export const configWarnAlert = ({ title, text, footer = null }) => {
  return {
    icon: "warning",
    title: title,
    text: text,
    footer: footer,
  };
};

export const configSuccessAlert = ({ title, text, footer = null }) => {
  return {
    icon: "success",
    title: title,
    text: text,
    footer: footer,
  };
};
