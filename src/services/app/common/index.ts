// Vendors
import { ElNotification } from "element-plus";

const getStatus = (status: number): string => {
  if (status >= 200 && status < 300) {
    return "success";
  }

  if (status >= 400 && status < 500) {
    return "warning";
  }

  return "danger";
};

const setNotification = (message: string, type: any): void => {
  ElNotification({
    title: "",
    message: message,
    type: type,
  });
};

export { getStatus, setNotification };
