import Swal from 'sweetalert2';

export const alert = (config) => {
  Swal.fire(config);
};

export const configErrorAlert = ({ title, text, footer = null }) => ({
  icon: 'error',
  title,
  text,
  footer
});

export const configWarnAlert = ({ title, text, footer = null }) => ({
  icon: 'warning',
  title,
  text,
  footer
});

export const configSuccessAlert = ({ title, text, footer = null }) => ({
  icon: 'success',
  title,
  text,
  footer
});
