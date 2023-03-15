import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useInfiniteList } from "@refinedev/core";
import { ExternalLinkIcon } from "lucide-react";
import { DateTime } from "luxon";
import { length } from "rambdax";

import { ContentRender, LoadingComponent } from "components/atoms";

function DashboardPage() {
  const cardColor = useColorModeValue("whiteAlpha.800", "blue.800");
  const contentBgColor = useColorModeValue("gray.100", "chakra-body-bg");
  const contentColor = useColorModeValue("black", "#8ca8be");
  // const titleColor = useColorModeValue("black", "#8ca8be");
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteList({
      resource: "entries",
      config: {
        pagination: { pageSize: 10 },
      },
    });
  console.log(data);

  // @ts-ignore:next-line
  const entries = [].concat(...(data?.pages ?? []).map((page) => page.data));

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Box>
      {entries &&
        entries.map((entry: any) => (
          <Box
            key={entry.id}
            mb={2}
            p={4}
            fontSize="sm"
            bgColor={cardColor}
            rounded="base"
          >
            <HStack>
              <Avatar name={entry.edges.feed.title} />
              <VStack align="start">
                <Heading as="h6" size="xs">
                  {entry.edges.feed.title}
                </Heading>
                <Text>{DateTime.fromISO(entry.published_at).toRelative()}</Text>
              </VStack>
            </HStack>
            <Heading as="h3" size="md" m={4}>
              <Link href={entry.url} isExternal>
                {entry.title} <Icon fontSize="16" as={ExternalLinkIcon} />
              </Link>
            </Heading>
            <Box
              overflowX="auto"
              p={4}
              bgColor={contentBgColor}
              fontSize="xl"
              color={contentColor}
              rounded="base"
            >
              {(length(entry.content) > 0 || length(entry.description) > 0) && (
                <ContentRender html={entry.content || entry.description} />
              )}
            </Box>
          </Box>
        ))}
      {hasNextPage && (
        <Center>
          <Button onClick={() => fetchNextPage()} colorScheme="telegram">
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        </Center>
      )}
    </Box>
  );
}

export default DashboardPage;
