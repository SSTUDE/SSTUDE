import Swal from "sweetalert2";

type AlertIcon = "warning" | "error" | "success" | "info" | "question";

interface ShowAlertProps {
  icon: AlertIcon;
  title: string;
  html?: string;
  timer?: number;
}

export const useCustomAlert = () => {
  const showAlert = ({ icon, title, html, timer }: ShowAlertProps) => {
    Swal.fire({
      icon,
      title,
      html: html || "",
      timer: timer || 3000,
      width: "600px",
      showConfirmButton: false,
    });
  };

  return showAlert;
};
