import { useNavigate } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

import ConfirmModal, { IConfirmResult } from "~/layout/modals/ConfirmModal";
import { useSessionContext } from "~/context/Session";

interface ReturnType {
  showLogoutModal(): void;
}

export default function useLogoutModal(): ReturnType {
  const navigate = useNavigate();
  const { logout } = useSessionContext();

  const handleLogout = async (): Promise<IConfirmResult> => {
    const result = await logout();

    if (result) {
      return {
        success: true,
      };
    } else {
      return {
        error: "Failed to logout! Please try again.",
      };
    }
  };
  const onLogoutSuccess = () => {
    navigate("/", { replace: true });
  };

  const showLogoutModal = () => {
    NiceModal.show(ConfirmModal, {
      title: "Logout",
      message: "Are you sure you want to logout?",
      onConfirm: handleLogout,
      onSuccess: onLogoutSuccess,
    });
  };

  return {
    showLogoutModal,
  };
}
