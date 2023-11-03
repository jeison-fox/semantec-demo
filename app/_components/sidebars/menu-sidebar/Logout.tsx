import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";

import SecondaryButton from "@/components/buttons/SecondaryButton";
import routes from "@/constants/routes";
import UiContext from "@/context/UiContext";

export default function Logout() {
  const router = useRouter();
  const { menuSidebarCollapsed } = useContext(UiContext);

  /**
   * Handles the logout process for the user.
   */
  const handleLogout = () => {
    Cookie.remove("semantec_t");
    router.push(routes.login);
  };

  return (
    <div className="px-3">
      {menuSidebarCollapsed ? (
        <button className="flex justify-center w-full" onClick={handleLogout}>
          <FiLogOut className="text-xl text-gray-400" />
        </button>
      ) : (
        <SecondaryButton
          fullWidth
          icon={<FiLogOut />}
          onClick={handleLogout}
          text="Logout"
        />
      )}
    </div>
  );
}
