import React, { createElement, ElementType } from "react";
import { NavLink } from "react-router-dom";
import {
  VStack,
  Link as ChakraLink,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { IconProps } from "@chakra-ui/icons";

import { COLORS } from "~/constants/colors";
import useDeviceSize from "~/hooks/useDeviceSize";

export interface ILink {
  text: string;
  path: string;
  icon?: ElementType<IconProps>;
  disabled?: boolean;
}
export interface ISectionLabel {
  text: string;
}
export type ILinkMenuItem = ILink | ISectionLabel;

interface Props {
  links: ILinkMenuItem[];
  activeLink?: string;
}

const ICON_SIZE = 5;
const ITEM_COLOR = "gray.800";
const HOVER_BACKGROUND_COLOR = "gray.300";
const ACTIVE_COLOR = "brand.600";
const ACTIVE_BACKGROUND_COLOR = COLORS.OPACITY_BRAND_PURPLE;

const isLink = (item: ILinkMenuItem): item is ILink =>
  (item as ILink).path !== undefined;
const isSectionLabel = (item: ILinkMenuItem): item is ISectionLabel =>
  (item as ILink).path === undefined;

export default function LinkMenu({ links, activeLink }: Props) {
  const { isMobile } = useDeviceSize();

  return (
    <VStack spacing="2">
      {links.map((item) => (
        <React.Fragment key={item.text}>
          {isLink(item) ? (
            <ChakraLink
              as={NavLink}
              to={item.path}
              title={item.text}
              paddingY="2"
              paddingX="4"
              borderRadius="3xl"
              transition="all 0.1s linear"
              color={ITEM_COLOR}
              width="100%"
              _hover={{
                backgroundColor: HOVER_BACKGROUND_COLOR,
                color: ITEM_COLOR,
              }}
              _activeLink={{
                backgroundColor: ACTIVE_BACKGROUND_COLOR,
                color: ACTIVE_COLOR,
              }}
            >
              <HStack
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                width={isMobile ? "100%" : "48"}
                height="6"
                spacing="4"
              >
                {item.icon &&
                  createElement(item.icon, {
                    w: ICON_SIZE,
                    h: ICON_SIZE,
                  })}
                <Text fontWeight="medium">{item.text}</Text>
              </HStack>
            </ChakraLink>
          ) : (
            <Text
              width="100%"
              textAlign={isMobile ? "center" : "left"}
              fontSize={isMobile ? "2xl" : "md"}
              px="4"
              py="1"
              fontWeight="bold"
              fontStyle="italic"
            >
              {item.text}
            </Text>
          )}
        </React.Fragment>
      ))}
    </VStack>
  );
}
