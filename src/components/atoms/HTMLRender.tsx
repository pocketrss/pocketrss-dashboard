import HTMLRenderer from "react-html-renderer";
import {
  Button,
  Code,
  Collapse,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
  useBoolean,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const HTMLRender = ({ html }: { html: string }) => {
  const [show, setShow] = useBoolean(false);
  return (
    <>
      <Collapse startingHeight={190} in={show}>
        <HTMLRenderer
          html={html}
          components={{
            a: (props: any) => (
              <Link color="cyan.800" isExternal {...props}>
                {props.children} <ExternalLinkIcon boxSize={3} />
              </Link>
            ),
            code: (props: any) => (
              <Code colorScheme="cyan" rounded="md" px={1} {...props} />
            ),
            // img: (props: any) => <Image fallbackSrc='https://via.placeholder.com/150' {...props} />,
            li: ListItem,
            ol: OrderedList,
            ul: UnorderedList,
          }}
        />
      </Collapse>
      <Button
        size="sm"
        onClick={setShow.toggle}
        mt="1rem"
        bgColor="blackAlpha.100"
      >
        Show {show ? "Less" : "More"}
      </Button>
    </>
  );
};

export default HTMLRender;
