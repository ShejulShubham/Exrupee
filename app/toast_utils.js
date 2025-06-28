import { InfoIcon } from "@/components/Icon";
import { toast } from "react-fox-toast";

const options = {
  position: "top-center",
  duration: 5000,
  className: "color",
};

export function toastError(message) {
  return toast.error(message, options);
}

export function toastSuccess(message) {
  return toast.success(message, options);
}

export function toastDrawer(message) {
  return toast.drawer(
    <div className="flex flex-col pl-4">
      <p className=" heading text-xl font-mono font-bold ">
        <strong>{message}</strong>
      </p>
      <p className=" details text-sm text-center text-gray-600 ">
        👆 Click here to get details
      </p>
    </div>,
    {
      position: "top-center",
      className: "color",
      duration: Infinity,
      isCloseBtn: true,
      icon: <InfoIcon />,
      expandedContent: (
        <div className="p-4 bg-white lg max-w-md">
          <h3 className="fond-mono font-bold mb-4">
            Use following Details to login
          </h3>
          <div className="space-y-4 border-t pt-4">
            <p className="text-gray-700 text-center">
              Email: <strong>test@gmail.com</strong>
            </p>
            <p className="text-gray-600 text-center">
              Password: <strong>password</strong>
            </p>
          </div>
        </div>
      ),
    }
  );
}
