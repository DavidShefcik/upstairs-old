import { useLocation, Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { InfoIcon, ViewIcon, LockIcon } from "@chakra-ui/icons";

import useDeviceSize from "~/hooks/useDeviceSize";
import LinkMenu, { ILinkMenuItem } from "~/layout/LinkMenu";
import PageWidth from "../PageWidth";

const links: ILinkMenuItem[] = [
  {
    text: "Settings",
  },
  {
    text: "Account",
    path: "/settings/account",
    icon: InfoIcon,
  },
  {
    text: "Profile",
    path: "/settings/profile",
    icon: ViewIcon,
  },
  {
    text: "Security",
    path: "/settings/security",
    icon: LockIcon,
  },
];

export default function Settings() {
  const location = useLocation();
  const { isMobile } = useDeviceSize();

  return (
    <Flex flex={1}>
      <PageWidth>
        <Flex
          flex={1}
          flexDirection={isMobile ? "column" : "row"}
          py={isMobile ? "2" : "8"}
        >
          <LinkMenu links={links} activeLink={location.pathname} />
          <Box overflowX="hidden" overflowY="auto" px="10">
            <Outlet />
          </Box>
        </Flex>
      </PageWidth>
    </Flex>
  );
}
