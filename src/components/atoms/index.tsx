import HTMLRenderer from "react-html-renderer";
import {
  Box,
  Button,
  Code,
  Collapse,
  IconButton,
  Image,
  Link,
  ListItem,
  OrderedList,
  Spinner,
  UnorderedList,
  useBoolean,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import consola from "consola";

import { ColumnButtonProps } from "types";

export const ContentRender = ({ html }: { html: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShowMore, toggleIsShowMore] = useBoolean(false);
  const [isCollapsed, toggleIsCollapsed] = useBoolean(false);
  const [startingHeight, setStartingHeight] = useState(34);
  const hasMedia = html.indexOf("<img") > 0 || html.indexOf("<video") > 0;
  useEffect(() => {
    const { clientHeight, scrollHeight } = ref?.current ||
      { clientHeight: 0, scrollHeight: 0 };
    consola.info(
      "scroll height: ",
      scrollHeight,
      " client height: ",
      clientHeight,
    );
    let height = 300;
    /*if (scrollHeight > clientHeight) {
      setStartingHeight(scrollHeight);
      toggleIsShowMore.on();
    }
    if (hasMedia) {
      let height = 300;
      if (scrollHeight > 300) {
        height = scrollHeight > 800 ? 800 : scrollHeight;
        toggleIsShowMore.off();
      }
      setStartingHeight(height);
      toggleIsShowMore.on();
    }*/
    if (scrollHeight > clientHeight) {
      if (scrollHeight <= height) {
        height = scrollHeight;
        toggleIsShowMore.off();
      } else {
        toggleIsShowMore.on();
      }
      setStartingHeight(height);
    } else {
      height = clientHeight;
    }
  }, [ref?.current]);

  return (
    <Box>
      <div>{isShowMore}</div>
      <Collapse
        ref={ref}
        startingHeight={startingHeight}
        in={isCollapsed}
      >
        <HTMLRenderer
          html={html}
          components={{
            a: (props: any) => (
              <Link color="cyan.800" isExternal {...props}>
                {props.children} <ExternalLinkIcon size={3} />
              </Link>
            ),
            code: (props: any) => (
              <Code colorScheme="cyan" rounded="md" px={1} {...props} />
            ),
            // img: (props: any) => <Image {...props} />,
            li: ListItem,
            ol: OrderedList,
            ul: UnorderedList,
          }}
        />
      </Collapse>
      <div>{isShowMore}</div>
      <Button
        hidden={!isShowMore}
        size="sm"
        onClick={toggleIsCollapsed.toggle}
        mt="1rem"
        colorScheme="gray"
      >
        {isCollapsed ? "Less" : "More..."}
      </Button>
    </Box>
  );
};

export const LoadingComponent = () => {
  return (
    <Box position="relative" bg="chakra-body-bg" minH={120}>
      <Spinner
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      />
    </Box>
  );
};

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
  if (!column.getCanSort()) {
    return null;
  }
  const sorted = column.getIsSorted();
  return (
    <IconButton
      aria-label="Sort"
      size="xs"
      onClick={column.getToggleSortingHandler()}
      style={{
        transition: "transform: 0.25s",
        transform: `rotate(${sorted === "asc" ? "180" : "0"}deg)`,
      }}
      variant={sorted ? "light" : "transparent"}
      color={sorted ? "primary" : "gray"}
    >
      {sorted
        ? <ChevronDownIcon size={18} />
        : <ChevronsUpDownIcon size={18} />}
    </IconButton>
  );
};
